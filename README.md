**Cypress Login Functionality Test Suite**
This repository contains end-to-end tests for the login functionality of a web application using Cypress. The tests are organized based on a decision table approach, covering various combinations of correct and incorrect username/password scenarios.

**Prerequisites**
Before running the tests, ensure you have the following prerequisites installed:

Node.js
npm (Node Package Manager)
Setup
Clone this repository to your local machine:

git clone <repository-url>
Navigate to the project directory:

cd <project-directory>
Install dependencies:

npm install
Running Tests
To run the tests using Cypress, execute the following command:

npx cypress run
This command will run all tests headlessly and generate Mocha-style output in the terminal.

Viewing Tests in Cypress Test Runner
If you prefer to interactively run and debug tests using the Cypress Test Runner, execute the following command:

npx cypress open
This will open the Cypress Test Runner, allowing you to select and run individual test files.

Custom Commands
Sensitive data, such as passwords, should not be logged in the Cypress Test Runner or any generated reports. To address this, a custom command cy.logSecure has been implemented to log sensitive data as asterisks (**) instead of the actual value. Usage example:

cy.logSecure('SensitivePassword123')
Fixture Files
Test data, including usernames and passwords, is stored in fixture files. These files are located in the cypress/fixtures directory. Before running tests, ensure the fixture files contain the necessary data for your test scenarios.

Mocha HTML Report
A Mocha HTML report plugin is configured to generate HTML reports after test execution. Reports are saved in the cypress/reports directory. To view the HTML report, open the generated .html file in a web browser.

Configuration
Additional Cypress configuration options, such as setting the base URL and configuring the Mocha HTML report plugin, can be modified in the cypress.config.json file.
