# Blood Data Management System | Express

<a href="https://app.circleci.com/pipelines/github/DRJ31/BloodDataExpress"><img alt="CircleCI" src="https://img.shields.io/circleci/build/github/DRJ31/BloodDataExpress?logo=circleci"></a>
<a href="https://github.com/DRJ31/BloodDataExpress"><img alt="GitHub" src="https://img.shields.io/github/license/DRJ31/BloodDataExpress"></a>
<a href="https://www.typescriptlang.org"><img alt="GitHub top language" src="https://img.shields.io/github/languages/top/DRJ31/BloodDataExpress?label=TypeScript"></a>


The backend of [DRJ31/BloodDataReact](https://github.com/DRJ31/BloodDataReact).The main introduction of the project can be found in the README of that project.

## Installation
The project use **MySQL** as database, and **yarn** as package management tool. Therefore, you should ensure that the 2 packages are installed. 
### Install Dependencies
```bash
yarn install
```
### Create encrypted files
```typescript
/* Path: src/config.ts */
export const SESS_SECRET: string = "secret";

export const DB_CONFIG = {
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'database'
}
```
Then, you can develop the project with `yarn start` and build the proejct with `yarn build`

## Database Structure
- user
    - id: int
    - username: TEXT
    - password: TEXT 
    - salt: TEXT (Salt for password encryption)
- blood
    - id: int
    - uid: int
    - leukocyte
    - hemoglobin: double
    - platelets: double
    - monocyte: double
    - monocyteP: double
    - neutrophil: double
    - reticulocyte: TEXT
    - remark: TEXT
