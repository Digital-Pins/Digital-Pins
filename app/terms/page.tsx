import { getContentPage } from "@/lib/contentPages";

export const metadata = {
	title: "Terms — Digital PIN",
	description: "Terms and conditions.",
};

export default async function TermsPage() {
	const page = await getContentPage("terms");
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

