# Libquality API

## Description

This project is a simple REST API that allows us to get some statistics of open-source projects on github.

## Getting Started

### Dependencies

* NodeJS LTS [Help](https://nodejs.org/en/download/)

### Installing
* Clone this project into your PC
* Run `yarn install` to install all dependencies
* You need an instance of docker postgres. Run the command above
```
docker run --name libquality_db -e POSTGRESQL_USERNAME=postgres -e POSTGRESQL_PASSWORD=password -e POSTGRESQL_DATABASE=libquality -p 5000:5432 -d bitnami/postgresql
```
* Put your own GIT_CREDENTIAL in `config/.env` file
* Run `yarn dev` to start server
* All done!

### Database Design

* As a simple project, I create only two tables. A table to store basic informations and another to store stats data.

### Architecture

* This project don't follow any DDD principles, it's have a small percentage of abstraction but based on size of project and the time to finish, my choose was a more simple architecture.
* For real projects it's a nice idea split de code based on domain(DDD). This project can be converted to DDD making some adjusts on folders and working in abstraction of services and database.

### Swagger

* You can see the routes documentation on ``http://localhost:4000/swagger``

### ScheduledTasks

* I'm using `node-cron` to get all projects stored on database and get stats daily (it's scehduled to execute 3:00am)

### SwaggerStats

* As a mandatory point, I'm using `swagger-stats` to generate info about **routes usage**. This lib has an UI built-in dashboard and can be viewed on `http://localhost:4000/swagger-stats/ui`
