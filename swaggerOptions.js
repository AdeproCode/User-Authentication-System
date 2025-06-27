
module.exports = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Blog API",
        version: "1.0.0",
        description: "Swagger documentation for your blog backend"
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [{ bearerAuth: [] }],
      servers: [{ url: "http://localhost:8000" }],
    },
    apis: ["./routes/*.js"],
  };
  