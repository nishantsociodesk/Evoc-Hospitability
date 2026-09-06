import React, { useState, useEffect } from 'react';
import { X, MapPin, CheckCircle, AlertTriangle, ArrowRight, Loader2, Sparkles, Navigation } from 'lucide-react';
import { fetchCurrentLocation } from '../utils/geolocation';

export default function BookCallModal({ isOpen, onClose, onBookingSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    businessName: '',
    businessType: 'Restaurant',
    struggles: [],
    hasMarketingBudget40k: '',
    locationAddress: '',
    city: '',
    state: '',
    country: 'India',
    latitude: null,
    longitude: null,
    fetchedViaGeolocation: false,
    notes: '',
  });

  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState(null); // { type: 'success' | 'info' | 'error', text: '' }
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Struggle options from prompt
  const struggleOptions = [
    { id: 'Branding', label: 'a. Branding' },
    { id: 'low visits', label: 'b. Low visits' },
    { id: 'low sales', label: 'c. Low sales' },
    { id: 'marketing', label: 'd. Marketing' },
    { id: 'all of these', label: 'e. All of these' },
  ];

  // Auto-fetch location when modal opens
  useEffect(() => {
    if (isOpen && !formData.latitude && !formData.locationAddress) {
      handleAutoDetectLocation();
    }
  }, [isOpen]);

  const handleAutoDetectLocation = async () => {
    setIsLocating(true);
    setLocationStatus({ type: 'info', text: 'Detecting your current location...' });

    try {
      const loc = await fetchCurrentLocation();
      setFormData((prev) => ({
        ...prev,
        latitude: loc.latitude,
        longitude: loc.longitude,
        city: loc.city || prev.city,
        state: loc.state || prev.state,
        country: loc.country || prev.country,
        locationAddress: loc.address,
        fetchedViaGeolocation: true,
      }));
      setLocationStatus({
        type: 'success',
        text: `Location detected: ${loc.city || 'Coordinates'} (${loc.latitude.toFixed(3)}, ${loc.longitude.toFixed(3)})`,
      });
    } catch (err) {
      console.warn(err);
      setLocationStatus({
        type: 'error',
        text: 'GPS auto-detect unavailable. Please enter your location manually.',
      });
    } finally {
      setIsLocating(false);
    }
  };

  const toggleStruggle = (id) => {
    if (id === 'all of these') {
      if (formData.struggles.includes('all of these')) {
        setFormData({ ...formData, struggles: [] });
      } else {
        setFormData({
          ...formData,
          struggles: ['Branding', 'low visits', 'low sales', 'marketing', 'all of these'],
        });
      }
      return;
    }

    let updated = [...formData.struggles];
    if (updated.includes(id)) {
      updated = updated.filter((item) => item !== id && item !== 'all of these');
    } else {
      updated.push(id);
      // Check if all individual ones are selected
      const individuals = ['Branding', 'low visits', 'low sales', 'marketing'];
      const hasAllIndiv = individuals.every((item) => updated.includes(item));
      if (hasAllIndiv && !updated.includes('all of these')) {
        updated.push('all of these');
      }
    }
    setFormData({ ...formData, struggles: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    // Verification of budget qualification condition
    if (formData.hasMarketingBudget40k === 'no i dont') {
      setSubmitError('As per EVOC guidelines, we only take on clients with a marketing budget of ₹40,000 or more to ensure positive returns.');
      return;
    }

    if (!formData.hasMarketingBudget40k) {
      setSubmitError('Please select whether your marketing budget is at least ₹40,000.');
      return;
    }

    if (formData.struggles.length === 0) {
      setSubmitError('Please select at least one area you are struggling from.');
      return;
    }

    setIsSubmitting(true);

    try {
      const leadPayload = {
        name: formData.name,
        phone: formData.phone,
        businessName: formData.businessName,
        businessType: formData.businessType,
        struggles: formData.struggles,
        hasMarketingBudget40k: formData.hasMarketingBudget40k,
        location: {
          address: formData.locationAddress,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          latitude: formData.latitude,
          longitude: formData.longitude,
          fetchedViaGeolocation: formData.fetchedViaGeolocation,
        },
        notes: formData.notes,
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload),
      });

      const responseText = await response.text();
      let resData;

      try {
        resData = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error(
          `Booking service returned an unexpected response (HTTP ${response.status}). Please try again later.`
        );
      }

      if (!response.ok) {
        throw new Error(resData.message || 'Failed to submit booking');
      }

      setIsSuccess(true);
      if (onBookingSuccess) {
        onBookingSuccess(resData.data);
      }
    } catch (err) {
      setSubmitError(err.message || 'Network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setSubmitError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-start sm:items-center justify-center p-2 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0e0e12] border border-[#c5a059]/40 rounded-sm shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden my-2 sm:my-8">
        {/* Top Gold Accent Bar */}
        <div className="h-1 bg-gradient-to-r from-[#9a752b] via-[#d4af37] to-[#9a752b]" />

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* SUCCESS STATE */
          <div className="p-8 sm:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#c5a059]/10 border border-[#c5a059] flex items-center justify-center mx-auto mb-6 text-[#d4af37]">
              <CheckCircle className="w-8 h-8" />
            </div>

            <span className="text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold block mb-2">
              CALL SCHEDULED
            </span>
            <h3 className="font-serif text-3xl text-white font-medium mb-3">
              We've Received Your Details!
            </h3>
            <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed mb-6 font-light">
              Thank you, <strong className="text-white">{formData.name}</strong>. One of our senior
              hospitality growth partners will review <strong className="text-[#d4af37]">{formData.businessName}</strong> and contact you via phone within 24 hours.
            </p>

            <div className="bg-[#141419] p-4 rounded-sm border border-white/10 text-left max-w-md mx-auto mb-8 text-xs text-gray-300 space-y-1.5">
              <p><span className="text-gray-500">Contact:</span> {formData.phone}</p>
              <p><span className="text-gray-500">Venue:</span> {formData.businessName} ({formData.businessType})</p>
              <p><span className="text-gray-500">Location:</span> {formData.locationAddress || 'Not specified'}</p>
              <p><span className="text-gray-500">Challenges:</span> {formData.struggles.join(', ')}</p>
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3 bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold text-xs tracking-widest uppercase rounded-sm transition-all"
            >
              Return to Website
            </button>
          </div>
        ) : (
          /* FORM STATE */
          <div className="p-4 sm:p-10 max-h-[calc(100dvh-1rem)] sm:max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="text-left mb-8">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
                  STRATEGY CONSULTATION
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                Book A Strategy Call
              </h2>
              <p className="text-xs text-gray-400 mt-1 font-light">
                Please answer the following questions to help us tailor our hospitality growth roadmap for you.
              </p>
            </div>

            {submitError && (
              <div className="mb-6 p-4 rounded-sm bg-red-950/40 border border-red-500/50 text-red-200 text-xs flex items-start space-x-3">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 1. NAME */}
              <div>
                <label className="block text-xs font-semibold tracking-wider text-gray-200 uppercase mb-2">
                  1. NAME <span className="text-[#d4af37]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#141419] border border-white/10 rounded-sm text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
                />
              </div>

              {/* 2. PHONE NUMBER */}
              <div>
                <label className="block text-xs font-semibold tracking-wider text-gray-200 uppercase mb-2">
                  2. PHONE NUMBER <span className="text-[#d4af37]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-[#141419] border border-white/10 rounded-sm text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
                />
              </div>

              {/* 3. YOUR BUSINESS ?? */}
              <div>
                <label className="block text-xs font-semibold tracking-wider text-gray-200 uppercase mb-2">
                  3. YOUR BUSINESS ?? <span className="text-[#d4af37]">*</span>
                </label>
                <div className="space-y-2.5">
                  <input
                    type="text"
                    required
                    placeholder="Business Name (e.g. Noir Coffee Bistro / The Grand Heritage)"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-4 py-3 bg-[#141419] border border-white/10 rounded-sm text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
                  />
                  <div className="flex flex-wrap gap-2 pt-1">
                    {['Café', 'Restaurant', 'Hotel', 'Resort', 'Bar & Lounge', 'Cloud Kitchen'].map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setFormData({ ...formData, businessType: type })}
                        className={`text-[11px] px-3 py-1 rounded-sm border transition-all ${
                          formData.businessType === type
                            ? 'bg-[#c5a059] text-black border-[#c5a059] font-medium'
                            : 'bg-white/5 text-gray-400 border-white/10 hover:border-gray-500'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. YOU ARE STRUGGLING FROM */}
              <div>
                <label className="block text-xs font-semibold tracking-wider text-gray-200 uppercase mb-2">
                  4. YOU ARE STRUGGLING FROM <span className="text-[#d4af37]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {struggleOptions.map((opt) => {
                    const isSelected = formData.struggles.includes(opt.id);
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => toggleStruggle(opt.id)}
                        className={`text-left px-4 py-3 rounded-sm border text-xs font-medium transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#c5a059]/15 border-[#d4af37] text-white shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                            : 'bg-[#141419] border-white/10 text-gray-300 hover:border-white/20'
                        }`}
                      >
                        <span>{opt.label}</span>
                        <div
                          className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-[#d4af37] border-[#d4af37] text-black' : 'border-gray-600'
                          }`}
                        >
                          {isSelected && <CheckCircle className="w-3 h-3 text-black stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. MARKETING BUDGET QUALIFICATION (40K) */}
              <div className="p-4 rounded-sm bg-[#15151c] border border-white/10">
                <label className="block text-xs font-semibold tracking-wider text-[#d4af37] uppercase mb-1">
                  5. If your marketing budget is Less than 40K don't fill it <span className="text-white">*</span>
                </label>
                <p className="text-[11px] text-gray-400 mb-3">
                  EVOC allocates dedicated performance marketers and content production teams for high-ROI scale.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option A: yes i have */}
                  <label
                    onClick={() => setFormData({ ...formData, hasMarketingBudget40k: 'yes i have' })}
                    className={`cursor-pointer p-3 rounded-sm border text-xs flex items-center justify-between transition-all ${
                      formData.hasMarketingBudget40k === 'yes i have'
                        ? 'bg-emerald-950/30 border-emerald-500 text-emerald-300'
                        : 'bg-[#111115] border-white/10 text-gray-300 hover:border-white/25'
                    }`}
                  >
                    <div>
                      <span className="font-semibold block">a. Yes, I have</span>
                      <span className="text-[10px] text-gray-400">Monthly budget ₹40,000+</span>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        formData.hasMarketingBudget40k === 'yes i have'
                          ? 'border-emerald-500 bg-emerald-500 text-black'
                          : 'border-gray-600'
                      }`}
                    >
                      {formData.hasMarketingBudget40k === 'yes i have' && (
                        <div className="w-1.5 h-1.5 bg-black rounded-full" />
                      )}
                    </div>
                  </label>

                  {/* Option B: no i dont */}
                  <label
                    onClick={() => setFormData({ ...formData, hasMarketingBudget40k: 'no i dont' })}
                    className={`cursor-pointer p-3 rounded-sm border text-xs flex items-center justify-between transition-all ${
                      formData.hasMarketingBudget40k === 'no i dont'
                        ? 'bg-amber-950/30 border-amber-500 text-amber-300'
                        : 'bg-[#111115] border-white/10 text-gray-300 hover:border-white/25'
                    }`}
                  >
                    <div>
                      <span className="font-semibold block">b. No, I don't</span>
                      <span className="text-[10px] text-gray-400">Under ₹40,000 / month</span>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        formData.hasMarketingBudget40k === 'no i dont'
                          ? 'border-amber-500 bg-amber-500 text-black'
                          : 'border-gray-600'
                      }`}
                    >
                      {formData.hasMarketingBudget40k === 'no i dont' && (
                        <div className="w-1.5 h-1.5 bg-black rounded-full" />
                      )}
                    </div>
                  </label>
                </div>

                {/* Sub-40K warning callout */}
                {formData.hasMarketingBudget40k === 'no i dont' && (
                  <div className="mt-3 p-3 bg-amber-900/25 border border-amber-600/40 rounded-sm text-[11px] text-amber-200/90 leading-relaxed flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Budget Requirement Notice:</strong> EVOC Hospitality requires a minimum monthly marketing budget of ₹40,000 to cover ad spends, shoot production, and account management. If your budget is currently less than 40K, please explore our free resources or re-apply once your growth budget is ready.
                    </div>
                  </div>
                )}
              </div>

              {/* 6. YOUR LOCATION & Auto-fetch */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold tracking-wider text-gray-200 uppercase">
                    6. YOUR LOCATION <span className="text-[#d4af37]">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAutoDetectLocation}
                    disabled={isLocating}
                    className="inline-flex items-center space-x-1.5 text-[11px] text-[#d4af37] hover:text-white transition-colors"
                  >
                    {isLocating ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Navigation className="w-3.5 h-3.5" />
                    )}
                    <span>{isLocating ? 'Detecting...' : 'Auto-Detect Location'}</span>
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Indiranagar, Bengaluru or Connaught Place, New Delhi"
                    value={formData.locationAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        locationAddress: e.target.value,
                        fetchedViaGeolocation: false,
                      })
                    }
                    className="w-full pl-10 pr-4 py-3 bg-[#141419] border border-white/10 rounded-sm text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
                  />
                  <MapPin className="w-4 h-4 text-[#c5a059] absolute left-3.5 top-3.5" />
                </div>

                {/* Location Detection Status Pill */}
                {locationStatus && (
                  <div
                    className={`mt-2 text-[11px] flex items-start flex-wrap gap-x-1.5 gap-y-1 break-words ${
                      locationStatus.type === 'success'
                        ? 'text-emerald-400'
                        : locationStatus.type === 'info'
                        ? 'text-[#c5a059]'
                        : 'text-amber-400'
                    }`}
                  >
                    {locationStatus.type === 'success' && <CheckCircle className="w-3 h-3" />}
                    {locationStatus.type === 'info' && <Loader2 className="w-3 h-3 animate-spin" />}
                    {locationStatus.type === 'error' && <AlertTriangle className="w-3 h-3" />}
                    <span>{locationStatus.text}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-white/10">
                <button
                  type="submit"
                  disabled={isSubmitting || formData.hasMarketingBudget40k === 'no i dont'}
                    className={`w-full py-3.5 px-3 sm:px-6 rounded-sm font-semibold text-xs tracking-[0.12em] sm:tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 text-center ${
                    formData.hasMarketingBudget40k === 'no i dont'
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                      : 'bg-[#c5a059] hover:bg-[#d4af37] text-black shadow-[0_4px_25px_rgba(197,160,89,0.35)] hover:shadow-[0_4px_30px_rgba(212,175,55,0.5)] cursor-pointer'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>PROCESSING STRATEGY CALL...</span>
                    </>
                  ) : formData.hasMarketingBudget40k === 'no i dont' ? (
                    <span>CANNOT SUBMIT (MIN. 40K BUDGET REQUIRED)</span>
                  ) : (
                    <>
                      <span>CONFIRM & BOOK STRATEGY CALL</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
