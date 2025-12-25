<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import { CONTACT_EMAIL, VERT_NAME } from "$lib/util/consts";
	import { MailIcon } from "lucide-svelte";
	import Panel from "$lib/components/visual/Panel.svelte";
	import { sanitize } from "$lib/store/index.svelte";
</script>

<svelte:head>
	<title>Contact Us — {VERT_NAME} | Get in Touch</title>
	<meta
		name="description"
		content="Contact {VERT_NAME} team for questions, support, feedback, or partnerships. Reach us via email. We're here to help with your file conversion needs."
	/>
	<meta
		name="keywords"
		content="contact file converter, file converter support, file converter help, contact us, customer support, technical support, file converter feedback, 联系我们, 文件转换器支持, 客户支持"
	/>
	<meta property="og:title" content="Contact Us — {VERT_NAME} | Get in Touch" />
	<meta
		property="og:description"
		content="Contact {VERT_NAME} team for questions, support, feedback, or partnerships. Reach us via email."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://convertonline.toolkitlife.com/contact/" />
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "ContactPage",
			"name": "Contact Us",
			"description": `Contact ${VERT_NAME} team for questions, support, feedback, or partnerships.`,
			"url": "https://convertonline.toolkitlife.com/contact/",
			"mainEntity": {
				"@type": "Organization",
				"name": VERT_NAME,
				"email": CONTACT_EMAIL,
				"url": "https://convertonline.toolkitlife.com"
			}
		})}
	</script>
</svelte:head>

<div class="flex flex-col h-full items-center">
	<h1 class="hidden md:block text-[40px] tracking-tight leading-[72px] mb-6">
		<MailIcon size="40" class="inline-block -mt-2 mr-2" />
		{m["contact.title"]()}
	</h1>

	<div
		class="w-full max-w-[1280px] flex flex-col gap-4 p-4 md:px-4 md:py-0"
	>
		<div class="bg-panel rounded-2xl p-6 shadow-panel">
			<div class="flex flex-col gap-8">
				<!-- Quick Links -->
				<div class="pb-4 border-b border-panel-alt">
					<p class="text-sm text-muted mb-2">Related pages:</p>
					<div class="flex flex-wrap gap-2">
						<a href="/about" class="text-accent-blue hover:underline text-sm">About</a>
						<span class="text-muted">•</span>
						<a href="/faq" class="text-accent-blue hover:underline text-sm">FAQ</a>
						<span class="text-muted">•</span>
						<a href="/privacy" class="text-accent-blue hover:underline text-sm">Privacy Policy</a>
						<span class="text-muted">•</span>
						<a href="/terms" class="text-accent-blue hover:underline text-sm">Terms & Conditions</a>
						<span class="text-muted">•</span>
						<a href="/settings" class="text-accent-blue hover:underline text-sm">Settings</a>
					</div>
				</div>

				<!-- Introduction -->
				<div class="flex flex-col gap-3">
					<h2 class="text-2xl font-bold">{m["contact.intro.title"]()}</h2>
					<p class="text-base text-muted">
						{@html sanitize(m["contact.intro.description"]())}
					</p>
				</div>

				<!-- Email -->
				<Panel class="flex flex-col gap-4 p-6 max-w-md mx-auto">
					<div class="flex items-center gap-3">
						<div
							class="rounded-full bg-accent-blue p-3 inline-block w-12 h-12 flex items-center justify-center"
						>
							<MailIcon size="24" class="text-black" />
						</div>
						<h3 class="text-xl font-bold">{m["contact.email.title"]()}</h3>
					</div>
					<p class="text-sm text-muted">
						{m["contact.email.description"]()}
					</p>
					<a
						href="mailto:{CONTACT_EMAIL}"
						class="btn flex items-center justify-center gap-2 p-4 rounded-full bg-button text-black dynadark:text-white hover:opacity-90 transition-opacity"
					>
						<MailIcon size="20" />
						{CONTACT_EMAIL}
					</a>
				</Panel>

				<!-- Response Time -->
				<div class="flex flex-col gap-3">
					<h2 class="text-2xl font-bold">{m["contact.response.title"]()}</h2>
					<p class="text-base text-muted">
						{@html sanitize(m["contact.response.description"]())}
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

