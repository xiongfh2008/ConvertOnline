<script lang="ts">
	import Uploader from "$lib/components/functional/Uploader.svelte";
	import Tooltip from "$lib/components/visual/Tooltip.svelte";
	import { converters } from "$lib/converters";
	import { vertdLoaded } from "$lib/store/index.svelte";
	import clsx from "clsx";
	import { AudioLines, BookText, Check, Film, Image } from "lucide-svelte";
	import { m } from "$lib/paraglide/messages";
	import { OverlayScrollbarsComponent } from "overlayscrollbars-svelte";
	import { browser } from "$app/environment";
	import "overlayscrollbars/overlayscrollbars.css";
	import { onMount } from "svelte";
	import type { WorkerStatus } from "$lib/converters/converter.svelte";
	import { sanitize } from "$lib/store/index.svelte";
	import { DISABLE_ALL_EXTERNAL_REQUESTS } from "$lib/util/consts";

	const getSupportedFormats = (name: string) => {
		const converter = converters.find((c) => c.name === name);
		if (!converter) {
			console.warn(`Converter "${name}" not found`);
			return "none";
		}
		if (!converter.supportedFormats || converter.supportedFormats.length === 0) {
			console.warn(`Converter "${name}" has no supported formats`);
			return "none";
		}
		const formats = converter.supportedFormats
			.map(
				(f) =>
					`${f.name}${f.fromSupported && f.toSupported ? "" : "*"}`,
			)
			.join(", ");
		const result = formats.trim() || "none";
		if (result === "none") {
			console.warn(`Converter "${name}" formats list is empty`);
		}
		return result;
	};

	const worker: {
		[key: string]: {
			formats: string;
			icon: typeof Image;
			title: string;
			status: WorkerStatus;
		};
	} = $derived.by(() => {
		const output: {
			[key: string]: {
				formats: string;
				icon: typeof Image;
				title: string;
				status: WorkerStatus;
			};
		} = {
			Images: {
				formats: getSupportedFormats("imagemagick"),
				icon: Image,
				title: m["upload.cards.images"](),
				status:
					converters.find((c) => c.name === "imagemagick")?.status ||
					"not-ready",
			},
			Audio: {
				formats: getSupportedFormats("ffmpeg"),
				icon: AudioLines,
				title: m["upload.cards.audio"](),
				status:
					converters.find((c) => c.name === "ffmpeg")?.status ||
					"not-ready",
			},
			Documents: {
				formats: getSupportedFormats("pandoc"),
				icon: BookText,
				title: m["upload.cards.documents"](),
				status:
					converters.find((c) => c.name === "pandoc")?.status ||
					"not-ready",
			},
		};

		// Always show video card, but mark as not-ready if external requests are disabled
		const vertdConverter = converters.find((c) => c.name === "vertd");
		const videoFormats = vertdConverter
			? getSupportedFormats("vertd")
			: ".mkv, .mp4, .webm, .avi, .wmv, .mov, .gif, .mts, .ts, .m2ts, .mpg, .mpeg, .flv, .f4v, .vob, .m4v, .3gp, .3g2, .mxf, .ogv, .rm*, .rmvb*, .h264, .divx, .swf, .amv, .asf, .nut";
		
		output.Video = {
			formats: videoFormats,
			icon: Film,
			title: m["upload.cards.video"](),
			status: !DISABLE_ALL_EXTERNAL_REQUESTS && $vertdLoaded === true
				? "ready"
				: "not-ready",
		};

		return output;
	});

	const getTooltip = (format: string) => {
		const converter = converters.find((c) =>
			c.supportedFormats.some((sf) => sf.name === format),
		);

		const formatInfo = converter?.supportedFormats.find(
			(sf) => sf.name === format,
		);

		if (formatInfo) {
			const direction = formatInfo.fromSupported
				? m["upload.tooltip.direction_input"]()
				: m["upload.tooltip.direction_output"]();
			return m["upload.tooltip.partial_support"]({ direction });
		}
		return "";
	};

	const getStatusText = (status: WorkerStatus) => {
		switch (status) {
			case "downloading":
				return m["upload.cards.status.downloading"]();
			case "ready":
				return m["upload.cards.status.ready"]();
			default:
				// "not-ready", "error" and other statuses (somehow)
				return m["upload.cards.status.not_ready"]();
		}
	};

	let scrollContainers: HTMLElement[] = $state([]);
	// svelte-ignore state_referenced_locally
	let showBlur = $state(Array(Object.keys(worker).length).fill(false));

	onMount(() => {
		const handleResize = () => {
			for (let i = 0; i < scrollContainers.length; i++) {
				// show bottom blur if scrollable
				const container = scrollContainers[i];
				if (!container) return;
				showBlur[i] = container.scrollHeight > container.clientHeight;
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	});
</script>

<div class="max-w-6xl w-full mx-auto px-6 md:px-8">
	<div class="flex items-center justify-center pb-10 md:py-16">
		<div
			class="flex items-center h-auto gap-12 md:gap-24 md:flex-row flex-col"
		>
			<div class="flex-grow w-full text-center md:text-left">
				<h1
					class="text-4xl px-12 md:p-0 md:text-6xl flex-wrap tracking-tight leading-tight md:leading-[72px] mb-4 md:mb-6"
				>
					{m["upload.title"]()}
				</h1>
				<p
					class="font-normal px-5 md:p-0 text-lg md:text-xl text-black text-muted dynadark:text-muted"
				>
					{m["upload.subtitle"]()}
				</p>
			</div>
			<div class="flex-grow w-full h-72">
				<Uploader class="w-full h-full" />
			</div>
		</div>
	</div>

	<hr />

	<div class="mt-10 md:mt-16">
		<h2 class="text-center text-4xl font-bold mb-2">{m["upload.cards.title"]()}</h2>
		<p class="text-center text-lg text-muted mb-10 max-w-2xl mx-auto">
			{m["upload.subtitle"]()} <!-- Using subtitle to provide more context about supported formats -->
		</p>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
			{#if browser}
				{#each Object.entries(worker) as [key, s], i}
					{@const Icon = s.icon}
					<div class="file-category-card group w-full flex flex-col gap-4 transition-all duration-300 hover:scale-[1.02]">
						<div class="file-category-card-header flex flex-col items-center">
							<div
								class={clsx("icon-container flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110", {
									"bg-accent-blue": key === "Images",
									"bg-accent-purple": key === "Audio",
									"bg-accent-green": key === "Documents",
									"bg-accent-red": key === "Video",
								})}
							>
								<Icon size="28" />
							</div>
							<h3 class="text-xl font-semibold">{s.title}</h3>
						</div>

						<div
							class="file-category-card-content flex-grow relative pt-2"
						>
							<OverlayScrollbarsComponent
								options={{
									scrollbars: {
										autoHide: "move",
										autoHideDelay: 1500,
									},
								}}
							>
								<div
									class="flex flex-col gap-4 h-[12.25rem] relative"
									bind:this={scrollContainers[i]}
								>
									<div class="flex flex-col items-center">
										{#if key === "Video"}
											<p
												class="flex items-center justify-center gap-2 mb-2"
											>
												<Check size="18" class="text-success" />
												<Tooltip
													text={m[
														"upload.tooltip.video_server_processing"
													]()}
												>
													<span class="text-sm">
														{m[
															"upload.cards.video_server_processing"
														]()}
														<span
															class="text-red-500 -ml-0.5"
															>*</span
														>
													</span>
												</Tooltip>
											</p>
										{:else}
											<p
												class="flex items-center justify-center gap-2 mb-2"
											>
												<Check size="18" class="text-success" />
												<span class="text-sm">
													{m[
														"upload.cards.local_supported"
													]()}
												</span>
											</p>
										{/if}
										
										<div class="status-container mb-3 w-full">
											<p class="text-sm">
												{@html sanitize(m["upload.cards.status.text"]({
													status: getStatusText(s.status),
												}))}
											</p>
										</div>
										
										<div class="flex flex-col items-center w-full">
											<h4 class="font-medium text-sm mb-2">
												{m["upload.cards.supported_formats"]()}
											</h4>
											<div
												class="format-list-container w-full px-2"
											>
												{#if s.formats && s.formats !== "none"}
													{@const formatList = s.formats.split(", ").filter(f => f.trim())}
													{#each formatList as format, index}
														{@const isPartial =
															format.endsWith("*")}
														{@const formatName = isPartial
															? format.slice(0, -1)
															: format}
														<span
															class="format-tag inline-block px-2 py-1 my-1 text-xs rounded-md bg-panel-alt text-muted mr-1 mb-1 transition-colors duration-200 hover:bg-accent-blue hover:text-white hover:border-transparent"
														>
															{#if isPartial}
																<Tooltip
																	text={getTooltip(
																		formatName,
																	)}
																>
																	{formatName}<span
																		class="text-red-500"
																		>*</span
																	>
																</Tooltip>
															{:else}
																{formatName}
															{/if}
														</span>
													{/each}
												{:else}
													<span class="text-sm font-normal text-muted">
														{s.formats || "none"}
													</span>
												{/if}
											</div>
										</div>
									</div>
								</div>
							</OverlayScrollbarsComponent>
							<!-- blur at bottom if scrollable - positioned relative to the card container -->
							{#if showBlur[i]}
								<div
									class="absolute left-0 bottom-0 w-full h-10 pointer-events-none"
									style={`background: linear-gradient(to top, var(--bg-panel), transparent 100%);`}
								></div>
							{/if}
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	.file-category-card {
		@apply bg-panel rounded-2xl p-6 shadow-panel relative border border-separator transition-all duration-300;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
	}
	
	.file-category-card:hover {
		@apply shadow-panel border-separator;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
	}

	.file-category-card p {
		@apply font-normal text-center text-sm;
	}

	.file-category-card-header {
		@apply flex items-center justify-center gap-3 text-xl;
	}

	.file-category-card-content {
		@apply flex flex-col text-center justify-between;
	}

	.icon-container {
		@apply p-4 rounded-full text-on-accent w-14 h-14 flex items-center justify-center shadow-md;
	}
	
	.format-tag {
		@apply cursor-default;
	}
	
	.status-container {
		@apply px-3 py-2 rounded-lg bg-panel-alt;
	}
	
	.format-list-container {
		max-height: calc(12.25rem - 120px);
		overflow-y: auto;
		padding-right: 4px;
	}
	
	.format-list-container::-webkit-scrollbar {
		width: 14px;
	}
	
	.format-list-container::-webkit-scrollbar-track {
		background: var(--bg-panel);
		border-radius: 10px;
	}
	
	.format-list-container::-webkit-scrollbar-thumb {
		@apply bg-button rounded-full;
		border: 6px solid var(--bg-panel);
		min-height: 60px; /* 确保滚动条最小高度，便于点击 */
	}
</style>
