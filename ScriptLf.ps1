Get-ChildItem -Recurse -Include *.js,*.jsx,*.json | ForEach-Object {
    (Get-Content -Raw -Path $_.FullName) -replace "`r`n", "`n" | Set-Content -NoNewline -Path $_.FullName
}
