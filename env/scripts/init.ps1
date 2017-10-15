# Script to initialize Django development environment

$workingDirectory =  (Get-Item (Split-Path -Parent $MyInvocation.MyCommand.Path)).Parent.Parent.FullName

# Set the working directory
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

# Create Python virtual env
Write-Host "Creating virtual environment."
python -m venv ./env/py

# Activate the virtual environment
Invoke-Expression "./env/py/Scripts/Activate.ps1"

# Install requirements
Write-Host "Installing requirements."
pip install -r ./config/dev/requirements.pip

# Create directories for Django website
New-Item ./site -Type directory
New-Item ./assets -Type directory
New-Item ./assets/media -Type directory
New-Item ./assets/static -Type directory

# Start a Django project
Write-Host "Initializing Django."
django-admin startproject $project ./site

# Move into the env folder
Set-Location ./env

# Run docker-compose
docker-compose up -d

# Move back up into the root
Set-Location $workingDirectory

# See if the user wants Vue/Webpack
Write-Host "Would you like to set up Vue and Webpack?"
$response = Read-Host(" ( y / n ) ")
Switch($response)
{
    Y {
        # Initialize Webpack and Vue
        vue init webpack-simple .
    }
    N {
        Write-Host "Skipping..."
    }
    Default {
        Write-Host "Skipping..."
    }
}

# Activate app server
Write-Host "Your project is now configured. Starting up the dev server..."
python ./site/manage.py runserver