# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

⚠️ **Please rename the evn file**
⚠️ For easy checking, the **POSTMAN** collection is in the root of the project

**To start up, do the following**
```md
git clone https://github.com/PartyZzzan77/nodejs2022Q4-service.git
```
```md
cd nodejs2022Q4-service
```
```md
git checkout dev
```
```md
npm i
```
```md
npm run start
```

After running the application on the port (4000 by default) you can open a subcollection at the root of the project and use the endpoints or use the documentation at:
```md
http://localhost:4000/doc
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```


### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
