const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { 
  createQuote,
  getAllQuotes,
  getQuoteById,
  updateQuote,
  deleteQuote
} = require('../controllers/quoteController');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// POST route for creating a new quote request
router.post('/quotes', upload.single('project_documentation'), createQuote);

// GET routes
router.get('/quotes', getAllQuotes);
router.get('/quotes/:id', getQuoteById);

// PUT route for updating a quote
router.put('/quotes/:id', upload.single('project_documentation'), updateQuote);

// DELETE route for deleting a quote
router.delete('/quotes/:id', deleteQuote);

module.exports = router;