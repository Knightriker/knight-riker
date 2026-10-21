require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const site = require('./data/site');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', 1);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https://knightriker.com'],
        styleSrc: ["'self'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        scriptSrc: ["'self'"],
        formAction: ["'self'"],
        // Only force https in production; plain http://localhost breaks otherwise.
        upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null
      }
    }
  })
);
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '7d' }));

// Make site content + current path available to every template.
app.use((req, res, next) => {
  res.locals.site = site;
  res.locals.path = req.path;
  res.locals.siteUrl = process.env.SITE_URL || `http://localhost:${PORT}`;
  next();
});

const page = (view, title, extra = {}) => (req, res) =>
  res.render(view, { title, ...extra });

app.get('/', page('index', 'Knight Riker Industries'));
app.get('/parts', page('parts', 'Parts | Knight Riker Industries'));
app.get('/gallery', page('gallery', 'Gallery | Knight Riker Industries'));
app.get('/contact', page('contact', 'Contact Us | Knight Riker Industries', { status: null, form: {} }));

// Keep old WordPress URLs working.
app.get('/services', (req, res) => res.redirect(301, '/parts'));
app.get('/contact-us', (req, res) => res.redirect(301, '/contact'));

// ---- Contact form ----
const contactLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: true, legacyHeaders: false });
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function deliver({ name, email, message }) {
  if (process.env.SMTP_HOST) {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
    });
    await transport.sendMail({
      from: process.env.CONTACT_FROM,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `Website message from ${name}`,
      text: `${message}\n\n-- ${name} <${email}>`
    });
  } else {
    const line = JSON.stringify({ at: new Date().toISOString(), name, email, message }) + '\n';
    fs.appendFileSync(path.join(__dirname, 'data', 'messages.log'), line);
  }
}

app.post('/contact', contactLimiter, async (req, res) => {
  const name = String(req.body.name || '').trim();
  const email = String(req.body.email || '').trim();
  const message = String(req.body.message || '').trim();
  const form = { name, email, message };
  const render = (status, code = 200, f = form) =>
    res.status(code).render('contact', { title: 'Contact Us | Knight Riker Industries', status, form: f });

  if (req.body.website) return render({ ok: true, text: 'Message sent.' }, 200, {}); // honeypot: silently drop bots
  if (!name || name.length > 100) return render({ ok: false, text: 'Enter your name.' }, 400);
  if (!EMAIL_RE.test(email) || email.length > 200) return render({ ok: false, text: 'Enter a valid email address.' }, 400);
  if (message.length < 5 || message.length > 5000) return render({ ok: false, text: 'Enter a message between 5 and 5000 characters.' }, 400);

  try {
    await deliver(form);
    render({ ok: true, text: 'Message sent. We will reply by email.' }, 200, {});
  } catch (err) {
    console.error('Contact delivery failed:', err);
    render({ ok: false, text: 'Your message could not be sent. Try again in a few minutes.' }, 500);
  }
});

app.use((req, res) => res.status(404).render('404', { title: 'Not found | Knight Riker Industries' }));

app.listen(PORT, () => console.log(`Knight Riker Industries running on http://localhost:${PORT}`));
