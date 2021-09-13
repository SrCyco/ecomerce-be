import express, { Request } from 'express';

// Types
import category, { Category } from '../models/category';
import { CallbackError } from 'mongoose';
import { verifyToken, verifyRole } from '../middlewares/auth';

const app = express();

app.post(
  '/category',
  [verifyToken, verifyRole],
  (req: Request<any, any, Category>, res: express.Response) => {
    const newCategory = new category({
      name: req.body.name,
      description: req.body.description,
    });

    console.log('asd', newCategory);
    newCategory.save((error: CallbackError, category: Category) => {
      console.log(category);
      if (error) {
        return res.status(500).json({
          ok: false,
          error,
        });
      }

      if (!category) {
        return res.status(400).json({
          ok: false,
          error: {
            message: 'Category not found',
          },
        });
      }

      return res.json({
        ok: true,
        category,
      });
    });
  },
);

export default app;
