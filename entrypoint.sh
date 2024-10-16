#!/bin/bash

# Generate the config.js file with the environment variable
echo "window._env_ = { REACT_APP_GOOGLE_OAUTH_CLIENT_ID: '\"$REACT_APP_GOOGLE_OAUTH_CLIENT_ID\"' };" > app/static/config.js

# Start the application
exec gunicorn --worker-class eventlet -w 1 app:app
