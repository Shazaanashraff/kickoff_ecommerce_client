import React from 'react';

const socialIcons = [
  {
    href: '#',
    label: 'Facebook',
    svg: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.92.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
      </svg>
    ),
  },
  {
    href: '#',
    label: 'Instagram',
    svg: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.567 5.783 2.295 7.149 2.233 8.415 2.175 8.795 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.425 3.678 1.406 2.697 2.387 2.403 3.499 2.344 4.78 2.285 6.06 2.272 6.469 2.272 12c0 5.531.013 5.94.072 7.22.059 1.281.353 2.393 1.334 3.374.981.981 2.093 1.275 3.374 1.334 1.28.059 1.689.072 7.22.072s5.94-.013 7.22-.072c1.281-.059 2.393-.353 3.374-1.334.981-.981 1.275-2.093 1.334-3.374.059-1.28.072-1.689.072-7.22s-.013-5.94-.072-7.22c-.059-1.281-.353-2.393-1.334-3.374C21.393.425 20.281.131 19 .072 17.719.013 17.309 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
      </svg>
    ),
  },
  {
    href: '#',
    label: 'YouTube',
    svg: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.692 3.5 12 3.5 12 3.5s-7.692 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 7.88 0 12 0 12s0 4.12.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.308 20.5 12 20.5 12 20.5s7.692 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 16.12 24 12 24 12s0-4.12-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    href: '#',
    label: 'Line',
    svg: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M19.615 3.184C17.437 1.13 14.13 0 12 0 5.373 0 0 5.373 0 12c0 2.13 1.13 5.437 3.184 7.615C5.363 22.87 8.67 24 12 24c6.627 0 12-5.373 12-12 0-3.33-1.13-6.637-3.184-8.816zM12 22.153c-2.91 0-5.63-.91-7.615-2.615C2.91 17.63 2 14.91 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.91-.91 5.63-2.615 7.615C17.63 21.243 14.91 22.153 12 22.153zm2.153-10.153h-1.307v3.077c0 .307-.25.553-.553.553s-.553-.246-.553-.553v-3.077h-1.307c-.307 0-.553-.25-.553-.553s.246-.553.553-.553h3.077c.307 0 .553.246.553.553s-.246.553-.553.553z" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="bg-[var(--color-light-gray)] text-[var(--color-dark-gray)] pt-12 pb-4 px-4 md:px-16 mt-16 z-30 relative">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-[var(--color-medium-gray)] pb-10 mb-10 gap-8">
          <div>
            <h2 className="text-3xl font-serif mb-2">Join Our Newsletter</h2>
            <p className="text-[var(--color-medium-gray)] mb-4">Subscribe for updates on our next drop.</p>
            <form className="flex max-w-md">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-l bg-[var(--color-white)] border border-[var(--color-light-gray)] focus:outline-none"
              />
              <button type="submit" className="px-5 bg-[var(--color-white)] border border-l-0 border-[var(--color-light-gray)] rounded-r flex items-center justify-center hover:bg-[var(--color-medium-gray)] transition">
                <span className="text-2xl">→</span>
              </button>
            </form>
          </div>
          <div className="flex flex-1 justify-between gap-8">
            <div>
              <div className="uppercase text-xs font-semibold mb-3 tracking-widest">Account</div>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">My Account</a></li>
              </ul>
            </div>
            <div>
              <div className="uppercase text-xs font-semibold mb-3 tracking-widest">Brand</div>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">About</a></li>
                <li><a href="#" className="hover:underline">Press</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
              </ul>
            </div>
            <div>
              <div className="uppercase text-xs font-semibold mb-3 tracking-widest">Support</div>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">FAQs</a></li>
                <li><a href="#" className="hover:underline">Contact Us</a></li>
                <li><a href="#" className="hover:underline">Find A Store</a></li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 min-w-[180px]">
              <div className="flex items-center gap-2 text-[var(--color-medium-gray)]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 01-8 0 4 4 0 018 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7m0 0H9m3 0h3" /></svg>
                <span>support@jimthompson.com</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--color-medium-gray)]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5h2l.4 2M7 13h10l4-8H5.4" /><circle cx="7" cy="21" r="1" /><circle cx="17" cy="21" r="1" /></svg>
                <span>+66 (0) 2-700-2801</span>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-3xl font-signature">Jim Thompson</span>
          </div>
          <div className="flex items-center gap-6 mb-2">
            {socialIcons.map((icon) => (
              <a key={icon.label} href={icon.href} aria-label={icon.label} className="text-[var(--color-dark-gray)] hover:text-[var(--color-medium-gray)] transition">
                {icon.svg}
              </a>
            ))}
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-xs text-[var(--color-medium-gray)]">
            <a href="#" className="hover:underline">Terms & Conditions</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span>© 2025 Jim Thompson</span>
            <span>Designed by 360&5</span>
          </div>
        </div>
      </div>
      {/* Signature font style */}
      <style>{`
        .font-signature {
          font-family: 'Edu NSW ACT Hand Pre', cursive, sans-serif;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
