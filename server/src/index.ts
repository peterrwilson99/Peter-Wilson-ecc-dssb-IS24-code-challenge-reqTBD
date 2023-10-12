
import express, { json, Request, Response } from 'express';
import { errorHandler } from './middleware/error';
import { NotFoundHandler } from './middleware/notFound';
import ProductRouter from './routes/product'
import HealthRouter from './routes/health'
import { createProductArray } from './data/dummy';
import { setupSwagger } from './utils/swagger';

export const products = createProductArray(30);

products.sort((a,b) => {
  return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
});

export const app = express();

app.use(json());


app.use('/health', HealthRouter)
app.use('/api/product',ProductRouter);
setupSwagger(app);


app.use(NotFoundHandler);
app.use(errorHandler);


const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
