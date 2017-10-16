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

# Add IP address environment variable (necessary for Docker containers to contact host machine)
$address =  (Get-NetAdapter Wi-Fi | Get-NetIPAddress -AddressFamily IPv4 | Select IPAddress).IPAddress
# Try Ethernet network if Wi-Fi didn't work
if (-Not $address) {
    $address = (Get-NetAdapter Ethernet | Get-NetIPAddress -AddressFamily IPv4 | Select IPAddress).IPAddress
}
Write-Host "The following IP address was automatically detected: $address."
Add-Content ./env/.env "`nADDRESS=$address"

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

# Add settings for media and static files
Add-Content ./site/$project/settings.py "`nMEDIA_ROOT = "
Add-Content ./site/$project/settings.py "`nSTATIC_ROOT = "
Add-Content ./site/$project/settings.py "`nMEDIA_URL = '/media/'"
Add-Content ./site/$project/settings.py "`nSTATIC_URL = '/static/'"

# Move into the env folder
Set-Location ./env

# Run docker-compose
docker-compose up -d

# Move back up into the root
Set-Location $workingDirectory

# See if the user wants Vue/Webpack
Write-Host "Would you like to set up Vue and Webpack?"
$installVue = Read-Host(" ( y / n ) ")
Switch($installVue)
{
    Y {
        # Make sure Vue-Cli is installed
        $vueCLI = npm list --global | sls vue-cli
        if (-Not $vueCLI) {
            Write-Host "Vue-cli is not installed. Install now?"
            $installCli = Read-Host(" ( y / n ) ")
            Switch ($installCli)
            {
                Y{
                    npm install --global vue-cli
                    # Initialize Webpack and Vue
                    vue init webpack-simple .
                }
                N{
                    Write-Host "Skipping Vue and Webpack setup..."
                }
            }
        }
        else {
            # Initialize Webpack and Vue
            vue init webpack-simple .
        }
    }
    N {
        Write-Host "Skipping..."
    }
    Default {
        Write-Host "Skipping..."
    }
}

# Activate app server
Write-Host "Your project is now configured. Starting up the WSGI server..."
Set-Location ./site
Invoke-Expression "waitress-serve --listen=0.0.0.0:8080 $project.wsgi:application"