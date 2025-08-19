# HVAC Email Relay

A simple relay to send HVAC CSV reports via SendGrid, deployed on Vercel.

## Routes

- `/api/ping` → returns pong
- `/api/ok` → returns OK
- `/api/checkEnv` → shows env var status
- `/api/sendCsv` → sends an email with CSV attached

## Test

Open `/test2.html` to send a test email.
