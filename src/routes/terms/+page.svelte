<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import { link, sanitize } from "$lib/store/index.svelte";
	import { FileTextIcon } from "lucide-svelte";
	import { VERT_NAME, CONTACT_EMAIL } from "$lib/util/consts.js";

	// Pre-build JSON-LD structured data
	const termsPageJson = JSON.stringify({
		"@context": "https://schema.org",
		"@type": "WebPage",
		"name": "Terms and Conditions",
		"description": `Terms and Conditions for ${VERT_NAME} file converter service.`,
		"url": "https://convertonline.toolkitlife.com/terms/"
	});
</script>

<svelte:head>
	<title>Terms and Conditions — {VERT_NAME} | Legal Terms</title>
	<meta
		name="description"
		content="Terms and Conditions for {VERT_NAME} - a free, privacy-focused file converter. Read our terms of service, user agreement, and legal information. Understand your rights and responsibilities when using our file conversion service."
	/>
	<meta
		name="keywords"
		content="terms and conditions, terms of service, user agreement, file converter terms, legal terms, service agreement, user terms, 条款和条件, 服务条款, 用户协议"
	/>
	<meta property="og:title" content="Terms and Conditions — {VERT_NAME} | Legal Terms" />
	<meta
		property="og:description"
		content="Terms and Conditions for {VERT_NAME} - a free, privacy-focused file converter. Read our terms of service and user agreement."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://convertonline.toolkitlife.com/terms/" />
	{@html `<script type="application/ld+json">${termsPageJson}</script>`}
</svelte:head>

<div class="flex flex-col h-full items-center">
	<h1 class="hidden md:block text-[40px] tracking-tight leading-[72px] mb-6">
		<FileTextIcon size="40" class="inline-block -mt-2 mr-2" />
		{m["terms.title"]()}
	</h1>

	<div
		class="w-full max-w-[1280px] mx-auto flex flex-col gap-4 p-4 md:px-4 md:py-0"
	>
		<div class="bg-panel rounded-2xl p-6 shadow-panel text-lg font-normal">
			<!-- Quick Links -->
			<div class="mb-6 pb-4 border-b border-panel-alt">
				<p class="text-sm text-muted mb-2">Related pages:</p>
				<div class="flex flex-wrap gap-2">
					<a href="/about" class="text-accent-blue hover:underline text-sm">About</a>
					<span class="text-muted">•</span>
					<a href="/faq" class="text-accent-blue hover:underline text-sm">FAQ</a>
					<span class="text-muted">•</span>
					<a href="/privacy" class="text-accent-blue hover:underline text-sm">Privacy Policy</a>
					<span class="text-muted">•</span>
					<a href="/contact" class="text-accent-blue hover:underline text-sm">Contact</a>
					<span class="text-muted">•</span>
					<a href="/settings" class="text-accent-blue hover:underline text-sm">Settings</a>
				</div>
			</div>

			<h2 class="text-2xl mb-3">{m["terms.acceptance.title"]()}</h2>
			<p class="mb-4">
				{@html sanitize(m["terms.acceptance.description"]())}
			</p>

			<h2 class="text-2xl mb-3">{m["terms.service.title"]()}</h2>
			<p class="mb-4">
				{@html sanitize(m["terms.service.description"]())}
			</p>

			<h2 class="text-2xl mb-3">{m["terms.user_responsibilities.title"]()}</h2>
			<div class="mb-4">
				<p class="mb-2">{m["terms.user_responsibilities.description"]()}</p>
				<ul class="list-disc list-inside mt-2 mb-2 space-y-1">
					<li>{m["terms.user_responsibilities.list_1"]()}</li>
					<li>{m["terms.user_responsibilities.list_2"]()}</li>
					<li>{m["terms.user_responsibilities.list_3"]()}</li>
					<li>{m["terms.user_responsibilities.list_4"]()}</li>
				</ul>
			</div>

			<h2 class="text-2xl mb-3">{m["terms.intellectual_property.title"]()}</h2>
			<p class="mb-4">
				{@html sanitize(m["terms.intellectual_property.description"]())}
			</p>

			<h2 class="text-2xl mb-3">{m["terms.disclaimer.title"]()}</h2>
			<p class="mb-4">
				{@html sanitize(m["terms.disclaimer.description"]())}
			</p>

			<h2 class="text-2xl mb-3">{m["terms.limitation_liability.title"]()}</h2>
			<p class="mb-4">
				{@html sanitize(m["terms.limitation_liability.description"]())}
			</p>

			<h2 class="text-2xl mb-3">{m["terms.changes.title"]()}</h2>
			<p class="mb-4">
				{@html sanitize(m["terms.changes.description"]())}
			</p>

			<h2 class="text-2xl mb-3">{m["terms.termination.title"]()}</h2>
			<p class="mb-4">
				{@html sanitize(m["terms.termination.description"]())}
			</p>

			<h2 class="text-2xl mb-3">{m["terms.governing_law.title"]()}</h2>
			<p class="mb-4">
				{@html sanitize(m["terms.governing_law.description"]())}
			</p>

			<h2 class="text-2xl mb-3">{m["terms.contact.title"]()}</h2>
			<p class="mb-0">
				{@html sanitize(
					link(
						["email_link"],
						m["terms.contact.description"](),
						[`mailto:${CONTACT_EMAIL}`],
						[false],
					),
				)}
			</p>

			<p class="text-sm text-muted mt-6">{m["terms.last_updated"]()}</p>
		</div>
	</div>
</div>

