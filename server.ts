import express from 'express';
import path from 'node:path';
import { createServer as createViteServer } from 'vite';

/** Local UI server only. Production and test APIs are the authenticated Firebase
 * Functions implementation in functions/src; duplicating security-sensitive
 * routes here previously caused behavior and authorization drift. */
async function startServer() {
  const app = express();
  const port = Number(process.env.PORT || 3000);
  app.disable('x-powered-by');
  app.use((_req, res, next) => { res.setHeader('X-Content-Type-Options', 'nosniff'); next(); });
  app.all('/api/*', (_req, res) => res.status(503).json({ error: 'Use the Firebase Emulator Suite for local API testing.' }));
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    const dist = path.join(process.cwd(), 'dist');
    app.use(express.static(dist));
    app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
  }
  app.listen(port, '127.0.0.1', () => console.log(`UI server: http://127.0.0.1:${port}`));
}

startServer().catch(error => { console.error('Server startup failed:', error); process.exit(1); });
