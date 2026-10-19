import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { openSmtpSocket, smtpHost, smtpDuplex } from '../src/quote-smtp.mjs';

function fixture(opened = Promise.resolve()) {
  let input;
  const writes = [];
  const socket = {
    opened, closed: Promise.resolve(),
    readable: new ReadableStream({ start(controller) { input = controller; } }),
    writable: new WritableStream({ write(chunk) { writes.push(Buffer.from(chunk).toString()); } }),
    close() { socket.wasClosed = true; return Promise.resolve(); }
  };
  return { socket, writes, input };
}

test('native TLS is required and handover waits for opening', async () => {
  let resolveOpen;
  const { socket } = fixture(new Promise(resolve => { resolveOpen = resolve; }));
  const calls = [];
  const pending = openSmtpSocket((...args) => calls.push(args), (address, options) => {
    assert.deepEqual(address, { hostname: smtpHost, port: 465 });
    assert.deepEqual(options, { secureTransport: 'on' });
    return socket;
  });
  assert.equal(calls.length, 0);
  resolveOpen(); await pending;
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], null);
  assert.equal(calls[0][1].secured, true);
  calls[0][1].connection.destroy();
});

test('native stream preserves greeting and supports SMTP writes', async () => {
  const { socket, input, writes } = fixture();
  input.enqueue(new TextEncoder().encode('220 smtp ready\r\n'));
  const connection = smtpDuplex(socket);
  const data = once(connection, 'data');
  connection.resume();
  assert.equal((await data)[0].toString(), '220 smtp ready\r\n');
  await new Promise((resolve, reject) => connection.write('EHLO welltroy.com\r\n', error => error ? reject(error) : resolve()));
  assert.deepEqual(writes, ['EHLO welltroy.com\r\n']);
  const closed = once(connection, 'close');
  connection.destroy(); await closed;
  assert.equal(socket.wasClosed, true);
});

test('idle timeout works and can be disabled during cleanup', async () => {
  const { socket } = fixture();
  const connection = smtpDuplex(socket);
  const timeout = once(connection, 'timeout');
  connection.setTimeout(5); await timeout;
  connection.setTimeout(0);
  connection.destroy();
});

test('native connection failure and timeout are pre-send errors with redacted details', async () => {
  for (const opened of [Promise.reject(Object.assign(new Error('private detail'), { code: 'CERT_HAS_EXPIRED' })), new Promise(() => {})]) {
    const { socket } = fixture(opened);
    const calls = [];
    await openSmtpSocket((...args) => calls.push(args), () => socket, 5);
    assert.equal(calls.length, 1);
    assert.equal(calls[0][0].command, 'CONN');
    assert.equal(calls[0][0].message, 'SMTP connection unavailable');
    assert.equal(socket.wasClosed, true);
  }
});
