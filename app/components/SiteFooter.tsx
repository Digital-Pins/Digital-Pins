import Link from "next/link";

export default function SiteFooter() {
  return (
      <footer className="bg-gray-100 border-t py-6 text-center text-sm text-gray-500">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <p>© {new Date().getFullYear()} Digital PIN LLC — All rights reserved.</p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <Link href="/legal" className="hover:text-brand-600">
              Legal
            </Link>
            <Link href="https://github.com/Digital-Pins" target="_blank" className="hover:text-brand-600">
              GitHub
            </Link>
            <Link href="/portal" className="hover:text-brand-600">
              Client Portal
            </Link>
            <Link href="#contact" className="hover:text-brand-600">
              Contact
            </Link>
                      <a
            className="text-brand-300 hover:text-brand-200"
            href="/docs/Digital%20PIN%20Company%20Profile%20Booklet.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Company Profile (PDF)
             </a>
          </div>
        </div>
      </footer>
  );
}
