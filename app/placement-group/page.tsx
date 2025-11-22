export default function PlacementGroupPage() {
  const externalUrl = "https://erp.digitalpin.online/public/partnership/new.php";
  return (
    <main className="min-h-[60vh] container mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">Placement Group — Apply</h1>
      <p className="text-gray-700 mb-6">
        Join Digital PIN's Placement Group. We connect qualified partners and talent with
        projects where they can have real impact. Tell us about your profile and interests;
        we'll review and follow up.
      </p>
      <a
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded shadow"
      >
        Open Application Form
        <span aria-hidden>↗</span>
      </a>
    </main>
  );
}
