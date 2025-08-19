// api/sendCsv.js
const sgMail = require('@sendgrid/mail');

module.exports = async (req, res) => {
  // --- CORS so your app can call this from another domain ---
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  // ----------------------------------------------------------

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, subject, text, csvContent, secret } = req.body || {};

    // simple shared-secret check (optional – remove if you don’t want it)
    if (secret && secret !== process.env.SHARED_SECRET) {
      return res.status(403).json({ error: 'Forbidden: bad secret' });
    }

    if (!to || !csvContent) {
      return res.status(400).json({ error: 'Missing "to" or "csvContent"' });
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    await sgMail.send({
      to,
      from: process.env.FROM_EMAIL,           // must be your verified Single Sender
      subject: subject || 'HVAC Report',
      text: text || 'See attached CSV report.',
      attachments: [{
        content: Buffer.from(csvContent).toString('base64'),
        filename: 'hvac_history.csv',
        type: 'text/csv',
        disposition: 'attachment'
      }]
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('sendCsv error:', err?.response?.body || err);
    return res.status(500).json({ error: err?.message || 'send failed' });
  }
};
