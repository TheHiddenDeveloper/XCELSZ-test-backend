const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { 
  createBooking,
  getAllBookings,
  getBookingById,
  getBookingsByName,
  getBookingsByWhatsapp,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingController');

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

// POST route for creating a new booking
router.post('/bookings', upload.single('proof_of_funds_url'), createBooking);

// GET routes
router.get('/bookings', getAllBookings);
router.get('/bookings/id/:id', getBookingById);
router.get('/bookings/name/:name', getBookingsByName);
router.get('/bookings/whatsapp/:whatsapp', getBookingsByWhatsapp);

// PUT route for updating a booking
router.put('/bookings/:id', upload.single('proof_of_funds_url'), updateBooking);

// DELETE route for deleting a booking
router.delete('/bookings/:id', deleteBooking);

module.exports = router;