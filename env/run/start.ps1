# Start all project containers

# Set the working directory
$workingDirectory =  (Get-Item (Split-Path -Parent $MyInvocation.MyCommand.Path)).Parent.Parent.FullName
Set-Location $workingDirectory

# Get the environmental variable from the Docker .env file
Get-Content ./env/.env | Foreach-Object{
    If (-NOT ($_ -eq "")){
        $var = $_.Split('=')
        New-Variable -Name $var[0] -Value $var[1]
        If ($var[0] -eq "COMPOSE_PROJECT_NAME"){
            $project = $var[1]
        }
    }
}

Invoke-Expression "./env/py/Scripts/Activate.ps1"
docker container start $project"_postgres"
docker container start $project"_nginx"

# Move Working Directory to Site
Set-Location ./site

try
{
    # Starting up dev server
    Invoke-Expression "python manage.py runserver 0.0.0.0:8080"
}
finally
{
    # Return to root directory after CTRL + Break
    Set-Location $workingDirectory
}