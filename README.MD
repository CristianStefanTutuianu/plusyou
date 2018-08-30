## How to run the project

***Run the project using: 'npm start'

To change running parameters used by nodemon you need to amend
the section 'scripts' in package.json

***Test the project using: 'npm test'

## Project structure

Source: ./src - contains packages (e.g. pu-clients).

-> Imports outside a package (e.g. package A imports a class from package B)
should be done by calling the relative path only: e.g.: import X from B

-> Each package should contain a root file called index used to export publicly
available classes, interfaces & types

-> Each package should test its code inside a sub-package folder called '__tests__'

## TODO
- port ok cupid rest of methods
- https://github.com/typestack/class-transformer - possibly something we need
