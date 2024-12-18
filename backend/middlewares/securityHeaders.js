module.exports = (req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self';",
      "script-src 'self' https://unpkg.com 'unsafe-inline';",
      "img-src 'self' https://*.tile.openstreetmap.org https://unpkg.com https://via.placeholder.com data:;",
      "style-src 'self' https://unpkg.com 'unsafe-inline';",
      "font-src 'self' https://netdna.bootstrapcdn.com;", // Permite fontes do Bootstrap CDN
      "connect-src 'self' http://localhost:3000 http://localhost:4000;", // Ajustado para permitir ambas as conexões
    ].join(' ')
  );
  next();
};
