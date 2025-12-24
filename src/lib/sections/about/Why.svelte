<script lang="ts">
	import Panel from "$lib/components/visual/Panel.svelte";
	import { MessageCircleQuestionIcon } from "lucide-svelte";
	import { m } from "$lib/paraglide/messages";
	import { link, sanitize } from "$lib/store/index.svelte";
</script>

<Panel class="flex flex-col gap-3 p-6">
	<h2 class="text-2xl font-bold flex items-center">
		<div
			class="rounded-full bg-accent-pink p-2 inline-block mr-3 w-10 h-10"
		>
			<MessageCircleQuestionIcon color="black" />
		</div>
		{m["about.why.title"]()}
	</h2>
	<p class="text-lg font-normal">
		{@html sanitize(m["about.why.description"]())}
	</p>
	<div class="mt-4 pt-4 border-t border-panel-alt">
		<p class="text-base text-muted">
			Learn more: <a href="/faq" class="text-accent-blue hover:underline">FAQ</a> | 
			<a href="/convert" class="text-accent-blue hover:underline">Convert Files</a> | 
			<a href="/settings" class="text-accent-blue hover:underline">Settings</a> | 
			<a href="/privacy" class="text-accent-blue hover:underline">Privacy Policy</a>
		</p>
	</div>
</Panel>
