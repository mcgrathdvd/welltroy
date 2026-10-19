import { connect } from 'node:tls';

// Tencent Exmail's documented overseas SSL endpoint, for Workers outside China.
export const smtpHost = 'hwsmtp.exmail.qq.com';

export function openSmtpSocket(callback, connectTls = connect, timeoutMs = 15000) {
  let connection;
  let settled = false;
  let timer;
  const finish = (error) => {
    if (settled) return;
    settled = true;
    clearTimeout(timer);
    if (error) {
      connection?.destroy();
      callback(Object.assign(new Error('SMTP connection unavailable'), {
        code: error.code || 'ESOCKET', command: 'CONN'
      }));
      return;
    }
    // Leave the SMTP greeting buffered until Nodemailer installs its listeners.
    connection.pause();
    callback(null, { connection, secured: true });
  };
  try {
    connection = connectTls({
      host: smtpHost, port: 465, servername: smtpHost, rejectUnauthorized: true
    });
    timer = setTimeout(() => finish({ code: 'ETIMEDOUT' }), timeoutMs);
    connection.once('error', finish);
    connection.once('close', () => finish({ code: 'ECONNECTION' }));
    connection.once('secureConnect', () => finish());
  } catch (error) { finish(error); }
}
