module.exports = (req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self';",
      "script-src 'self' https://unpkg.com https://maps.googleapis.com 'unsafe-inline';",
      "img-src 'self' https://*.tile.openstreetmap.org https://unpkg.com https://via.placeholder.com https://maps.gstatic.com https://maps.googleapis.com https://streetviewpixels-pa.googleapis.com data:;", // Adicionando o domínio streetviewpixels-pa.googleapis.com
      "style-src 'self' https://unpkg.com https://fonts.googleapis.com 'unsafe-inline';", // Ajustado para permitir Google Fonts
      "font-src 'self' https://netdna.bootstrapcdn.com https://fonts.gstatic.com;", // Ajustado para permitir fontes do Google
      "connect-src 'self' http://localhost:3000 http://localhost:4000 https://maps.googleapis.com https://maps.gstatic.com;",
    ].join(' ')
  );

  // Exibir o cabeçalho de CSP no console
  console.log('CSP Header =======================:', res.getHeader('Content-Security-Policy'));
  next();
};
