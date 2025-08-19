// api/sendCsv.js
import sgMail from '@sendgrid/mail';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-secret');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.headers['x-secret'] !== process.env.SHARED_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { to, subject, body, filename, contentBase64 } = req.body || {};
    if (!to || !filename || !contentBase64) {
      return res.status(400).json({ error: 'Missing to/filename/contentBase64' });
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    await sgMail.send({
      to,
      from: process.env.FROM_EMAIL,
      subject: subject || 'HVAC History CSV',
      text: body || 'See attached CSV.',
      attachments: [{
        content: contentBase64,
        filename,
        type: 'text/csv',
        disposition: 'attachment'
      }]
    });

    res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message || 'send failed' });
  }
}
