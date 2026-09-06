import express from 'express';
import { dispatchToGoogleSheet } from './googleSheetRoutes.js';
import { dispatchBookingEmail } from '../services/emailService.js';

const router = express.Router();

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

    const [sheetResult, emailResult] = await Promise.all([
      dispatchToGoogleSheet(bookingPayload),
      dispatchBookingEmail(bookingPayload),
    ]);

    if (!sheetResult.dispatched) {
      console.warn(`Google Sheet notification skipped: ${sheetResult.reason || sheetResult.error}`);
    }
    if (!emailResult.dispatched) {
      console.warn(`Email notification skipped: ${emailResult.reason || emailResult.error}`);
    }

    return res.status(201).json({
      success: true,
      data: bookingPayload,
      isQualified,
      message: isQualified
        ? 'Your strategy call request has been successfully booked! Our hospitality partner will reach out within 24 hours.'
        : 'Thank you for reaching out. At this stage, EVOC requires a minimum monthly marketing budget of ₹40,000 to deliver guaranteed ROI.',
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while processing your booking.',
      error: error.message,
    });
  }
});

export default router;
