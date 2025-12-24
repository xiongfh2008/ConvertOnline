<script lang="ts">
	import { browser } from "$app/environment";
	import { page } from "$app/state";
	import { duration, fade } from "$lib/util/animation";
	import {
		effects,
		files,
		goingLeft,
		updateLocale,
		availableLocales,
		locale,
	} from "$lib/store/index.svelte";
	import clsx from "clsx";
	import {
		Globe,
		InfoIcon,
		RefreshCw,
		SettingsIcon,
		UploadIcon,
		type Icon as IconType,
	} from "lucide-svelte";
	import { quintOut } from "svelte/easing";
	import Panel from "../../visual/Panel.svelte";
	import Logo from "../../visual/svg/Logo.svelte";
	import { beforeNavigate } from "$app/navigation";
	import { m } from "$lib/paraglide/messages";
	import { getLocale } from "$lib/paraglide/runtime";
	import Dropdown from "$lib/components/functional/Dropdown.svelte";
	import { onMount } from "svelte";

	const items = $derived<
		{
			name: string;
			url: string;
			activeMatch: (pathname: string) => boolean;
			icon: typeof IconType;
			badge?: number;
		}[]
	>([
		{
			name: m["navbar.upload"](),
			url: "/",
			activeMatch: (pathname) => pathname === "/",
			icon: UploadIcon,
		},
		{
			name: m["navbar.convert"](),
			url: "/convert/",
			activeMatch: (pathname) =>
				pathname === "/convert/" || pathname === "/convert",
			icon: RefreshCw,
			badge: files.files.length,
		},
		{
			name: m["navbar.settings"](),
			url: "/settings/",
			activeMatch: (pathname) => pathname.startsWith("/settings"),
			icon: SettingsIcon,
		},
		{
			name: m["navbar.about"](),
			url: "/about/",
			activeMatch: (pathname) => pathname.startsWith("/about"),
			icon: InfoIcon,
		},
	]);

	let links = $state<HTMLAnchorElement[]>([]);
	let container = $state<HTMLDivElement>();
	let containerRect = $derived(container?.getBoundingClientRect());
	let isInitialized = $state(false);

	const linkRects = $derived(links.map((l) => l.getBoundingClientRect()));

	const selectedIndex = $derived(
		items.findIndex((i) => i.activeMatch(page.url.pathname)),
	);

	const isSecretPage = $derived(selectedIndex === -1);

	$effect(() => {
		if (containerRect && linkRects.length > 0 && links.length > 0) {
			setTimeout(() => {
				isInitialized = true;
			}, 10);
		} else {
			isInitialized = false;
		}
	});

	beforeNavigate((e) => {
		const oldIndex = items.findIndex((i) =>
			i.activeMatch(e.from?.url.pathname || ""),
		);
		const newIndex = items.findIndex((i) =>
			i.activeMatch(e.to?.url.pathname || ""),
		);
		if (newIndex < oldIndex) {
			goingLeft.set(true);
		} else {
			goingLeft.set(false);
		}
	});

	// Language switch logic
	let currentLocale = $state("en");

	const getLanguageDisplayName = (locale: string) => {
		try {
			return availableLocales[locale as keyof typeof availableLocales];
		} catch {
			return locale.toUpperCase();
		}
	};

	const languageOptions = Object.keys(availableLocales).map((locale) =>
		getLanguageDisplayName(locale),
	);

	function handleLanguageChange(selectedLanguage: string) {
		const selectedLocale = Object.keys(availableLocales).find(
			(locale) => getLanguageDisplayName(locale) === selectedLanguage,
		);

		if (selectedLocale && selectedLocale !== currentLocale) {
			currentLocale = selectedLocale;
			updateLocale(selectedLocale);
		}
	}

	onMount(() => {
		currentLocale = localStorage.getItem("locale") || getLocale();
		
		// Subscribe to locale changes to keep the dropdown in sync
		const unsubscribe = locale.subscribe((newLocale) => {
			if (newLocale && newLocale !== currentLocale) {
				currentLocale = newLocale;
			}
		});
		
		return unsubscribe;
	});
</script>

