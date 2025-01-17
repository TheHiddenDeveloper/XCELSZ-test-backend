const Quote = require('../models/Quote');

const createQuote = async (req, res) => {
  try {
    const quoteData = {
      ...req.body,
      project_documentation: req.file ? req.file.path : null
    };

    const result = await Quote.create(quoteData);
    
    res.status(201).json({
      success: true,
      message: 'Quote request created successfully',
      data: { id: result.insertId, ...quoteData }
    });
  } catch (error) {
    console.error('Error in createQuote:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating quote request',
      error: error.message
    });
  }
};

const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.getAll();
    res.status(200).json({
      success: true,
      data: quotes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving quotes',
      error: error.message
    });
  }
};

const getQuoteById = async (req, res) => {
  try {
    const quote = await Quote.getById(req.params.id);
    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }
    res.status(200).json({
      success: true,
      data: quote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving quote',
      error: error.message
    });
  }
};

const updateQuote = async (req, res) => {
  try {
    const quoteData = {
      ...req.body,
      project_documentation: req.file ? req.file.path : null
    };

    const result = await Quote.update(req.params.id, quoteData);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Quote updated successfully',
      data: { id: req.params.id, ...quoteData }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating quote',
      error: error.message
    });
  }
};

const deleteQuote = async (req, res) => {
  try {
    const result = await Quote.delete(req.params.id);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Quote deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting quote',
      error: error.message
    });
  }
};

module.exports = {
  createQuote,
  getAllQuotes,
  getQuoteById,
  updateQuote,
  deleteQuote
};