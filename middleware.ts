import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// next-auth removed; no token checks needed

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Redirect all portal traffic to Dolibarr WebPortal
  if (pathname.startsWith("/portal")) {
    const target = new URL(
      "https://erp.digitalpin.online/public/webportal/index.php"
    );
    return NextResponse.redirect(target);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*"],
};
