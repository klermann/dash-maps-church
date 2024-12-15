module.exports = (req, res, next) => {
    res.setHeader(
      'Content-Security-Policy',
      [
        "default-src 'self';",
        "script-src 'self' https://unpkg.com 'unsafe-inline';", // Permite scripts inline e unpkg
        "img-src 'self' https://*.tile.openstreetmap.org https://unpkg.com https://via.placeholder.com data:;", // Adiciona via.placeholder.com
        "style-src 'self' https://unpkg.com 'unsafe-inline';", // Permite estilos do unpkg e inline
        "font-src 'self';",
        "connect-src 'self';", // Permite conexões seguras
      ].join(' ')
    );
    next();
  };
  