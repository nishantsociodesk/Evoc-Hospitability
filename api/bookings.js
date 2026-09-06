import { dispatchToGoogleSheet } from '../server/routes/googleSheetRoutes.js';
import { dispatchBookingEmail } from '../server/services/emailService.js';

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ success: false, message: 'Method not allowed' });
	}

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
		} = req.body || {};

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
				ip: req.headers['x-forwarded-for'] || '',
				fetchedViaGeolocation: Boolean(location?.fetchedViaGeolocation),
			},
			status: isQualified ? 'New Lead' : 'Disqualified',
			notes: notes || '',
			createdAt: new Date().toISOString(),
		};

		const [sheetResult, emailResult] = await Promise.all([
			dispatchToGoogleSheet(bookingPayload),
			dispatchBookingEmail(bookingPayload),
		]);

		if (!sheetResult.dispatched || !emailResult.dispatched) {
			console.error('Booking notification failure', { sheetResult, emailResult });
			return res.status(502).json({
				success: false,
				message: 'The booking could not be delivered to all notification services. Please try again.',
			});
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
		});
	}
}