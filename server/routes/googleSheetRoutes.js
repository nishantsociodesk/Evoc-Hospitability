import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONFIG_FILE = path.join(__dirname, '..', 'google_sheet_config.json');

const router = express.Router();

export const getGoogleSheetWebhookUrl = () => {
  if (process.env.GOOGLE_SHEET_WEBHOOK_URL) {
    return process.env.GOOGLE_SHEET_WEBHOOK_URL;
  }
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
      return data.webhookUrl || '';
    }
  } catch (e) {}
  return '';
};

// Dispatch lead payload directly to Google Sheet Web App
export const dispatchToGoogleSheet = async (leadPayload) => {
  const webhookUrl = getGoogleSheetWebhookUrl();
  if (!webhookUrl) return { dispatched: false, reason: 'No webhook URL configured' };

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadPayload),
    });
    console.log(`✓ Forwarded lead to Google Sheet (Gmail): Status ${res.status}`);
    return { dispatched: true, status: res.status };
  } catch (err) {
    console.warn(`! Google Sheet dispatch error: ${err.message}`);
    return { dispatched: false, error: err.message };
  }
};

// @route   GET /api/google-sheet/config
// @desc    Get currently configured Google Sheet Webhook URL
router.get('/config', (req, res) => {
  const url = getGoogleSheetWebhookUrl();
  res.json({ success: true, isConfigured: Boolean(url) });
});

// @route   POST /api/google-sheet/test
// @desc    Send a test row to Google Sheet
router.post('/test', async (req, res) => {
  const targetUrl = getGoogleSheetWebhookUrl();
  if (!targetUrl) {
    return res.status(400).json({ success: false, message: 'No Google Sheet URL provided' });
  }

  const testPayload = {
    name: 'EVOC Test Partner',
    phone: '+91 98765 43210',
    businessName: 'The Royal Bistro Test',
    businessType: 'Restaurant',
    struggles: ['Branding', 'low visits'],
    hasMarketingBudget40k: 'yes i have',
    location: {
      address: 'MG Road, Bengaluru',
      city: 'Bengaluru',
      state: 'Karnataka',
      latitude: 12.9716,
      longitude: 77.5946,
      fetchedViaGeolocation: true,
    },
    status: 'Test Connection',
  };

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPayload),
    });
    res.json({ success: true, message: 'Test row sent to Google Sheet!', status: response.status });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to send to Google Sheet: ' + err.message });
  }
});

export default router;
