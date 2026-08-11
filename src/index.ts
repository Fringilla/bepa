import { NODE_ENV, PORT } from './utils/env';
import { server } from './app';

const startup = () => {

  // TODO : Resolve baseUrl by env (development, production, etc.)
  const baseUrl = `http://localhost::${PORT}`

  server.listen(PORT, () => {
    console.log(`🚀 Server ready at: ${baseUrl} running in ${NODE_ENV} mode.`);
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  });
};

const shutdown = () => {
  server.close(() => {
    console.log('Shutting down');
    process.exit(0);
  });
};

startup();
