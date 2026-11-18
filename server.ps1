$port = 8080
$folder = "C:\Users\Konat\.gemini\antigravity\scratch\couture-saas-ci"

$listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Any, $port)
try {
    $listener.Start()
    Write-Output "SERVEUR_ACTIF_PORT_$port"
} catch {
    Write-Output "ERREUR_DEMARRAGE: $($_.Exception.Message)"
    exit 1
}

while ($true) {
    try {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $writer = New-Object System.IO.StreamWriter($stream)
        $writer.AutoFlush = $true

        $requestLine = $reader.ReadLine()
        if ($requestLine) {
            $parts = $requestLine.Split(" ")
            $path = if ($parts.Length -ge 2) { $parts[1] } else { "/" }
            if ($path -eq "/" -or $path -eq "") { $path = "/index.html" }
            $cleanPath = $path.TrimStart("/").Split("?")[0]
            $filePath = Join-Path $folder $cleanPath

            if (Test-Path $filePath -PathType Leaf) {
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                $contentType = "text/html; charset=utf-8"
                if ($ext -eq ".css") { $contentType = "text/css" }
                elseif ($ext -eq ".js") { $contentType = "application/javascript" }
                elseif ($ext -eq ".json") { $contentType = "application/json" }
                elseif ($ext -eq ".png") { $contentType = "image/png" }

                $header = "HTTP/1.1 200 OK`r`nContent-Type: $contentType`r`nContent-Length: $($bytes.Length)`r`nAccess-Control-Allow-Origin: *`r`nConnection: close`r`n`r`n"
                $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
                $stream.Write($headerBytes, 0, $headerBytes.Length)
                $stream.Write($bytes, 0, $bytes.Length)
            } else {
                $notFound = "HTTP/1.1 404 Not Found`r`nContent-Length: 9`r`nConnection: close`r`n`r`nNot Found"
                $writer.Write($notFound)
            }
        }
        $client.Close()
    } catch {
        # Continuer d'écouter
    }
}
