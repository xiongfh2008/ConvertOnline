<script lang="ts">
	import { onMount } from "svelte";
	import { goto, beforeNavigate, afterNavigate } from "$app/navigation";

	import { PUB_PLAUSIBLE_URL, PUB_HOSTNAME } from "$env/static/public";
	import { DISABLE_ALL_EXTERNAL_REQUESTS, VERT_NAME } from "$lib/util/consts.js";
	import * as Layout from "$lib/components/layout";
	import * as Navbar from "$lib/components/layout/Navbar";
	import featuredImage from "$lib/assets/VERT_Feature.webp";
	import { Settings } from "$lib/sections/settings/index.svelte";
	import {
		files,
		isMobile,
		effects,
		theme,
		dropping,
		vertdLoaded,
		locale,
		updateLocale,
	} from "$lib/store/index.svelte";
	import "$lib/css/app.scss";
	import { browser } from "$app/environment";
	import { initStores as initAnimStores } from "$lib/util/animation.js";
	import { VertdInstance } from "$lib/sections/settings/vertdSettings.svelte.js";

	let { children, data } = $props();
	let enablePlausible = $state(false);

	let scrollPositions = new Map<string, number>();

	beforeNavigate((nav) => {
		if (!nav.from || !$isMobile) return;
		scrollPositions.set(nav.from.url.pathname, window.scrollY);
	});

	afterNavigate((nav) => {
		if (!$isMobile) return;
		const scrollY = nav.to
			? scrollPositions.get(nav.to.url.pathname) || 0
			: 0;
		window.scrollTo(0, scrollY);
	});

	const dropFiles = (e: DragEvent) => {
		e.preventDefault();
		dropping.set(false);
		const oldLength = files.files.length;
		files.add(e.dataTransfer?.files);
		if (oldLength !== files.files.length) goto("/convert");
	};

	const handleDrag = (e: DragEvent, drag: boolean) => {
		e.preventDefault();
		dropping.set(drag);
	};

	const handlePaste = (e: ClipboardEvent) => {
		const clipboardData = e.clipboardData;
		if (!clipboardData || !clipboardData.files.length) return;
		e.preventDefault();
		const oldLength = files.files.length;
		files.add(clipboardData.files);
		if (oldLength !== files.files.length) goto("/convert");
	};

	onMount(() => {
		initAnimStores();

		const handleResize = () => {
			isMobile.set(window.innerWidth <= 768);
		};

		isMobile.set(window.innerWidth <= 768); // initial page load
		window.addEventListener("resize", handleResize); // handle window resize
		window.addEventListener("paste", handlePaste);

		effects.set(localStorage.getItem("effects") !== "false"); // defaults to true if not set
		theme.set(
			(localStorage.getItem("theme") as "light" | "dark") || "dark",
		);
		const storedLocale = localStorage.getItem("locale");
		if (storedLocale) updateLocale(storedLocale);

		Settings.instance.load();

		if (!DISABLE_ALL_EXTERNAL_REQUESTS) {
			VertdInstance.instance
				.url()
				.then((u) => fetch(`${u}/api/version`))
				.then((res) => {
					if (res.ok) $vertdLoaded = true;
				});
		}

		return () => {
			window.removeEventListener("paste", handlePaste);
			window.removeEventListener("resize", handleResize);
		};
	});

	$effect(() => {
		enablePlausible =
			!!PUB_PLAUSIBLE_URL &&
			Settings.instance.settings.plausible &&
			!DISABLE_ALL_EXTERNAL_REQUESTS;
		if (!enablePlausible && browser) {
			// reset pushState on opt-out so that plausible stops firing events on page navigation
			history.pushState = History.prototype.pushState;
		}
	});
</script>

