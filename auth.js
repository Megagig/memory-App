function authMiddleware(req, res, next) {
  const auth = { login: 'admin', password: 'password' };

  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = Buffer.from(b64auth, 'base64')
    .toString()
    .split(':');

  if (login && password && login === auth.login && password === auth.password) {
    return next();
  }

  res.statusCode = 401;
  res.setHeader('WWW-Authenticate', 'Basic realm="401"');
  res.end('Authentication required');
}

module.exports = authMiddleware;
