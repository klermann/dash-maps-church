module.exports = (req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self';",
      "script-src 'self' https://unpkg.com https://maps.googleapis.com 'unsafe-inline';",
      "img-src 'self' https://*.tile.openstreetmap.org https://unpkg.com https://via.placeholder.com https://maps.gstatic.com https://maps.googleapis.com https://streetviewpixels-pa.googleapis.com data:;", 
      "style-src 'self' https://unpkg.com https://fonts.googleapis.com 'unsafe-inline';",
      "font-src 'self' https://netdna.bootstrapcdn.com https://fonts.gstatic.com https://cdn.jsdelivr.net;",
      "connect-src 'self' http://localhost:3000 http://localhost:4000 https://maps.googleapis.com https://maps.gstatic.com;",
      "font-src 'self' https://unpkg.com;" // Adicionando o domínio para carregar os ícones Tabler
    ].join(' ')
  );

  // Exibir o cabeçalho de CSP no console
  console.log('CSP Header =======================:', res.getHeader('Content-Security-Policy'));
  next();
};
