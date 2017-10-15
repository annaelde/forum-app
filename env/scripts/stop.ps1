# Stop all project containers

# Set the working directory
$workingDirectory =  (Get-Item (Split-Path -Parent $MyInvocation.MyCommand.Path)).Parent.FullName
Set-Location $workingDirectory

# Get the environmental variable from the Docker .env file
Get-Content .env | Foreach-Object{
    If (-NOT ($_ -eq "")){
        $var = $_.Split('=')
        New-Variable -Name $var[0] -Value $var[1]
        If ($var[0] -eq "COMPOSE_PROJECT_NAME"){
            $project = $var[1]
        }
    }
}

# Stop containers
docker container stop $project"_nginx"
docker container stop $project"_postgres"