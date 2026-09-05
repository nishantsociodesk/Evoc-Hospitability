import nodemailer from 'nodemailer';

const getEmailConfig = () => ({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT || 465),
  secure: process.env.EMAIL_SECURE !== 'false',
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_APP_PASSWORD,
  recipient: process.env.BOOKING_NOTIFICATION_EMAIL || process.env.EMAIL_USER,
});

export const dispatchBookingEmail = async (booking) => {
  const config = getEmailConfig();

  if (!config.user || !config.password || !config.recipient) {
    console.info('Email notification skipped: Gmail settings are not configured.');
    return { dispatched: false, reason: 'Email settings are not configured' };
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.password,
    },
  });

  const location = booking.location || {};
  const struggles = Array.isArray(booking.struggles)
    ? booking.struggles.join(', ')
    : booking.struggles || '';

  try {
    await transporter.sendMail({
      from: `EVOC Hospitality <${config.user}>`,
      to: config.recipient,
      subject: `New Strategy Call Request: ${booking.businessName}`,
      text: [
        'New EVOC Hospitality strategy call request',
        `Name: ${booking.name}`,
        `Phone: ${booking.phone}`,
        `Business: ${booking.businessName}`,
        `Business type: ${booking.businessType}`,
        `Struggles: ${struggles}`,
        `Marketing budget 40K+: ${booking.hasMarketingBudget40k}`,
        `Location: ${location.address}, ${location.city}, ${location.state}, ${location.country}`,
        `Notes: ${booking.notes || ''}`,
      ].join('\n'),
    });

    console.log(`✓ Booking email sent to ${config.recipient}`);
    return { dispatched: true };
  } catch (error) {
    console.warn(`! Booking email error: ${error.message}`);
    return { dispatched: false, error: error.message };
  }
};