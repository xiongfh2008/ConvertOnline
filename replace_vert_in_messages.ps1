# PowerShell script to replace VERT with Toolkitlife in all JSON language files
# Only replaces standalone "VERT" word, avoiding words like "VERTICAL" or "VERTEX"

$files = Get-ChildItem -Path "messages\*.json"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # Replace standalone VERT with Toolkitlife
    # Using word boundaries to avoid replacing VERTICAL, VERTEX, etc.
    $content = $content -replace '\bVERT\b', 'Toolkitlife'
    
    # Also replace VERT_%name% with Toolkitlife_%name%
    $content = $content -replace 'VERT_%name%', 'Toolkitlife_%name%'
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Updated: $($file.Name)"
    }
}

Write-Host "Done!"

