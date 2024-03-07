class loginPage {

    elements = { 
        usernameInput : () => cy.get('input[name="username"]'),      
        passwordInput : () => cy.get('input[name="password"]'),    
        loginBtn : () => cy.get('input[type="submit"][value="Sign In"]'),
        errorTxt : () => cy.get('div#alerts div'),
        successTxt : () => cy.url(),
        logoutBtn : ()  =>  cy.get('li#nav_logout p').should('exist').and('contain', 'LOG OUT')
    }

    // Alternattive way to avoid elements Object
    // fillUsername(username) {
    //     cy.get('input[name="username"]').clear()
    //     cy.get('input[name="username"]').typeSecurely(username)
    // }

    fillUsername(username)
    {
        this.elements.usernameInput().clear();
        this.elements.usernameInput().type(username);
    }

    visitLoginPage(serverURL) {
        cy.visit(`https://${serverURL}.health.net/login`)
    }

    fillPassword(password) {
        this.elements.passwordInput().clear()
        this.elements.passwordInput().typeSecurely(password)
    }

    clickSignInButton() {
        this.elements.loginBtn().click()
    }

    clickSignOutButton() {
        this.elements.logoutBtn().click()
    }

    verifyInvalidCredentialsErrorMessage() {
        this.elements.errorTxt()
            .should('exist')
            .and('contain', 'Invalid username or password')
    }

    verifySuccessfulLogin(serverURL) {
        this.elements.successTxt()
            .should('eq', `https://${serverURL}.health.net/homebase/`)
            .and('contain', `https://${serverURL}.health.net`)
            .and('include', 'homebase')
    }

    verifySuccessfulLogout(serverURL) {
        this.elements.successTxt()
            .should('eq', `https://${serverURL}.health.net/login/`)
            .and('contain', `https://${serverURL}.health.net`)
            .and('include', 'login')
    }
}

module.exports = new loginPage()
// export default loginPage
// If we export with 'export ddefault loginPage' like given above then we import with 'import loginPage from 
// '../pageObjects/loginPage' & create object with 'const lP = new loginPage()'

// While in current Approach we export class with 'module.exports = new loginPage()' then we import and create
// object simultaneously with 'const lP = require('../pageObjects/loginPage')'