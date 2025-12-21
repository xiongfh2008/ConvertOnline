# Batch replace VERT with Toolkitlife in language files
# Only replaces standalone VERT word using word boundaries

$files = @('messages\de.json', 'messages\es.json', 'messages\it.json', 'messages\ko.json', 
           'messages\el.json', 'messages\hr.json', 'messages\id.json', 'messages\ja.json')

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw -Encoding UTF8
        $originalContent = $content
        
        # Replace standalone VERT with Toolkitlife using word boundaries
        $content = $content -replace '\bVERT\b', 'Toolkitlife'
        
        # Replace VERT_%name% pattern
        $content = $content -replace 'VERT_%name%', 'Toolkitlife_%name%'
        
        if ($content -ne $originalContent) {
            Set-Content -Path $file -Value $content -Encoding UTF8 -NoNewline
            Write-Host "Updated: $file"
        }
    }
}

Write-Host "Batch replacement completed!"


