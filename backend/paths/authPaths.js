module.exports = {
    '/auth/login': {
      post: {
        summary: 'Realiza login',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: { type: 'string', example: 'usuario' },
                  password: { type: 'string', example: 'senha123' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Login realizado com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsIn...' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/auth/2fa/setup': {
      post: {
        summary: 'Configura 2FA para o usuário',
        responses: {
          '200': {
            description: 'Retorna o segredo do 2FA e a URL do QR Code',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    secret: { type: 'string', example: 'JBSWY3DPEHPK3PXP' },
                    qrCodeUrl: { type: 'string', example: 'data:image/png;base64,iVBOR...' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/auth/2fa/verify': {
      post: {
        summary: 'Verifica o código 2FA',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  token: { type: 'string', example: '123456' },
                  userId: { type: 'integer', example: 1 },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: '2FA validado com sucesso',
          },
          '400': {
            description: 'Código 2FA inválido',
          },
        },
      },
    },
  };
  