# PowerShell script to replace ConvertOnline with Toolkitlife in all JSON language files

$files = Get-ChildItem -Path "messages\*.json"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # Replace ConvertOnline with Toolkitlife
    $content = $content -replace 'ConvertOnline', 'Toolkitlife'
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Updated: $($file.Name)"
    }
}

Write-Host "Done!"