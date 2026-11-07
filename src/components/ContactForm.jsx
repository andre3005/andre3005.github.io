import { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { SITE } from '../content/site';
import { useCopy } from '../lib/prefs';
import { fadeUp } from '../lib/motion';

// With a Web3Forms key, messages go straight to the inbox.
// Without one, the form opens the visitor's email app with the message filled in.
const ContactForm = () => {
  const { t } = useCopy();
  const c = t.contact;
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error | invalid
  const canPost = Boolean(SITE.web3formsKey);

  if (!canPost && !SITE.email) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.botcheck) return; // honeypot: bots fill hidden fields
    if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
      setStatus('invalid');
      return;
    }

    if (!canPost) {
      const body = `${data.message}\n\n${data.name}\n${data.email}`;
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(c.mailSubject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: SITE.web3formsKey,
          subject: `Website: message from ${data.name}`,
          from_name: SITE.name,
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) throw new Error(json.message || res.statusText);
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <Motion.div className="panel contact-form contact-done" variants={fadeUp} role="status">
        <span className="contact-done-mark" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <p>{c.sent}</p>
        <button type="button" className="btn btn--ghost" onClick={() => setStatus('idle')}>
          {c.another}
        </button>
      </Motion.div>
    );
  }

  return (
    <Motion.form className="panel contact-form" variants={fadeUp} onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <label className="field">
          <span>{c.name}</span>
          <input type="text" name="name" autoComplete="name" required />
        </label>
        <label className="field">
          <span>{c.emailField}</span>
          <input type="email" name="email" autoComplete="email" required />
        </label>
      </div>
      <label className="field">
        <span>{c.message}</span>
        <textarea name="message" rows={5} required />
      </label>
      <input type="checkbox" name="botcheck" className="visually-hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {(status === 'error' || status === 'invalid') && (
        <p className="form-error" role="alert">
          {status === 'error' ? c.error : c.required}
        </p>
      )}
      <button type="submit" className="btn btn--block" disabled={status === 'sending'}>
        {status === 'sending' ? c.sending : canPost ? c.send : c.openMail}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </Motion.form>
  );
};

export default ContactForm;
