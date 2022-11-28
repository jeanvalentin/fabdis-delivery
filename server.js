const fastify = require('fastify')
const autoload = require('@fastify/autoload');
const path = require('path');

const app = fastify({ logger: true });

app.register(autoload, {
  dir: path.join(__dirname, 'routes'),
});

app.listen({ port: 3400 }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});
