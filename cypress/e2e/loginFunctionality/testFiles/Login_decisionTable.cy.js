/// <reference types="cypress" />
const lP = require('../pageObjects/loginPage')

import {
    decideServerName,
    decideServerURL
} from "../helpers"

// import loginPage from '../pageObjects/loginPage';

describe('Login Functionality - Decision Table', () => {

    // const lP = new loginPage(), 
    const serverURL = decideServerURL(decideServerName())

    // Before hook will be executed once before executing any Test Case
    before(() => {
        cy.intercept(`https://${serverURL}.health.net/login`).as('loginPage')
        lP.visitLoginPage(serverURL)
        cy.wait('@loginPage')
    })

    it('Incorrect username Incorrect password', () => {
        // To use credentials from fixtureFile
        // Incorrect username Incorrect password
        cy.fixture('credentials').then((pmxTestCredentials) => {
            lP.fillUsername(pmxTestCredentials.inCorrectName)
            lP.fillPassword(pmxTestCredentials.inCorrectPassword)
            lP.clickSignInButton()
        })
        // Assertions to Verify login action is Successful or not
        lP.verifyInvalidCredentialsErrorMessage()
    })

    it('Correct username Incorrect password', () => {
        // Correct username Incorrect password
        cy.fixture('credentials').then((pmxTestCredentials) => {
            lP.fillUsername(pmxTestCredentials.correctName)
            lP.fillPassword(pmxTestCredentials.inCorrectPassword)
            lP.clickSignInButton()
        })
        // Assertions to Verify login action is Successful or not
        lP.verifyInvalidCredentialsErrorMessage()
    })

    it('Incorrect username Correct password', () => {
        // Incorrect username Correct password
        cy.fixture('credentials').then((pmxTestCredentials) => {
            lP.fillUsername(pmxTestCredentials.inCorrectName)
            lP.fillPassword(pmxTestCredentials.correctPassword)
            lP.clickSignInButton()
        })
        // Assertions to Verify login action is Successful or not
        lP.verifyInvalidCredentialsErrorMessage()
    })

    it('Correct username Correct password', () => {
        // Correct username Correct password
        cy.fixture('credentials').then((pmxTestCredentials) => {
            lP.fillUsername(pmxTestCredentials.correctName)
            lP.fillPassword(pmxTestCredentials.correctPassword)
            // Click on Sign In Button
            lP.clickSignInButton()
        })
        // Assertions to Verify login action is Successful or not
        lP.verifySuccessfulLogin(serverURL)
    })
})
