# IMPORTANT: Only run the first time you're setting up your project!
# I mean, you could run it more times... but it would be pointless.

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

# Set the working directory
Set-Location ../../

# Create Python virtual env
python -m venv env

# Activate the virtual environment
./env/bin/Activate.ps1

# Install requirements
pip install -r env/requirements.pip

# Create directories for Django website
New-Item ./site -Type directory
New-Item ./assets -Type directory
New-Item ./assets/media -Type directory
New-Item ./assets/static -Type directory

# Start a Django project
django-admin startproject $project ./site

# Run docker-compose
docker-compose up -d -f ./docker/docker-compose.yml

# Activate Gunicorn
gunicorn --bind 127.0.0.1:8080 $project.wsgi

# Hooray!