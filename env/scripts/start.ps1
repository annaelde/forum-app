# Start all project containers

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

../bin/Activate.ps1
docker container start $project"_postgres"
docker container start $project"_nginx"
gunicorn --bind 127.0.0.1:8080 $project.wsgi