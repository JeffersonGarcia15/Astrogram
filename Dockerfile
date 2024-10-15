FROM node:16 AS build-stage

WORKDIR /react-app
COPY react-app/. .

# Pass build arguments
ARG REACT_APP_GOOGLE_OAUTH_CLIENT_ID
ENV REACT_APP_GOOGLE_OAUTH_CLIENT_ID=$REACT_APP_GOOGLE_OAUTH_CLIENT_ID

# Install and build the app
RUN npm install
RUN npm run build

FROM python:3.9
WORKDIR /var/www
COPY . .

COPY --from=build-stage /react-app/build/* app/static/

RUN pip install -r requirements.txt
RUN pip install psycopg2

EXPOSE 8000

CMD gunicorn --worker-class eventlet -w 1 app:app
