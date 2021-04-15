# Blood Data Management System | Express

The backend of [DRJ31/BloodDataReact](https://github.com/DRJ31/BloodDataReact).The main introduction of the project can be found in the README of that project.

## Installation
The project use **MySQL** as database, and **yarn** as package management tool. Therefore, you should ensure that the 2 packages are installed. Then you can install packages with 
```bash
yarn install
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
