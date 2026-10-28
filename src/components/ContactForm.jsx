import { useState } from 'react';
import { contactForm, formEndpoint, site } from '../content/site.js';

// The contact form shown in the Let's Talk section.
// With a form service address in src/content/site.js (formEndpoint), messages are sent
// directly. Without one, sending opens the visitor's email app with the message filled in.
export default function ContactForm() {
  const f = contactForm.fields;
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error | handoff

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (!formEndpoint) {
      const body = [
        `Name: ${data.get('name')}`,
        `Email: ${data.get('email')}`,
        `Company: ${data.get('company') || ''}`,
        '',
        data.get('message'),
      ].join('\n');
      const subject = `Website inquiry from ${data.get('name')}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('handoff');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(formEndpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-card" role="status">
        <p className="form-success">{contactForm.success}</p>
      </div>
    );
  }

  return (
    <form className="form form-card" method="POST" action={formEndpoint || undefined} onSubmit={handleSubmit}>
      <input type="hidden" name="_subject" value="New message from the T&A website" />
      <p className="visually-hidden">
        <label>
          Leave this field empty <input name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="field">
        <label htmlFor="cf-name">{f.name}</label>
        <input id="cf-name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="cf-email">{f.email}</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field">
        <label htmlFor="cf-company">{f.company}</label>
        <input id="cf-company" name="company" type="text" autoComplete="organization" />
      </div>
      <div className="field">
        <label htmlFor="cf-message">{f.message}</label>
        <textarea id="cf-message" name="message" rows="5" required />
      </div>

      <button type="submit" className="button" disabled={status === 'sending'}>
        {status === 'sending' ? contactForm.sending : contactForm.submit}
      </button>
      <p className="form-error" role="alert">
        {status === 'error' ? contactForm.error : ''}
      </p>
      <p className="muted form-note">
        {status === 'handoff' ? contactForm.handoff : formEndpoint ? contactForm.privacy : contactForm.mailNote}
      </p>
    </form>
  );
}
