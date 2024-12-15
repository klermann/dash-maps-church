module.exports = (req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self';",
      "script-src 'self' https://unpkg.com 'unsafe-inline';", // Permite scripts inline e unpkg
      "img-src 'self' https://*.tile.openstreetmap.org https://unpkg.com https://via.placeholder.com data:;", // Permite imagens externas
      "style-src 'self' https://unpkg.com 'unsafe-inline';", // Permite estilos inline e externos
      "font-src 'self';",
      "connect-src 'self' http://localhost:3000;", // Permite conexões com localhost
    ].join(' ')
  );
  next();
};
