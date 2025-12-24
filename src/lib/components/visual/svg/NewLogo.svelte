<script>
	// New Modern ConvertOnline Logo - Clean and minimalist design
	let { class: className = "", width = "100%", height = "100%" } = $props();
</script>

<svg
	width={width}
	height={height}
	viewBox="0 0 200 60"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class={className}
>
	<!-- Modern gradient background -->
	<defs>
		<linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
			<stop offset="0%" stop-color="#8A2BE2" />
			<stop offset="100%" stop-color="#4B0082" />
		</linearGradient>
	</defs>
	
	<!-- Modern icon: File conversion with arrow -->
	<g>
		<!-- Source file with gradient -->
		<rect x="8" y="14" width="20" height="28" rx="4" fill="url(#logoGradient)" />
		<rect x="12" y="20" width="12" height="2" rx="1" fill="white" opacity="0.9"/>
		<rect x="12" y="26" width="10" height="2" rx="1" fill="white" opacity="0.9"/>
		<rect x="12" y="32" width="8" height="2" rx="1" fill="white" opacity="0.9"/>
		
		<!-- Conversion arrow with modern style -->
		<path d="M32 28 L42 28 M39 24 L42 28 L39 32" stroke="url(#logoGradient)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
		
		<!-- Target file (rotated) with gradient -->
		<rect x="46" y="18" width="20" height="24" rx="4" fill="url(#logoGradient)" opacity="0.8" transform="rotate(-10 56 30)"/>
		<circle cx="50" cy="26" r="2" fill="white" opacity="0.8" transform="rotate(-10 50 26)"/>
		<circle cx="58" cy="28" r="2" fill="white" opacity="0.8" transform="rotate(-10 58 28)"/>
		<circle cx="50" cy="34" r="2" fill="white" opacity="0.8" transform="rotate(-10 50 34)"/>
	</g>
	
	<!-- "ConvertOnline" text - Modern sans-serif style with gradient -->
	<g fill="url(#logoGradient)">
		<!-- V -->
		<path d="M85 16 L85 42 L90 42 L94 26 L98 42 L103 42 L103 16 L98 16 L94 30 L90 16 L85 16 Z"/>
		<!-- E -->
		<rect x="112" y="16" width="3" height="26" rx="1.5"/>
		<rect x="112" y="16" width="14" height="3" rx="1.5"/>
		<rect x="112" y="26" width="11" height="3" rx="1.5"/>
		<rect x="112" y="39" width="14" height="3" rx="1.5"/>
		<!-- R -->
		<rect x="132" y="16" width="3" height="26" rx="1.5"/>
		<rect x="132" y="16" width="11" height="3" rx="1.5"/>
		<rect x="140" y="19" width="3" height="10" rx="1.5"/>
		<path d="M132 29 L144 29 L140 33 L135 37 L132 41" stroke="url(#logoGradient)" stroke-width="3" stroke-linecap="round" fill="none"/>
		<!-- T -->
		<rect x="152" y="16" width="14" height="3" rx="1.5"/>
		<rect x="157" y="16" width="3" height="26" rx="1.5"/>
	</g>
</svg>