<svelte:head>
	<title>{VERT_NAME} — Free Online File Converter | 250+ Formats | No Size Limit</title>
	<meta name="theme-color" content="#7C3AED" />
	<meta
		name="title"
		content="{VERT_NAME} — Free Online File Converter | 250+ Formats | No Size Limit"
	/>
	<meta
		name="description"
		content="Free online file converter supporting 250+ formats. Convert images, audio, documents, and videos locally on your device using WebAssembly. No file size limit, no ads, privacy-focused, and open source. Convert JPEG, PNG, MP3, WAV, PDF, DOCX, MP4, AVI and more."
	/>
	<meta
		name="keywords"
		content="file converter, online file converter, free file converter, local file converter, privacy-focused converter, WebAssembly converter, 250+ formats, no file size limit, image converter, audio converter, video converter, document converter, open source converter, secure file conversion, browser-based converter, JPEG converter, PNG converter, MP3 converter, WAV converter, PDF converter, DOCX converter, MP4 converter, AVI converter, file format converter, multi-format converter, universal converter, client-side converter, offline file converter, unlimited file size converter, 文件转换器, 在线文件转换, 免费文件转换器, 本地文件转换, 隐私保护转换器"
	/>
	<meta property="og:url" content="https://vert.sh" />
	<meta property="og:type" content="website" />
	<meta
		property="og:title"
		content="{VERT_NAME} — Free Online File Converter | 250+ Formats | No Size Limit"
	/>
	<meta
		property="og:description"
		content="Free online file converter supporting 250+ formats. Convert images, audio, documents, and videos locally on your device using WebAssembly. No file size limit, no ads, privacy-focused, and open source."
	/>
	<meta property="og:image" content={featuredImage} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="vert.sh" />
	<meta property="twitter:url" content="https://vert.sh" />
	<meta
		property="twitter:title"
		content="{VERT_NAME} — Free Online File Converter | 250+ Formats | No Size Limit"
	/>
	<meta
		property="twitter:description"
		content="Free online file converter supporting 250+ formats. Convert images, audio, documents, and videos locally on your device using WebAssembly. No file size limit, no ads, privacy-focused, and open source."
	/>
	<meta property="twitter:image" content={featuredImage} />
	<link rel="manifest" href="/manifest.json" />
	<link rel="canonical" href="https://vert.sh/" />
	<meta name="author" content="ConvertOnline" />
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
	<meta name="googlebot" content="index, follow" />
	<meta name="language" content="en" />
	<meta name="revisit-after" content="7 days" />
	<meta name="rating" content="general" />
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "WebApplication",
			"name": VERT_NAME,
			"alternateName": "ConvertOnline File Converter",
			"description": "Free online file converter supporting 250+ formats. Convert images, audio, documents, and videos locally on your device using WebAssembly. No file size limit, no ads, privacy-focused, and open source.",
			"url": "https://vert.sh",
			"applicationCategory": "UtilityApplication",
			"operatingSystem": "Web Browser",
			"browserRequirements": "Requires JavaScript. Requires HTML5.",
			"offers": {
				"@type": "Offer",
				"price": "0",
				"priceCurrency": "USD"
			},
			"aggregateRating": {
				"@type": "AggregateRating",
				"ratingValue": "5",
				"ratingCount": "1"
			},
			"featureList": [
				"Convert 250+ file formats",
				"Local file processing with WebAssembly",
				"No file size limits",
				"Privacy-focused - no tracking",
				"Open source",
				"Batch file conversion",
				"Image, audio, document, and video conversion",
				"Client-side processing",
				"Offline capable",
				"Free and unlimited"
			],
			"softwareVersion": "1.10.5",
			"license": "https://www.gnu.org/licenses/agpl-3.0.html",
			"creator": {
				"@type": "Organization",
				"name": "ConvertOnline",
				"url": "https://vert.sh",
				"sameAs": "https://vert.sh"
			},
			"keywords": "file converter, online file converter, free file converter, local file converter, privacy-focused converter, WebAssembly converter, 250+ formats, no file size limit, image converter, audio converter, video converter, document converter, open source converter, secure file conversion, browser-based converter",
			"inLanguage": ["en", "zh-Hans", "zh-Hant", "es", "fr", "de", "it", "ja", "ko", "tr", "hr", "el", "id", "pt-BR"],
			"isAccessibleForFree": true,
			"usageInfo": "ConvertOnline is a free, open-source file conversion tool. Users can upload files and convert them to various formats. Most conversions happen locally in the browser using WebAssembly. Video conversions may be processed on servers. No registration required. No file size limits for most formats."
		})}
	</script>
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "WebSite",
			"name": VERT_NAME,
			"url": "https://vert.sh",
			"potentialAction": {
				"@type": "SearchAction",
				"target": "https://vert.sh/convert/?q={search_term_string}",
				"query-input": "required name=search_term_string"
			},
			"publisher": {
				"@type": "Organization",
				"name": "ConvertOnline",
				"url": "https://vert.sh"
			}
		})}
	</script>
	{#if enablePlausible}
		<script
			defer
			data-domain={PUB_HOSTNAME || "vert.sh"}
			src="{PUB_PLAUSIBLE_URL}/js/script.js"
		></script>
	{/if}
	{#if data.isAprilFools}
		<style>
			* {
				font-family: "Comic Sans MS", "Comic Sans", cursive !important;
			}
		</style>
	{/if}
</svelte:head>

<!-- FIXME: if user resizes between desktop/mobile, highlight of page disappears (only shows on original size) -->
{#key $locale}
	<div
		class="flex flex-col min-h-screen h-full w-full overflow-x-hidden"
		ondrop={dropFiles}
		ondragenter={(e) => handleDrag(e, true)}
		ondragover={(e) => handleDrag(e, true)}
		ondragleave={(e) => handleDrag(e, false)}
		role="region"
	>
		<Layout.UploadRegion />

		<div>
			<Layout.MobileLogo />
			<Navbar.Desktop />
		</div>

		<!-- 
		SvelteKit throws the following warning when developing - safe to ignore as we render the children in this component:
		`<slot />` or `{@render ...}` tag missing — inner content will not be rendered
		-->
		<Layout.PageContent {children} />

		<Layout.Toasts />
		<Layout.Dialogs />

		<div>
			<Layout.Footer />
			<Navbar.Mobile />
		</div>
	</div>
{/key}

<!-- Gradients placed here to prevent it overlapping in transitions -->
<Layout.Gradients />
