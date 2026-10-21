# Knight Riker Industries (Node.js)

Express + EJS rebuild of knightriker.com: Home, Parts, Gallery, Contact.

## Run
    npm install
    cp .env.example .env     # optional: add SMTP details for the contact form
    npm start                # http://localhost:3000

## Edit content
All copy, the parts list and gallery images are in `data/site.js`.
Templates are in `views/`, styling in `public/css/style.css`.

## Contact form
- With `SMTP_HOST` set, messages are emailed to `CONTACT_TO`.
- Without it, messages are appended to `data/messages.log`.
- Includes a honeypot field and a 5-per-15-minutes rate limit per IP.

## Going live
- Set `NODE_ENV=production` and `SITE_URL=https://knightriker.com`.
- Run behind a reverse proxy (nginx/Caddy) or a Node host (Render, Railway, Fly.io, cPanel Node app).
- `/services` and `/contact-us` redirect (301) to `/parts` and `/contact`, so old links keep working.
- Images currently load from knightriker.com. Download them into `public/img/` and update the URLs in
  `data/site.js` (and remove `https://knightriker.com` from `imgSrc` in `server.js`) before retiring WordPress.
- Set your YouTube channel URL in `data/site.js` (`youtube`).
