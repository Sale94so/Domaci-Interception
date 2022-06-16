import {loginPage} from '../page_objects/loginPage';
import {logoutPage} from '../page_objects/logoutPage';

describe('login POM', () => {
    let invalidEmail = 'sasa.antal94@gmail'
    let validPassword = 'Salelexasale9944'
    let validEmail = 'sasa.antal94@gmail.com'

    before('visit login page', () =>{
        cy.visit('/')
        loginPage.loginBtn.click()
    })

    it ('valid login using POM',() =>{

        cy.intercept({
            method:'POST',
            url:'https://gallery-api.vivifyideas.com/api/auth/login'       
        }).as('validLogin')


        cy.url().should('include','/login');
        loginPage.login(validEmail,validPassword);
        cy.wait('@validLogin').then(interception => {
            expect(interception.response.statusCode).to.exist
            expect(interception.response.statusCode).eq(200)
        })
        cy.url().should('not.include','/login');
        loginPage.logoutBtn.should('be.visible')
    })


    it ('valid logout using POM',() =>{
        logoutPage.logoutBtn.click()
    cy.intercept({
        method:'POST',
        url:'https://gallery-api.vivifyideas.com/api/auth/logout'       
    }).as('logout')

    cy.wait('@logout').then(interception => {
        expect(interception.response.statusCode).eq(200)
    })
   

})


xit('valid login using POM',() => {
    cy.url().should('include','/login');
    loginPage.login(invalidEmail, validPassword);
    cy.url().should('include', '/login')
    loginPage.errorMessage.should('be.visible')
    .and('have.text','Bad Credentials')
    .and('have.css','background-color','rgb(248, 215, 218)')
  })

  xit ('valid login using POM', () => {
    cy.loginViaBackend(
        Cypress.env('VALID_USER_EMAIL'),
        Cypress.env('VALID_USER_PASSWORD')
    );
    cy.visit('/create')
  })

})
