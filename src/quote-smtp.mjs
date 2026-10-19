import { Duplex } from 'node:stream';

// Tencent Exmail's documented overseas SSL endpoint, for Workers outside China.
export const smtpHost = 'hwsmtp.exmail.qq.com';

export function smtpDuplex(socket) {
  const reader = socket.readable.getReader();
  const writer = socket.writable.getWriter();
  let idleMs = 0;
  let idleTimer;
  let reading = false;
  const touch = () => {
    clearTimeout(idleTimer);
    if (idleMs && !connection.destroyed) idleTimer = setTimeout(() => connection.emit('timeout'), idleMs);
  };
  const connection = new Duplex({
    read() {
      if (reading) return;
      reading = true;
      reader.read().then(({ value, done }) => {
        reading = false;
        touch();
        if (!connection.destroyed) connection.push(done ? null : value);
      }, error => connection.destroy(error));
    },
    write(chunk, _encoding, callback) {
      touch();
      writer.write(chunk).then(() => { touch(); callback(); }, callback);
    },
    final(callback) { writer.close().then(() => callback(), callback); },
    destroy(error, callback) {
      clearTimeout(idleTimer);
      Promise.allSettled([reader.cancel(), writer.abort(), socket.close()]).then(() => callback(error));
    }
  });
  connection.setTimeout = (milliseconds) => { idleMs = milliseconds; touch(); return connection; };
  socket.closed.catch(error => connection.destroy(error));
  return connection;
}

export async function openSmtpSocket(callback, connectSocket, timeoutMs = 15000) {
  let socket;
  let timer;
  try {
    // Lazy import keeps local contract tests independent of the Workers runtime.
    connectSocket ||= (await import('cloudflare:sockets')).connect;
    socket = connectSocket({ hostname: smtpHost, port: 465 }, { secureTransport: 'on' });
    await Promise.race([
      socket.opened,
      new Promise((_, reject) => { timer = setTimeout(() => reject({ code: 'ETIMEDOUT' }), timeoutMs); })
    ]);
    clearTimeout(timer);
    const connection = smtpDuplex(socket);
    connection.pause();
    callback(null, { connection, secured: true });
  } catch (error) {
    clearTimeout(timer);
    socket?.closed.catch(() => {});
    socket?.close().catch(() => {});
    callback(Object.assign(new Error('SMTP connection unavailable'), { code: error.code || 'ESOCKET', command: 'CONN' }));
  }
}
