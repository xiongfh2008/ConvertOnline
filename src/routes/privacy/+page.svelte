<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import { link, sanitize } from "$lib/store/index.svelte";
	import { ShieldCheckIcon } from "lucide-svelte";
	import { VERT_NAME } from "$lib/util/consts.js";
</script>

<svelte:head>
	<title>Privacy Policy — {VERT_NAME} | Secure File Converter</title>
	<meta
		name="description"
		content="Privacy policy for {VERT_NAME} - a secure, privacy-focused file converter. Learn how we protect your data with local file processing, no tracking, and complete privacy. All conversions (except videos) happen on your device. No cookies, no personal data collection. GDPR compliant."
	/>
	<meta
		name="keywords"
		content="file converter privacy policy, privacy policy, secure file converter, data protection, local file processing, no tracking, privacy-focused converter, GDPR compliant, CCPA compliant, no cookies, anonymous analytics, WebAssembly file conversion, private file converter, 文件转换器隐私政策, 隐私保护, 数据保护"
	/>
	<meta property="og:title" content="Privacy Policy — {VERT_NAME} | Secure File Converter" />
	<meta
		property="og:description"
		content="Privacy policy for {VERT_NAME}. Learn how we protect your data with local file processing, no tracking, and complete privacy."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://convertonline.toolkitlife.com/privacy/" />
</svelte:head>

<div class="flex flex-col h-full items-center">
	<h1 class="hidden md:block text-[40px] tracking-tight leading-[72px] mb-6">
		<ShieldCheckIcon size="40" class="inline-block -mt-2 mr-2" />
		{m["privacy.title"]()}
	</h1>

	<div
		class="w-full max-w-[1280px] flex flex-col md:flex-row gap-4 p-4 md:px-4 md:py-0"
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
					<a href="/terms" class="text-accent-blue hover:underline text-sm">Terms & Conditions</a>
					<span class="text-muted">•</span>
					<a href="/contact" class="text-accent-blue hover:underline text-sm">Contact</a>
					<span class="text-muted">•</span>
					<a href="/settings" class="text-accent-blue hover:underline text-sm">Settings</a>
				</div>
			</div>

			<h2 class="text-2xl mb-3">{m["privacy.summary.title"]()}</h2>
			<p class="mb-4">
				{@html sanitize(m["privacy.summary.description"]())}
			</p>

			<h2 class="text-2xl mb-3">{m["privacy.conversions.title"]()}</h2>
			<p class="mb-4">
				{@html sanitize(m["privacy.conversions.description"]())}
			</p>

			<h2 class="text-2xl mb-3">
				{m["privacy.conversion_errors.title"]()}
			</h2>
			<div class="mb-4">
				{m["privacy.conversion_errors.description"]()}
				<ul class="list-disc list-inside mt-2 mb-2">
					<li>{m["privacy.conversion_errors.list_job_id"]()}</li>
					<li>{m["privacy.conversion_errors.list_format_from"]()}</li>
					<li>{m["privacy.conversion_errors.list_format_to"]()}</li>
					<li>{m["privacy.conversion_errors.list_stderr"]()}</li>
					<li>{m["privacy.conversion_errors.list_video"]()}</li>
				</ul>
				{m["privacy.conversion_errors.footer"]()}
			</div>

			<h3 class="text-xl mt-4 mb-2">{m["privacy.analytics.title"]()}</h3>
			<p class="mb-4">
				{@html sanitize(
					link(
						["settings_link", "plausible_link"],
						m["privacy.analytics.description"](),
						[
							"/settings",
							"https://plausible.io/privacy-focused-web-analytics",
						],
						[false, true],
					),
				)}
			</p>

			<h3 class="text-xl mt-4 mb-2">
				{m["privacy.local_storage.title"]()}
			</h3>
			<p class="mb-4">
				{@html sanitize(
					link(
						["settings_link"],
						m["privacy.local_storage.description"](),
						["/settings"],
						[false],
					),
				)}
			</p>

			<h3 class="text-xl mt-4 mb-2">{m["privacy.contact.title"]()}</h3>
			<p class="mb-0">
				{@html sanitize(
					link(
						["email_link"],
						m["privacy.contact.description"](),
						["mailto:xiongfh2000@outlook.com"],
						[false],
					),
				)}
			</p>

			<p class="text-sm text-muted mt-6">{m["privacy.last_updated"]()}</p>
		</div>
	</div>
</div>
