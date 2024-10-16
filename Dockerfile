FROM node:16 AS build-stage

WORKDIR /react-app
COPY react-app/. .

# Install and build the app
RUN npm install
RUN npm run build

FROM python:3.9
WORKDIR /var/www
COPY . .

COPY --from=build-stage /react-app/build/ app/static/

RUN pip install -r requirements.txt
RUN pip install psycopg2

# Copy and set permissions for the entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8000

CMD ["/entrypoint.sh"]
