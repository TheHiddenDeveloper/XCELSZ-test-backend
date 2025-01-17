const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
  try {
    const bookingData = {
      ...req.body,
      proof_of_funds_url: req.file ? req.file.path : null
    };

    const result = await Booking.create(bookingData);
    
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: { id: result.insertId, ...bookingData }
    });
  } catch (error) {
    console.error('Error in createBooking:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.getAll();
    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving bookings',
      error: error.message
    });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.getById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving booking',
      error: error.message
    });
  }
};

const getBookingsByName = async (req, res) => {
  try {
    const bookings = await Booking.getByName(req.params.name);
    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving bookings',
      error: error.message
    });
  }
};

const getBookingsByWhatsapp = async (req, res) => {
  try {
    const bookings = await Booking.getByWhatsapp(req.params.whatsapp);
    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving bookings',
      error: error.message
    });
  }
};

const updateBooking = async (req, res) => {
  try {
    const bookingData = {
      ...req.body,
      proof_of_funds_url: req.file ? req.file.path : null
    };

    const result = await Booking.update(req.params.id, bookingData);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      data: { id: req.params.id, ...bookingData }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating booking',
      error: error.message
    });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const result = await Booking.delete(req.params.id);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting booking',
      error: error.message
    });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  getBookingsByName,
  getBookingsByWhatsapp,
  updateBooking,
  deleteBooking
};