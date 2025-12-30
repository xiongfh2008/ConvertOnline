<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import { link, sanitize } from "$lib/store/index.svelte";
	import { HelpCircleIcon } from "lucide-svelte";
	import { VERT_NAME } from "$lib/util/consts.js";

	// Pre-build JSON-LD structured data
	const faqPageJson = JSON.stringify({
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": [
			{
				"@type": "Question",
				"name": String(m["faq.what_is.title"]()),
				"acceptedAnswer": {
					"@type": "Answer",
					"text": String(m["faq.what_is.description"]())
				}
			},
			{
				"@type": "Question",
				"name": String(m["faq.supported_formats.title"]()),
				"acceptedAnswer": {
					"@type": "Answer",
					"text": String(m["faq.supported_formats.description"]())
				}
			},
			{
				"@type": "Question",
				"name": String(m["faq.file_size.title"]()),
				"acceptedAnswer": {
					"@type": "Answer",
					"text": String(m["faq.file_size.description"]())
				}
			},
			{
				"@type": "Question",
				"name": String(m["faq.conversion_location.title"]()),
				"acceptedAnswer": {
					"@type": "Answer",
					"text": String(m["faq.conversion_location.description"]())
				}
			},
			{
				"@type": "Question",
				"name": String(m["faq.video_conversion.title"]()),
				"acceptedAnswer": {
					"@type": "Answer",
					"text": String(m["faq.video_conversion.description"]())
				}
			},
			{
				"@type": "Question",
				"name": String(m["faq.filename.title"]()),
				"acceptedAnswer": {
					"@type": "Answer",
					"text": String(m["faq.filename.description"]())
				}
			},
			{
				"@type": "Question",
				"name": String(m["faq.default_format.title"]()),
				"acceptedAnswer": {
					"@type": "Answer",
					"text": String(m["faq.default_format.description"]())
				}
			},
			{
				"@type": "Question",
				"name": String(m["faq.quality.title"]()),
				"acceptedAnswer": {
					"@type": "Answer",
					"text": String(m["faq.quality.description"]())
				}
			},
			{
				"@type": "Question",
				"name": String(m["faq.metadata.title"]()),
				"acceptedAnswer": {
					"@type": "Answer",
					"text": String(m["faq.metadata.description"]())
				}
			},
			{
				"@type": "Question",
				"name": String(m["faq.batch.title"]()),
				"acceptedAnswer": {
					"@type": "Answer",
					"text": String(m["faq.batch.description"]())
				}
			},
			{
				"@type": "Question",
				"name": String(m["faq.errors.title"]()),
				"acceptedAnswer": {
					"@type": "Answer",
					"text": String(m["faq.errors.description"]())
				}
			},
			{
				"@type": "Question",
				"name": String(m["faq.cache.title"]()),
				"acceptedAnswer": {
					"@type": "Answer",
					"text": String(m["faq.cache.description"]())
				}
			}
		]
	});
</script>

<svelte:head>
	<title>FAQ — {VERT_NAME} | Frequently Asked Questions</title>
	<meta
		name="description"
		content="Frequently asked questions about {VERT_NAME} file converter. Learn about supported formats, file size limits, conversion process, privacy, and more. Get answers to common questions about converting images, audio, documents, and videos."
	/>
	<meta
		name="keywords"
		content="file converter FAQ, file converter questions, file converter help, how to convert files, file converter guide, file format converter FAQ, online file converter help, file conversion questions, 文件转换器常见问题, 文件转换器帮助"
	/>
	<meta property="og:title" content="FAQ — {VERT_NAME} | Frequently Asked Questions" />
	<meta
		property="og:description"
		content="Frequently asked questions about {VERT_NAME} file converter. Learn about supported formats, file size limits, conversion process, privacy, and more."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://convertonline.toolkitlife.com/faq/" />
	{@html `<script type="application/ld+json">${faqPageJson}</script>`}
</svelte:head>

