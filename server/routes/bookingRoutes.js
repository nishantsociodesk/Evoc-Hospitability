import express from 'express';
import { Booking } from '../models/Booking.js';
import { getDbStatus } from '../config/db.js';
import { dispatchToGoogleSheet } from './googleSheetRoutes.js';
import { dispatchBookingEmail } from '../services/emailService.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FALLBACK_DATA_FILE = path.join(__dirname, '..', 'bookings_data.json');

const router = express.Router();

// Helper for local JSON persistence when MongoDB daemon is not running
const readLocalFallback = () => {
  try {
    if (fs.existsSync(FALLBACK_DATA_FILE)) {
      const data = fs.readFileSync(FALLBACK_DATA_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading fallback storage:', e.message);
  }
  return [];
};

const writeLocalFallback = (data) => {
  try {
    fs.writeFileSync(FALLBACK_DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error writing fallback storage:', e.message);
  }
};

// Seed initial demo data if storage is empty so the user can immediately see real records in the Admin Leads Drawer
const seedInitialDataIfNeeded = () => {
  const existing = readLocalFallback();
  if (existing.length === 0) {
    const seed = [
      {
        _id: 'seed-lead-1',
        name: 'Vikram Malhotra',
        phone: '+91 98201 54321',
        businessName: 'The Amber Lounge & Bistro',
        businessType: 'Restaurant & Bar',
        struggles: ['low visits', 'marketing', 'low sales'],
        hasMarketingBudget40k: 'yes i have',
        location: {
          address: 'Indiranagar 100ft Road',
          city: 'Bengaluru',
          state: 'Karnataka',
          country: 'India',
          latitude: 12.9784,
          longitude: 77.6408,
          fetchedViaGeolocation: true,
        },
        status: 'Strategy Call Scheduled',
        notes: 'Looking to double weekend footfalls and launch tasting menu.',
        createdAt: new Date(Date.now() - 3600 * 1000 * 24 * 2).toISOString(),
      },
      {
        _id: 'seed-lead-2',
        name: 'Pooja Singhania',
        phone: '+91 97110 88234',
        businessName: 'Solana Boutique Heritage Resort',
        businessType: 'Resort',
        struggles: ['all of these'],
        hasMarketingBudget40k: 'yes i have',
        location: {
          address: 'Fateh Sagar Lake Road',
          city: 'Udaipur',
          state: 'Rajasthan',
          country: 'India',
          latitude: 24.5854,
          longitude: 73.7125,
          fetchedViaGeolocation: true,
        },
        status: 'New Lead',
        notes: 'High-end property seeking destination wedding bookings.',
        createdAt: new Date(Date.now() - 3600 * 1000 * 6).toISOString(),
      }
    ];
    writeLocalFallback(seed);
  }
};

seedInitialDataIfNeeded();

// @route   POST /api/bookings
// @desc    Submit a new "Book a Strategy Call" questionnaire
router.post('/', async (req, res) => {
  try {
    const {
      name,
      phone,
      businessName,
      businessType,
      struggles,
      hasMarketingBudget40k,
      location,
      notes,
    } = req.body;

    // Validation
    if (!name || !phone || !businessName) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone number, and business name are required.',
      });
    }

    if (!struggles || (Array.isArray(struggles) && struggles.length === 0)) {
      return res.status(400).json({
        success: false,
        message: 'Please specify what you are struggling with.',
      });
    }

    if (!hasMarketingBudget40k) {
      return res.status(400).json({
        success: false,
        message: 'Please confirm your marketing budget status.',
      });
    }

    const isQualified = hasMarketingBudget40k === 'yes i have';
    const initialStatus = isQualified ? 'New Lead' : 'Disqualified';

    const bookingPayload = {
      name: name.trim(),
      phone: phone.trim(),
      businessName: businessName.trim(),
      businessType: businessType || 'Hospitality',
      struggles: Array.isArray(struggles) ? struggles : [struggles],
      hasMarketingBudget40k,
      location: {
        address: location?.address || '',
        city: location?.city || '',
        state: location?.state || '',
        country: location?.country || 'India',
        latitude: location?.latitude || null,
        longitude: location?.longitude || null,
        ip: req.ip || '',
        fetchedViaGeolocation: Boolean(location?.fetchedViaGeolocation),
      },
      status: initialStatus,
      notes: notes || '',
      createdAt: new Date(),
    };

    // Keep both notification channels independent of booking persistence.
    dispatchToGoogleSheet(bookingPayload);
    dispatchBookingEmail(bookingPayload);

    if (getDbStatus()) {
      const newBooking = new Booking(bookingPayload);
      const saved = await newBooking.save();
      return res.status(201).json({
        success: true,
        data: saved,
        isQualified,
        message: isQualified
          ? 'Your strategy call request has been successfully booked! Our hospitality partner will reach out within 24 hours.'
          : 'Thank you for reaching out. At this stage, EVOC requires a minimum monthly marketing budget of ₹40,000 to deliver guaranteed ROI.',
      });
    } else {
      // Fallback local storage
      const fallbackList = readLocalFallback();
      const newEntry = {
        _id: 'lead-' + Date.now(),
        ...bookingPayload,
        createdAt: new Date().toISOString(),
      };
      fallbackList.unshift(newEntry);
      writeLocalFallback(fallbackList);

      return res.status(201).json({
        success: true,
        data: newEntry,
        isQualified,
        message: isQualified
          ? 'Your strategy call request has been successfully booked! Our hospitality partner will reach out within 24 hours.'
          : 'Thank you for reaching out. At this stage, EVOC requires a minimum monthly marketing budget of ₹40,000 to deliver guaranteed ROI.',
      });
    }
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while processing your booking.',
      error: error.message,
    });
  }
});

// @route   GET /api/bookings
// @desc    Get all strategy call bookings
router.get('/', async (req, res) => {
  try {
    if (getDbStatus()) {
      const bookings = await Booking.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: bookings.length, data: bookings });
    } else {
      const bookings = readLocalFallback();
      return res.json({ success: true, count: bookings.length, data: bookings });
    }
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching bookings.',
    });
  }
});

// @route   PATCH /api/bookings/:id
// @desc    Update status or notes for a booking
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    if (getDbStatus()) {
      const updated = await Booking.findByIdAndUpdate(
        id,
        { ...(status && { status }), ...(notes !== undefined && { notes }) },
        { new: true }
      );
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }
      return res.json({ success: true, data: updated });
    } else {
      const list = readLocalFallback();
      const index = list.findIndex((item) => item._id === id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }
      if (status) list[index].status = status;
      if (notes !== undefined) list[index].notes = notes;
      writeLocalFallback(list);
      return res.json({ success: true, data: list[index] });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/bookings/:id
// @desc    Delete a booking
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (getDbStatus()) {
      await Booking.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Booking removed successfully' });
    } else {
      let list = readLocalFallback();
      list = list.filter((item) => item._id !== id);
      writeLocalFallback(list);
      return res.json({ success: true, message: 'Booking removed successfully' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
