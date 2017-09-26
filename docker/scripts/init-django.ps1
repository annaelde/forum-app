# IMPORTANT: Only run the first time you're setting up your project!
# I mean, you could run it more times... but it would be pointless.

$project_name = ""
$script_dir = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
$docker_dir = Split-Path $script_dir -Parent
$root_dir = Split-Path $docker_dir -Parent

echo $root_dir
# Create Python virtual env
python -m venv $root_dir
&"$root_dir\Scripts\Activate.ps1"
pip install -r $docker_dir\requirements.pip

# Get the environmental variable from the Docker .env file
Get-Content $docker_dir\.env | Foreach-Object{
    If (-NOT ($_ -eq "")){
        $var = $_.Split('=')
        New-Variable -Name $var[0] -Value $var[1]
        If ($var[0] -eq "COMPOSE_PROJECT_NAME"){
            $project_name = $var[1]
        }
    }
}

# If we were able to find the right variable...
If (-NOT ($project_name -eq "")){
    # Create our project folder
    New-Item -ItemType directory -Path $root_dir\site
    # Create our Django project
    django-admin startproject $project_name $root_dir/site/
    # Move into the Docker directory
    Set-Location -Path $docker_dir
    # Build and start our containers!
    docker-compose up -d
    # Output our project name variable to a file to enable other scripts
    $project_name | Export-CliXml $script_directory\pn.xml
}

# Hooray!