<script>
	// Toolkitlife Logo - Modern file conversion design
	let { class: className = "", width = "100%", height = "100%" } = $props();
</script>

<svg
	width={width}
	height={height}
	viewBox="0 0 280 60"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class={className}
>
	<defs>
		<linearGradient id="toolkitlifeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
			<stop offset="0%" stop-color="#2563EB" />
			<stop offset="50%" stop-color="#7C3AED" />
			<stop offset="100%" stop-color="#EC4899" />
		</linearGradient>
	</defs>
	
	<!-- Modern conversion icon -->
	<g>
		<!-- Source file -->
		<rect x="6" y="12" width="20" height="30" rx="4" fill="url(#toolkitlifeGradient)"/>
		<rect x="10" y="18" width="12" height="2" rx="1" fill="white" opacity="0.95"/>
		<rect x="10" y="24" width="10" height="2" rx="1" fill="white" opacity="0.95"/>
		<rect x="10" y="30" width="8" height="2" rx="1" fill="white" opacity="0.95"/>
		
		<!-- Conversion arrow -->
		<path d="M30 27 L42 27 M38 22 L42 27 L38 32" stroke="url(#toolkitlifeGradient)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
		<circle cx="36" cy="27" r="2" fill="url(#toolkitlifeGradient)" opacity="0.5"/>
		
		<!-- Target file (rotated) -->
		<rect x="46" y="16" width="20" height="26" rx="4" fill="url(#toolkitlifeGradient)" opacity="0.85" transform="rotate(-8 56 29)"/>
		<circle cx="52" cy="24" r="2" fill="white" opacity="0.85" transform="rotate(-8 52 24)"/>
		<circle cx="60" cy="26" r="2" fill="white" opacity="0.85" transform="rotate(-8 60 26)"/>
		<circle cx="52" cy="32" r="2" fill="white" opacity="0.85" transform="rotate(-8 52 32)"/>
	</g>
	
	<!-- "Toolkitlife" text - Clean sans-serif -->
	<g fill="url(#toolkitlifeGradient)">
		<!-- C -->
		<path d="M78 16 C 78 16, 78 16, 78 20 L 78 38 C 78 42, 78 42, 82 42 L 90 42 C 94 42, 94 42, 94 38 L 94 32 L 88 32 L 88 36 L 82 36 L 82 22 L 88 22 L 88 26 L 94 26 L 94 20 C 94 16, 94 16, 90 16 L 82 16 C 78 16, 78 16, 78 20 Z"/>
		
		<!-- o -->
		<ellipse cx="103" cy="29" rx="7" ry="10" fill="none" stroke="url(#toolkitlifeGradient)" stroke-width="3"/>
		<ellipse cx="103" cy="29" rx="4" ry="6" fill="url(#toolkitlifeGradient)"/>
		
		<!-- n -->
		<rect x="115" y="20" width="3" height="18"/>
		<path d="M 115 22 L 119 22 C 123 22, 125 24, 125 28 L 125 38 L 131 38 L 131 28 C 131 22, 127 20, 123 20 L 119 20 L 119 22 Z"/>
		
		<!-- v -->
		<path d="M 137 20 L 137 38 L 142 38 L 146 26 L 150 38 L 155 38 L 155 20 L 150 20 L 148 30 L 144 20 L 137 20 Z"/>
		
		<!-- e -->
		<rect x="161" y="24" width="3" height="14"/>
		<rect x="161" y="20" width="12" height="3" rx="1.5"/>
		<rect x="161" y="28" width="9" height="3" rx="1.5"/>
		<rect x="161" y="36" width="12" height="3" rx="1.5"/>
		
		<!-- r -->
		<rect x="179" y="20" width="3" height="18"/>
		<rect x="179" y="20" width="9" height="3" rx="1.5"/>
		<rect x="186" y="24" width="3" height="8"/>
		
		<!-- t -->
		<rect x="195" y="18" width="10" height="3" rx="1.5"/>
		<rect x="198" y="18" width="3" height="20"/>
		
		<!-- O -->
		<ellipse cx="215" cy="29" rx="8" ry="11" fill="none" stroke="url(#toolkitlifeGradient)" stroke-width="3.5"/>
		<ellipse cx="215" cy="29" rx="5" ry="7" fill="url(#toolkitlifeGradient)"/>
		
		<!-- n -->
		<rect x="229" y="20" width="3" height="18"/>
		<path d="M 229 22 L 233 22 C 237 22, 239 24, 239 28 L 239 38 L 245 38 L 245 28 C 245 22, 241 20, 237 20 L 233 20 L 233 22 Z"/>
		
		<!-- l -->
		<rect x="251" y="20" width="3" height="18"/>
		
		<!-- i -->
		<rect x="260" y="20" width="3" height="18"/>
		<circle cx="261.5" cy="16" r="1.5" fill="url(#toolkitlifeGradient)"/>
		
		<!-- n -->
		<rect x="269" y="20" width="3" height="18"/>
		<path d="M 269 22 L 273 22 C 277 22, 279 24, 279 28 L 279 38 L 285 38 L 285 28 C 285 22, 281 20, 277 20 L 273 20 L 273 22 Z"/>
		
		<!-- e -->
		<rect x="291" y="24" width="3" height="14"/>
		<rect x="291" y="20" width="12" height="3" rx="1.5"/>
		<rect x="291" y="28" width="9" height="3" rx="1.5"/>
		<rect x="291" y="36" width="12" height="3" rx="1.5"/>
	</g>
</svg>
