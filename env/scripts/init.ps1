# Script to initialize Django development environment

# Set the working directory
Set-Location (Get-Item (Split-Path -Parent $MyInvocation.MyCommand.Path)).Parent.Parent.FullName

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
python -m venv ./env/py

# Activate the virtual environment
./env/py/bin/Activate.ps1

# Install requirements
pip install -r ./config/dev/requirements.pip

# Create directories for Django website
New-Item ./site -Type directory
New-Item ./assets -Type directory
New-Item ./assets/media -Type directory
New-Item ./assets/static -Type directory

# Start a Django project
django-admin startproject $project ./site

# Run docker-compose
docker-compose up -d -f ./env/docker-compose.yml

# Activate Gunicorn
gunicorn --bind 127.0.0.1:8080 $project.wsgi

# Hooray!