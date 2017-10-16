# Django-Kit
## About
This is a kit I made to quickly set up Django development environments in Windows.

The set-up script creates a Python virtual environment and installs a list of packages. It configures two Docker containers for Postgresql and Nginx. 
It prompts the user to install Vue.js and Webpack through vue-cli. Finally, it runs an application server using Waitress.

## Requirements
- Windows PowerShell
- Docker for Windows
- Python 3.3+
- NPM (Optional for Vue.js + Webpack)

## Set-up

1. In the env folder, open .env and set the variables to the values you want. A short name (~3 letters) is recommended for ````$COMPOSE_PROJECT_NAME````. It will be used to name your Django project and prefix your Docker containers.
2. Run init.ps1, located in ./env/scripts.
3. In ./site/$COMPOSE_PROJECT_NAME/settings.py, update the database configuration. Below is an example using the default environmental values:
````
DATABASES = {
    'default': {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "default",
        "USER": "default",
        "PASSWORD": "default",
        "HOST": "localhost"
    }
}
````
4. Run the following command while in the ./site folder to ensure the database connection is working:
````
python manage.py makemigrations
````
5. You can access your development website on localhost:8000. Happy coding!

## FAQ
> I'm getting a server error.
Because the application server doesn't live inside a Docker container, we need your host machine's IP address to connect Nginx to the application server. This IP address is automatically chosen during initialization from either your Wi-Fi or Ethernet adapter, so it may be incorrect. Please go into the .env file and manually set the IP address of your host machine and then run the command "docker-compose up -d" again to update the Nginx container.

## Scripts
Besides init.ps1, this kit includes three other useful scripts:

- dump.ps1: dumps the database into ./env/db/dump.bak
- start.ps1: starts all the project containers and the application server
- stop.ps1: stops all the project containers
