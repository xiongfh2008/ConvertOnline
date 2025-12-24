<script lang="ts">
	import { CONTACT_EMAIL } from "$lib/util/consts";
	import { m } from "$lib/paraglide/messages";
	import Logo from "$lib/components/visual/svg/Logo.svelte";
	import { MailIcon, HelpCircleIcon } from "lucide-svelte";

	const year = new Date().getFullYear();
</script>

<footer
	class="hidden md:block w-full border-t border-separator mt-12 bg-panel"
>
	<div
		class="w-full max-w-[1280px] mx-auto px-6 md:px-8 py-8 flex flex-col md:flex-row gap-8 md:gap-12"
	>
		<!-- Product Information -->
		<div class="flex flex-col gap-3 flex-1">
			<div class="flex items-center gap-3">
				<div class="w-10 h-10">
					<Logo />
				</div>
				<span class="text-lg font-bold text-foreground">ConvertOnline</span>
			</div>
			<p class="text-sm text-muted">
				{m["footer.copyright"]({ year })} {m["footer.all_rights_reserved"]()}
			</p>
			<p class="text-sm text-muted">
				{m["footer.version"]()} 1.10.5
			</p>
		</div>

		<!-- Company Links -->
		<div class="flex flex-col gap-3">
			<h3 class="text-base font-bold text-foreground">
				{m["footer.company"]()}
			</h3>
			<a href="/about/" class="text-sm text-muted hover:underline">
				{m["footer.about_us"]()}
			</a>
			<a href="/faq/" class="text-sm text-muted hover:underline">
				{m["footer.faq"]()}
			</a>
			<a href="/contact/" class="text-sm text-muted hover:underline">
				{m["footer.contact_us"]()}
			</a>
		</div>

		<!-- Legal Links -->
		<div class="flex flex-col gap-3">
			<h3 class="text-base font-bold text-foreground">
				{m["footer.legal"]()}
			</h3>
			<a href="/terms/" class="text-sm text-muted hover:underline">
				{m["footer.terms_and_conditions"]()}
			</a>
			<a href="/privacy/" class="text-sm text-muted hover:underline">
				{m["footer.privacy_policy"]()}
			</a>
		</div>

		<!-- Contact Methods -->
		<div class="flex flex-col gap-3">
			<h3 class="text-base font-bold text-foreground">
				{m["footer.contact_methods"]()}
			</h3>
			<div class="flex gap-4">
				<a
					href="mailto:{CONTACT_EMAIL}"
					class="w-10 h-10 rounded-full border-2 border-separator flex items-center justify-center text-foreground hover:bg-panel-highlight transition-colors"
					title={m["footer.email"]()}
				>
					<MailIcon size="20" />
				</a>
				<a
					href="/faq/"
					class="w-10 h-10 rounded-full border-2 border-separator flex items-center justify-center text-foreground hover:bg-panel-highlight transition-colors"
					title={m["footer.help"]()}
				>
					<HelpCircleIcon size="20" />
				</a>
			</div>
		</div>
	</div>
</footer>
