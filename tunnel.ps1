Write-Host "TUNNEL_DEMARRAGE"
while ($true) {
    Write-Host "TUNNEL_CONNEXION_SERVEO"
    & ssh -R 80:localhost:8080 -o StrictHostKeyChecking=no -o ServerAliveInterval=15 -o ServerAliveCountMax=3 serveo.net
    Write-Host "TUNNEL_RECONNEXION_3S"
    Start-Sleep -Seconds 3
}
