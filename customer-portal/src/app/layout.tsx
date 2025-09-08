export const metadata = { title: 'Digital PIN Customer Portal' };

import '@/app/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className="dp-body">
        <header className="dp-header">
          <div className="dp-header__brand">
            <span className="dp-logo" aria-hidden>◆</span>
            <strong>Digital PIN</strong>
          </div>
          <nav className="dp-nav">
            <a href="/" className="dp-nav__link">Home</a>
            <a href="/dashboard" className="dp-nav__link">Dashboard</a>
            <a href="/invoices" className="dp-nav__link">Invoices</a>
            <a href="/tickets" className="dp-nav__link">Tickets</a>
            <a href="/payments" className="dp-nav__link">Payments</a>
            <a href="/profile" className="dp-nav__link">Profile</a>
          </nav>
        </header>
        <main className="dp-main">{children}</main>
        <footer className="dp-footer">
          <small>© {new Date().getFullYear()} Digital PIN LLC</small>
        </footer>
      </body>
    </html>
  );
}
