import { SwaggerConfig } from '@ioc:Adonis/Addons/Swagger'

export default {
  uiEnabled: true, //disable or enable swaggerUi route
  uiUrl: 'docs', // url path to swaggerUI
  specEnabled: true, //disable or enable swagger.json route
  specUrl: '/swagger.json',

  middleware: [], // middlewares array, for protect your swagger docs and spec endpoints

  options: {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Horti-Fruti API',
        version: '1.0.0',
        description: 'Horti-Fruti API',
      },
      servers: [
        {
          url: 'http://localhost:3333/api',
          description: 'DEV',
        },
      ],
      security: {
        Bearer: [],
      },
      consumes: 'Application/json',
      tags: ['Clients'],
      components: {
        securitySchemes: {
          Bearer: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            in: 'header',
          },
        },
        responses: {
          BadRequest: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
              },
            },
          },
          Unauthorized: {
            type: 'object',
            properties: {
              errors: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'E_UNAUTHORIZED_ACCESS: Unauthorized access',
                    },
                  },
                },
              },
            },
          },
          NotFound: {
            properties: {
              error: {
                type: 'string',
              },
            },
          },
          ValidationErrors: {
            properties: {
              errors: {
                type: 'array',
                items: {
                  properties: {
                    rule: {
                      type: 'string',
                    },
                    field: {
                      type: 'string',
                    },
                    message: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
        schemas: {
          Login: {
            properties: {
              email: {
                type: 'string',
                example: 'client@client.com',
              },
              password: {
                type: 'string',
                example: '123123123',
              },
            },
          },
          User: {
            properties: {
              name: {
                type: 'string',
              },
              email: {
                type: 'string',
              },
              phone: {
                type: 'string',
              },
              password: {
                type: 'string',
              },
              confirmPassword: {
                type: 'string',
              },
            },
          },
          Client: {
            properties: {
              name: {
                type: 'string',
              },
              active: {
                type: 'boolean',
              },
              state_id: {
                type: 'number',
              },
            },
          },
          Address: {
            properties: {
              street: {
                type: 'string',
              },
              neighborhood: {
                type: 'string',
              },
              city_id: {
                type: 'number',
              },
              number: {
                type: 'number',
              },
              reference_point: {
                type: 'string',
              },
              complement: {
                type: 'string',
              },
            },
          },
          Request: {
            properties: {
              store_id: {
                type: 'number',
              },
              payment_method_id: {
                type: 'number',
              },
              change_money: {
                type: 'number',
              },
              comments: {
                type: 'string',
              },
              address_id: {
                type: 'number',
              },
              products: {
                type: 'array',
                items: {
                  properties: {
                    product_id: {
                      type: 'number',
                    },
                    qtd: {
                      type: 'number',
                    },
                    comments: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
      paths: {
        '/login': {
          security: {
            Bearer: [],
          },
          post: {
            tags: ['Auth'],
            description: 'Retorna token de autenticação',
            requestBody: {
              description: 'Dados de Login',
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Login',
                  },
                },
              },
            },
            responses: {
              200: {
                description: 'Retorna token de autenticação',
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Client',
                  },
                },
              },
              400: {
                description: 'Retorna erro ao tentar fazer autenticação',
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/responses/BadRequest',
                  },
                },
              },
            },
          },
        },
        '/clients': {
          security: {
            Bearer: [],
          },
          get: {
            tags: ['Clients'],
            description: 'Retorna uma lista clientes',
            responses: {
              200: {
                description: 'OK',
                schema: {
                  type: 'array',
                  items: {
                    properties: {
                      id: {
                        type: 'integer',
                      },
                    },
                  },
                },
              },
              400: {
                description: 'Erro do cliente',
                schema: {
                  type: 'array',
                  content: {
                    items: {
                      $ref: '#/components/responses/BadRequest',
                    },
                  },
                },
              },
              401: {
                description: 'Não autorizado',
                schema: {
                  type: 'array',
                  contenxt: {
                    items: {
                      $ref: '#/components/responses/Unauthorized',
                    },
                  },
                },
              },
            },
          },
        },
        '/clients/{id}': {
          security: {
            Bearer: [],
          },
          get: {
            tags: ['Clients'],
            description: 'Retorna um cliente',
            responses: {
              200: {
                description: 'Um cliente',
                schema: {
                  type: 'object',
                  $ref: '#/components/schemas/Client',
                },
              },
            },
          },
        },
      },
    },

    apis: ['app/**/*.ts', 'docs/swagger/**/*.yml', 'start/routes.ts'],
    basePath: '/',
  },
  mode: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'RUNTIME',
  specFilePath: 'docs/swagger.json',
} as SwaggerConfig
