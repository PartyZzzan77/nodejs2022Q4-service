# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.


**The application was developed on the macOS and Node v18.12.0**

⚠️ Please rename the **evn.exapmle** file

⚠️ In case you are having trouble assembling the Docker container, try clearing the cache

```md
docker builder prune
```
**To start up application, do the following**
```md
git clone https://github.com/PartyZzzan77/nodejs2022Q4-service.git
```
```md
cd nodejs2022Q4-service
```
```md
git checkout auth
```
```md
rename the **evn.exapmle** file
```
```md
npm i
```
```md
npm run docker:build
```
```md
npm run docker:test-auth
```

⚠️ You can also run the tests simply from the console outside the docker
```md
npm run test:auth -- --runInBand
```
### ⚠️ To connect to the database via the graphical interface, use the following parameters

<img width="698" alt="Screenshot 2023-02-12 at 14 09 47" src="https://user-images.githubusercontent.com/88058465/218307950-a4319a6c-3bdb-4650-b7d7-d80523b23243.png">

### API testing is available at
```md
http://localhost:4000/doc/
```
⚠️ For easy checking, the POSTMAN collection is in the root of the project

### The following commands are provided for migrations:
db:create
db:run
db:revert

Example of usage
```md
npm install
```
```md
npm run build
```

```md
npm run db:create migrations/newMigration
```

Then you can roll the migration with the command

```md
npm run db:run
```
To check for image vulnerabilities, use the command (will take some time)

```md
npm run docker:scan
```
