To create a new Django project, image and associated containers...

1) Open up .env and set your environmental variables
    a) make your compose project name something short because it will be prefixed everywhere
2) Run init-django.ps1 from the scripts folder
3) Go into your newly created django folder 
4) Open settings.py in your project folder
5) Add "web" to your hosts array at the top
6) Configure your database settings using your environmental variables
    a) Make sure your engine is set as 'django.db.backends.postgresql_psycopg2'
    b) Host will be postgres and port doesn't need to be set--it's the default one

Please note that there are other helpful scripts in the scripts folder, including...

1) start.ps1 - starts your project containers
2) stop.ps1 - stops your running project containers
3) bash.ps1 - enter your Django container to use bash
4) total-annihilation.ps1 - destroy everything Docker-related for this project (useful if you want to start over for some reason)