import * as fastifyModule from 'fastify';
import { dialog } from 'electron';

const fastify = fastifyModule({ logger: true});

export const start = async (requestCallback) => {
  let e = 'Preparing for server start.';
  try {
    fastify.route({
      method: 'POST',
      url: '/*',
      schema: {
        querystring: {
          severity: { type: 'string' }
        }
      },
      handler: async (request, reply) => {
        let isLogged = requestCallback(request, reply);
        return { result: isLogged };
      }
    });

    fastify.get('/', async (request, reply) => {
      let isLogged = requestCallback(request, reply);
      return { result: isLogged };
    });
    e = 'Registered GET /.';

    e = 'Awaiting server creation.';
    await fastify.listen(33990);
    e = 'Server created.';
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    //fastify.log.error(err);
    throw new Error(`${e}: ${err}`);
  }
};
