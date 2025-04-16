import express from 'express';
import {
  createTax,
  getAllTaxes,
  getTaxById,
  updateTax,
  deleteTax
} from '../controllers/taxController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create tax
router.post('/', protect, isAdmin, createTax);
// Get all taxes
router.get('/', getAllTaxes);
// Get one tax by ID
router.get('/:id', getTaxById);
// Update tax by ID
router.put('/:id', protect, isAdmin, updateTax);
// Delete tax by ID
router.delete('/:id', protect, isAdmin, deleteTax);

export default router;
