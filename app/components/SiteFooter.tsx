import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t bg-white/70 backdrop-blur-md">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} DigitalPin. All rights reserved.
        </p>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/#solutions" className="hover:text-brand-600">
            Solutions
          </Link>
          <Link href="/#partners" className="hover:text-brand-600">
            Partners
          </Link>
          <Link href="/#contact" className="hover:text-brand-600">
            Contact
          </Link>
          <Link href="/legal" className="hover:text-brand-600">
            Legal
          </Link>
          <Link href="/placement-group" className="hover:text-brand-600">
            Placement Group
          </Link>
          {/* Update: direct external link to WebPortal */}
          <a
            href="https://erp.digitalpin.online/public/webportal/index.php"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-700 hover:text-brand-600"
          >
            Client Portal
          </a>
        </nav>
      </div>
    </footer>
  );
}
