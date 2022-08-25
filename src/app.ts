import express, { Application } from 'express';
import indexRoutes from './routes/index.routes';
import uploadRoutes from './routes/upload.routes';
import dotenv from 'dotenv';

dotenv.config();

export class App {
  private app: Application;

  constructor(private port?: number) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    this.app.set('port', this.port || process.env.PORT || 3001);
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use(indexRoutes);
    this.app.use('/api', uploadRoutes);
  }

  async listen(): Promise<void> {
    await this.app.listen(this.app.get('port'));
    console.log('Servidor ejecutando en el puerto:', this.app.get('port'));
  }
}
