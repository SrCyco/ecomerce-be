import express from 'express';
import Category from '../models/category';

// Types
import { CategoryType } from '../types/types';
import mongoose from 'mongoose';

const app = express();
1;

app.post('/category', (req: express.Request, res: express.Response) => {
  const category = new Category({
    categoryId: req.body.categoryId,
    name: req.body.name,
    description: req.body.description,
  });

  category.save((error: mongoose.Error, category: CategoryType) => {
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
});

export default app;
