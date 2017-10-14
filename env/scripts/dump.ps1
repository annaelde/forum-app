# Dumps the Postgresql Database
# Get the environmental variable from the Docker .env file
Get-Content ../.env | Foreach-Object{
    If (-NOT ($_ -eq "")){
        $var = $_.Split('=')
        New-Variable -Name $var[0] -Value $var[1]
        If ($var[0] -eq "COMPOSE_PROJECT_NAME"){
            $project = $var[1]
        }
        ElseIf ($var[0] -eq "DATABASE_USER"){
            $db_user = $var[1]
        }
    }
}

# Run the pg_dump command
docker exec -d ($project)_postgres bash -c "pg_dump --username=$db_user --format=c --file=/db/dump.bak $project"