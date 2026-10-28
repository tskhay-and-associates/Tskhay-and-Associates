// The old Let's Talk address (/lets-talk/) now forwards visitors to the
// Let's Talk section of the homepage, where the contact form lives.
import { home } from './content/site.js';

window.location.replace(home('#contact'));
