import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Please provide your phone number'],
      trim: true,
      maxlength: [25, 'Phone number cannot exceed 25 characters'],
    },
    businessName: {
      type: String,
      required: [true, 'Please provide your business name'],
      trim: true,
      maxlength: [150, 'Business name cannot exceed 150 characters'],
    },
    businessType: {
      type: String,
      default: 'Hospitality',
      trim: true,
    },
    struggles: {
      type: [String],
      required: [true, 'Please select what you are struggling from'],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: 'Please select at least one struggle area',
      },
    },
    hasMarketingBudget40k: {
      type: String,
      required: [true, 'Please specify your monthly marketing budget qualification'],
      enum: {
        values: ['yes i have', 'no i dont'],
        message: 'Value must be either "yes i have" or "no i dont"',
      },
    },
    location: {
      address: { type: String, default: '' },
      city: { type: String, default: '' },
      state: { type: String, default: '' },
      country: { type: String, default: 'India' },
      latitude: { type: Number, default: null },
      longitude: { type: Number, default: null },
      ip: { type: String, default: '' },
      fetchedViaGeolocation: { type: Boolean, default: false },
    },
    status: {
      type: String,
      enum: ['New Lead', 'Strategy Call Scheduled', 'In Review', 'Disqualified', 'Converted'],
      default: 'New Lead',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
