/// <reference types="Cypress" />
import { registrationPage } from '../page_objects/registrationPage';

const faker = require ('@faker-js/faker')

describe('registration POM', () => {
    const userData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        passwordWithoutNumber : faker.internet.password(20, true, /[A-Z]/),
        shortPassword: faker.internet.password(4),
        oneLetterName: faker.random.alpha({ count:1}),
        passwordWithoutLetters: faker.random.alphaNumeric(22)
    }

    before('visit register page', () => {
        cy.visit('/');
        registrationPage.registrationBtn.click();
        cy.url().should('include', '/register');
    })

    it('POM register without letters in password', () => {

        cy.intercept({
            method:'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/register'
        }).as('register')
        
        registrationPage.register(
            userData.firstName,
            userData.lastName,
            userData.email,
            userData.password,
        )
        cy.url().should('not.include', '/register');
    })
})