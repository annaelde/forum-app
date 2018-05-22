import json
from .base import *

secretFile = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dev.json')

with open(secretFile) as f:
    secrets = json.loads(f.read())

SECRET_KEY = get_secret('SECRET_KEY', secrets)
DEBUG = True
DATABASES = {
    'default': get_secret('DATABASE_CONFIG', secrets)
}