
import express, { json, Request, Response } from 'express';
import { errorHandler } from './middleware/error';
import { NotFoundHandler } from './middleware/notFound';
import ProductRouter from './routes/product'
import { createProductArray } from './data/dummy';

export const products = createProductArray(30);

products.sort((a,b) => {
  return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
});

export const app = express();

app.use(json());

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/api/product',ProductRouter);
app.use(NotFoundHandler);
app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
