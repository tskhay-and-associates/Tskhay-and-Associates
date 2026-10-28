import { nav, site, home, contactButton } from '../content/site.js';

// The menu is always visible: one row beside the logo on wide screens,
// its own row under the logo on narrower screens (swipe sideways on a phone).
export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href={home()}>
          <img
            src={`${import.meta.env.BASE_URL}logo-tskhay-associates.png`}
            alt={site.name}
            width="185"
            height="24"
          />
        </a>

        <nav className="site-nav" aria-label="Main">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.label}
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <a href={item.href}>{item.label}</a>
                )}
              </li>
            ))}
            <li>
              <a className="button button-outline button-small" href={contactButton.href}>
                {contactButton.label}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