<div class="flex flex-col h-full items-center">
	<h1 class="hidden md:block text-[40px] tracking-tight leading-[72px] mb-6">
		<HelpCircleIcon size="40" class="inline-block -mt-2 mr-2" />
		{m["faq.title"]()}
	</h1>

	<div
		class="w-full max-w-[1280px] mx-auto flex flex-col gap-4 p-4 md:px-4 md:py-0"
	>
		<div class="bg-panel rounded-2xl p-6 shadow-panel">
			<div class="flex flex-col gap-8">
				<!-- Quick Links -->
				<div class="pb-4 border-b border-panel-alt">
					<p class="text-sm text-muted mb-2">Related pages:</p>
					<div class="flex flex-wrap gap-2">
						<a href="/about" class="text-accent-blue hover:underline text-sm">About</a>
						<span class="text-muted">•</span>
						<a href="/convert" class="text-accent-blue hover:underline text-sm">Convert Files</a>
						<span class="text-muted">•</span>
						<a href="/settings" class="text-accent-blue hover:underline text-sm">Settings</a>
						<span class="text-muted">•</span>
						<a href="/contact" class="text-accent-blue hover:underline text-sm">Contact</a>
						<span class="text-muted">•</span>
						<a href="/privacy" class="text-accent-blue hover:underline text-sm">Privacy Policy</a>
						<span class="text-muted">•</span>
						<a href="/terms" class="text-accent-blue hover:underline text-sm">Terms & Conditions</a>
					</div>
				</div>

				<!-- What is ConvertOnline? -->
				<div class="flex flex-col gap-3">
					<h2 class="text-2xl font-bold">{m["faq.what_is.title"]()}</h2>
					<p class="text-base text-muted">
						{@html sanitize(m["faq.what_is.description"]())}
					</p>
				</div>

				<!-- Supported Formats -->
				<div class="flex flex-col gap-3">
					<h2 class="text-2xl font-bold">{m["faq.supported_formats.title"]()}</h2>
					<p class="text-base text-muted">
						{@html sanitize(m["faq.supported_formats.description"]())}
					</p>
				</div>

				<!-- File Size Limits -->
				<div class="flex flex-col gap-3">
					<h2 class="text-2xl font-bold">{m["faq.file_size.title"]()}</h2>
					<p class="text-base text-muted">
						{@html sanitize(m["faq.file_size.description"]())}
					</p>
				</div>

				<!-- Where Conversion Happens -->
				<div class="flex flex-col gap-3">
					<h2 class="text-2xl font-bold">{m["faq.conversion_location.title"]()}</h2>
					<p class="text-base text-muted">
						{@html sanitize(m["faq.conversion_location.description"]())}
					</p>
				</div>

				<!-- Video Conversion -->
				<div class="flex flex-col gap-3">
					<h2 class="text-2xl font-bold">{m["faq.video_conversion.title"]()}</h2>
					<p class="text-base text-muted">
						{@html sanitize(m["faq.video_conversion.description"]())}
					</p>
				</div>

				<!-- Customize Filename -->
				<div class="flex flex-col gap-3">
					<h2 class="text-2xl font-bold">{m["faq.filename.title"]()}</h2>
					<p class="text-base text-muted">
						{@html sanitize(
							link(
								["settings_link"],
								m["faq.filename.description"](),
								["/settings"],
								[false],
							),
						)}
					</p>
				</div>

				<!-- Default Format -->
				<div class="flex flex-col gap-3">
					<h2 class="text-2xl font-bold">{m["faq.default_format.title"]()}</h2>
					<p class="text-base text-muted">
						{@html sanitize(
							link(
								["settings_link"],
								m["faq.default_format.description"](),
								["/settings"],
								[false],
							),
						)}
					</p>
				</div>

				<!-- Conversion Quality -->
				<div class="flex flex-col gap-3">
					<h2 class="text-2xl font-bold">{m["faq.quality.title"]()}</h2>
					<p class="text-base text-muted">
						{@html sanitize(
							link(
								["settings_link"],
								m["faq.quality.description"](),
								["/settings"],
								[false],
							),
						)}
					</p>
				</div>

				<!-- Metadata -->
				<div class="flex flex-col gap-3">
					<h2 class="text-2xl font-bold">{m["faq.metadata.title"]()}</h2>
					<p class="text-base text-muted">
						{@html sanitize(
							link(
								["settings_link"],
								m["faq.metadata.description"](),
								["/settings"],
								[false],
							),
						)}
					</p>
				</div>

				<!-- Batch Conversion -->
				<div class="flex flex-col gap-3">
					<h2 class="text-2xl font-bold">{m["faq.batch.title"]()}</h2>
					<p class="text-base text-muted">
						{@html sanitize(m["faq.batch.description"]())}
					</p>
				</div>

				<!-- Conversion Errors -->
				<div class="flex flex-col gap-3">
					<h2 class="text-2xl font-bold">{m["faq.errors.title"]()}</h2>
					<p class="text-base text-muted">
						{@html sanitize(m["faq.errors.description"]())}
					</p>
				</div>

				<!-- Cache -->
				<div class="flex flex-col gap-3">
					<h2 class="text-2xl font-bold">{m["faq.cache.title"]()}</h2>
					<p class="text-base text-muted">
						{@html sanitize(
							link(
								["settings_link"],
								m["faq.cache.description"](),
								["/settings"],
								[false],
							),
						)}
					</p>
				</div>

				<!-- Additional Resources -->
				<div class="pt-4 mt-4 border-t border-panel-alt">
					<h3 class="text-xl font-bold mb-3">Need More Help?</h3>
					<p class="text-base text-muted mb-3">
						If you have more questions or need assistance, check out these resources:
					</p>
					<ul class="list-disc list-inside space-y-2 text-base text-muted">
						<li><a href="/about" class="text-accent-blue hover:underline">About ConvertOnline</a> - Learn more about our mission and features</li>
						<li><a href="/contact" class="text-accent-blue hover:underline">Contact Us</a> - Get in touch with our team</li>
						<li><a href="/settings" class="text-accent-blue hover:underline">Settings</a> - Customize your conversion preferences</li>
						<li><a href="/privacy" class="text-accent-blue hover:underline">Privacy Policy</a> - Understand how we protect your data</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>

