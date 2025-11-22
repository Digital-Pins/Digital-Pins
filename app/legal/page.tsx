import { getContentPage } from "@/lib/contentPages";

export const metadata = {
  title: "Legal Notice — Digital PIN",
};

export default async function LegalPage() {
  const page = await getContentPage("legal");
  return (
    <main className="container mx-auto px-6 py-10">
      <article className="prose prose-neutral max-w-none">
        {page ? (
          <div dangerouslySetInnerHTML={{ __html: page.html }} />
        ) : (
          <p>Content coming soon.</p>
        )}
      </article>
    </main>
  );
}
