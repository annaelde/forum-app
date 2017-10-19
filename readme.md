# Django-Kit

> This is a work-in-progress. Use at your own risk!

## About
This is a kit I made to quickly set up a Django development environment in Windows.

The set-up script creates a Python virtual environment and installs a list of packages, including Django. It configures PostgreSQL and Nginx using Docker. It prompts the user to install Vue.js and Webpack. Finally, it runs an application server using Waitress.

## Requirements
- Windows PowerShell
- Docker for Windows
- Python 3.3+
- NPM (Optional for Vue.js + Webpack)

## Set-Up

1. In the ````./env```` folder, open ````.env```` and set the variables to the values you want. A short name (~3 letters) is recommended for ````$COMPOSE_PROJECT_NAME````, used for the Django project and prefixing the Docker containers.
2. Run ````init.ps1````, located in ````./env/scripts````. Allow the installation to fully complete, answering any prompts that appear.
3. Run the following command while in the ````./site```` folder to ensure the database connection is working:
````
python manage.py makemigrations
````
4. You can access your development website on ````localhost:8000````. Happy coding!

## FAQ

> I'm getting a server error.

Because the application server doesn't live inside a Docker container, we need your host machine's IP address to connect Nginx to the application server. This IP address is automatically chosen during initialization from either your Wi-Fi or Ethernet adapter, so it may be incorrect. Please go into the ````.env```` file and manually set the IP address of your host machine and then run the command ````docker-compose up -d```` again to update the Nginx container.

## Scripts
Besides ````init.ps1````, this kit includes three other useful scripts:

- ````dump.ps1````: dumps the database into ````./env/db/dump.bak````
- ````start.ps1````: starts all the project containers and the application server
- ````stop.ps1````: stops all the project containers
