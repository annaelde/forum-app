# Stop all project containers

# Get the environmental variable from the Docker .env file
Get-Content ../.env | Foreach-Object{
    If (-NOT ($_ -eq "")){
        $var = $_.Split('=')
        New-Variable -Name $var[0] -Value $var[1]
        If ($var[0] -eq "COMPOSE_PROJECT_NAME"){
            $project = $var[1]
        }
    }
}

docker container stop $project"_nginx"
docker container stop $project"_postgres"