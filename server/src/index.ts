
import express, { json, Request, Response } from 'express';
import { errorHandler } from './middleware/error';
import { NotFoundHandler } from './middleware/notFound';
import ProductRouter from './routes/product'
import { createProductArray } from './data/dummy';

export const products = createProductArray(5);
export const app = express();
app.use(json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Running' });
});

app.use('/api',ProductRouter);
app.use(NotFoundHandler);
app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
