# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

**The application was developed on the macOS and Node v18.12.0**

⚠️ Please rename the **evn.exapmle** file

⚠️ At the moment there is a **floating bug** on common tests, a single test file is possible. Planned **fix**. Single tests pass **normally**.

⚠️ To check for vulnerabilities, you can use [anchore/grype](https://hub.docker.com/r/anchore/grype) **procedure:**

```md
docker pull anchore/grype
```
```md
docker run -it --rm anchore/grype <image name>
```

**To start up application, do the following**
```md
git clone https://github.com/PartyZzzan77/nodejs2022Q4-service.git
```
```md
cd nodejs2022Q4-service
```
```md
git checkout db
```
```md
rename the **evn.exapmle** file
```
```md
docker-compose up
```

To work with the database, the **PgAdmin** shell is provided

_How to work with it:_
1. After launching the container go to -> start password **root**
   ` http://localhost:8001`
2. Select Servers -> Register -> Server -> Connections
   <img width="1423" alt="Screenshot 2023-02-09 at 14 48 49" src="https://user-images.githubusercontent.com/88058465/217807173-9c370d78-649c-47c9-88ac-5ba48624bb39.png">

<img width="1440" alt="Screenshot 2023-02-09 at 14 50 22" src="https://user-images.githubusercontent.com/88058465/217807222-3fa23d3d-8452-4353-ad21-e2127447ab62.png">

5. Enter : **postgres** and **root** password
6. On the General tab also enter: **postgres**
7. After a successful connection, the database to use **music**
   <img width="1437" alt="Screenshot 2023-02-09 at 14 51 24" src="https://user-images.githubusercontent.com/88058465/217807349-a592ff16-c998-4d77-a84f-148d7901ae2f.png">
   <img width="1438" alt="Screenshot 2023-02-09 at 14 51 46" src="https://user-images.githubusercontent.com/88058465/217807399-5293c855-ff2b-41ef-9248-13cc7c9d17ad.png">
   <img width="1440" alt="Screenshot 2023-02-09 at 14 52 10" src="https://user-images.githubusercontent.com/88058465/217807432-c1e6939c-4217-460c-951e-a9fe692f6ee9.png">

### API testing is available at
`http://localhost:4000/doc/` \

⚠️ For easy checking, the POSTMAN collection is in the root of the project

### The following commands are provided for migrations:
db:create\
db:run\
db:revert

Example of usage

`npm run db:create newMigration`

Then you can roll the migration with the command

`npm run db:run`

To check for image vulnerabilities you can use the command

`npm run scan:app`