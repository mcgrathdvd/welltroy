import test from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { openSmtpSocket, smtpHost } from '../src/quote-smtp.mjs';

function fixture(timeout = 1000) {
  const socket = new EventEmitter();
  socket.pause = () => { socket.paused = true; };
  socket.destroy = () => { socket.destroyed = true; };
  const calls = [];
  openSmtpSocket((...args) => calls.push(args), options => {
    assert.equal(options.host, 'hwsmtp.exmail.qq.com');
    assert.equal(options.servername, smtpHost);
    assert.equal(options.port, 465);
    assert.equal(options.rejectUnauthorized, true);
    return socket;
  }, timeout);
  return { socket, calls };
}

test('SMTP socket is handed over only after TLS completes, with greeting buffered', () => {
  const { socket, calls } = fixture();
  assert.equal(calls.length, 0);
  socket.emit('secureConnect');
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], null);
  assert.equal(calls[0][1].connection, socket);
  assert.equal(calls[0][1].secured, true);
  assert.equal(socket.paused, true);
  socket.emit('close');
  assert.equal(calls.length, 1);
});

test('TLS failure is classified before send and callback fires once', () => {
  const { socket, calls } = fixture();
  socket.emit('error', Object.assign(new Error('private provider detail'), { code: 'CERT_HAS_EXPIRED' }));
  socket.emit('close');
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0].command, 'CONN');
  assert.equal(calls[0][0].code, 'CERT_HAS_EXPIRED');
  assert.equal(calls[0][0].message.includes('private'), false);
  assert.equal(socket.destroyed, true);
});

test('TLS handshake has a bounded timeout and ignores late completion', async () => {
  const { socket, calls } = fixture(5);
  await new Promise(resolve => setTimeout(resolve, 20));
  socket.emit('secureConnect');
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0].code, 'ETIMEDOUT');
  assert.equal(socket.destroyed, true);
});

test('synchronous socket creation failures are classified as CONN', () => {
  let failure;
  openSmtpSocket(error => { failure = error; }, () => { throw new Error('private'); });
  assert.equal(failure.command, 'CONN');
  assert.equal(failure.message, 'SMTP connection unavailable');
});
