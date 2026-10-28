import { contact } from '../content/site.js';
import ContactForm from './ContactForm.jsx';

// The Let's Talk section. Every "Contact Us" button on the site scrolls here.
export default function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div className="contact-copy">
          <h2 id="contact-title">{contact.title}</h2>
          <p className="lead">{contact.body}</p>
          {contact.photo && (
            <figure className="contact-photo">
              <img
                src={contact.photo.src}
                alt={contact.photo.alt}
                width={contact.photo.width}
                height={contact.photo.height}
                loading="lazy"
                decoding="async"
              />
            </figure>
          )}
        </div>
        <div className="contact-form-wrap">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
