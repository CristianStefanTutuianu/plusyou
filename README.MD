## How to run the project

***Run the project using: 
**'npm start [ukcupidusername] [okcupidpassword]'

***Test the project using: 'npm test'

## Project structure

Source: ./src - contains packages (e.g. pu-clients).

Imports outside a package (e.g. package A imports a class from package B)
should be done by calling the relative path only: e.g.: import X from B

Tests should be writted under '__tests__' folder inside each sub-package.