{#snippet link(item: (typeof items)[0], index: number)}
	{@const Icon = item.icon}
	<a
		bind:this={links[index]}
		href={item.url}
		aria-label={item.name}
		class={clsx(
			"min-w-24 md:min-w-40 h-full relative z-10 rounded-xl flex flex-1 items-center justify-center gap-3 overflow-hidden",
			{
				"bg-panel-highlight":
					item.activeMatch(page.url.pathname) && !browser,
			},
		)}
		draggable={false}
	>
		<div class="grid grid-rows-1 grid-cols-1">
			{#key item.name}
				<div
					class="w-full row-start-1 col-start-1 h-full flex items-center justify-center gap-3"
					in:fade={{
						duration,
						easing: quintOut,
					}}
					out:fade={{
						duration,
						easing: quintOut,
					}}
				>
					<div class="relative">
						<Icon />
						{#if item.badge}
							<div
								class="absolute overflow-hidden grid grid-rows-1 grid-cols-1 -top-1 font-display -right-1 w-fit px-1.5 h-4 rounded-full bg-badge text-on-badge font-medium"
								style="font-size: 0.7rem;"
								transition:fade={{
									duration,
									easing: quintOut,
								}}
							>
								{#key item.badge}
									<div
										class="flex items-center justify-center w-full h-full col-start-1 row-start-1"
										in:fade={{
											duration,
											easing: quintOut,
										}}
										out:fade={{
											duration,
											easing: quintOut,
										}}
									>
										{item.badge}
									</div>
								{/key}
							</div>
						{/if}
					</div>
					<p
						class="font-medium hidden hyphens-auto break-all md:flex min-w-0"
					>
						{item.name}
					</p>
				</div>
			{/key}
		</div>
	</a>
{/snippet}

<style>
	:global(.language-selector-small > div) {
		font-size: 1rem !important; /* 与菜单项一致 */
		width: 100% !important;
		max-width: 100% !important;
		min-width: 0 !important;
		overflow: visible !important;
		position: relative !important;
		z-index: 1000 !important;
	}

	:global(.language-selector-small button) {
		font-size: 1rem !important; /* 与菜单项一致 */
		height: 56px !important;
		display: flex !important;
		align-items: center !important;
		justify-content: center !important;
		text-align: center !important;
		border-radius: 5px !important;
		gap: 0.5rem !important;
		width: 100% !important;
		max-width: 100% !important;
		min-width: 0 !important;
		padding-left: 0.5rem !important;
		padding-right: 0.5rem !important;
		overflow: hidden !important;
		background-color: transparent !important;
	}
	
	/* 按钮悬停状态 */
	:global(.language-selector-small button:hover) {
		background-color: var(--bg-panel-highlight) !important;
	}
	
	:global(.language-selector-small button > div) {
		display: flex !important;
		align-items: center !important;
		justify-content: center !important;
		text-align: center !important;
		flex: 0 1 auto !important;
		min-width: 0 !important;
		max-width: 100% !important;
		overflow: hidden !important;
		align-self: center !important;
		margin: 0 !important;
	}
	
	:global(.language-selector-small button > div.grid) {
		display: grid !important;
		align-items: center !important;
		justify-items: center !important;
		align-self: center !important;
		margin: 0 !important;
		height: auto !important;
	}
	
	:global(.language-selector-small button > div.grid > p) {
		display: flex !important;
		align-items: center !important;
		justify-content: center !important;
		height: 100% !important;
		margin: 0 !important;
	}
	
	:global(.language-selector-small button p) {
		text-align: center !important;
		width: auto !important;
		display: block !important;
		margin: 0 !important;
		white-space: nowrap !important;
		overflow: hidden !important;
		text-overflow: ellipsis !important;
		font-size: 1rem !important; /* 与菜单项一致 */
		font-weight: 500 !important; /* font-medium */
	}
	
	:global(.language-selector-small button) {
		position: relative !important;
		z-index: 1 !important;
	}
	
	/* 下拉菜单样式 - 确保在按钮下方显示 */
	:global(.language-selector-small > div > div[class*="absolute"]) {
		z-index: 1001 !important;
		position: absolute !important;
		top: 100% !important;
		left: 0 !important;
		margin-top: 0.25rem !important;
		width: 100% !important;
		min-width: max-content !important;
	}
</style>

<div bind:this={container}>
	<Panel class="max-w-[1200px] w-screen h-20 flex items-center gap-3 relative">
		{@const linkRect = linkRects.at(selectedIndex) || linkRects[0]}
		{#if linkRect && isInitialized}
			<div
				class="absolute bg-panel-highlight rounded-xl"
				style="width: {linkRect.width}px; height: {linkRect.height}px; top: {linkRect.top -
					(containerRect?.top || 0)}px; left: {linkRect.left -
					(containerRect?.left || 0)}px; opacity: {isSecretPage
					? 0
					: 1}; {$effects
					? `transition: left var(--transition) ${duration}ms, top var(--transition) ${duration}ms, opacity var(--transition) ${duration}ms;`
					: ''}"
			></div>
		{/if}
		<a
			class="w-28 h-full bg-accent rounded-xl items-center justify-center hidden md:flex overflow-hidden"
			href="/"
		>
			<Logo class="w-full h-full" />
		</a>
		{#each items as item, i (item.url)}
			{@render link(item, i)}
		{/each}
		<div class="w-0.5 bg-separator h-full"></div>
		<div class="flex items-center gap-2 px-2 h-full">
			<Globe class="w-4 h-4 flex-shrink-0" />
			<div class="min-w-[80px] md:min-w-[100px] w-[100px] md:w-[120px] max-w-[120px] h-full flex items-center language-selector-small" style="overflow: visible;">
				<Dropdown
					options={languageOptions}
					selected={getLanguageDisplayName(currentLocale)}
					onselect={handleLanguageChange}
				/>
			</div>
		</div>
	</Panel>
</div>
