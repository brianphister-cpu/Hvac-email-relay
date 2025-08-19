# HVAC Email Relay (Vercel + SendGrid)
A tiny serverless endpoint that emails your CSV export from the HVAC Troubleshooter app.

## Files
- `api/sendCsv.js` — the serverless function
- `package.json` — dependency for SendGrid SDK

## Setup
1. Create a GitHub repo named `hvac-email-relay`, upload these files (keep the `api/` folder).
2. In Vercel: Add New → Project → Import the repo → Deploy.
3. Vercel → Project → Settings → Environment Variables:
   - `SENDGRID_API_KEY`
   - `FROM_EMAIL`
   - `SHARED_SECRET`
   Then Redeploy.
4. Endpoint: `https://<your-project>.vercel.app/api/sendCsv`

## Test
Use curl (replace values):
curl -X POST https://<your-project>.vercel.app/api/sendCsv   -H "Content-Type: application/json"   -H "x-secret: YOUR_SHARED_SECRET"   -d '{"to":"you@example.com","subject":"Test CSV","body":"See attached.","filename":"test.csv","contentBase64":"QSxCLEMKMSwyLDMKNAo="}'
