/// <reference types="Cypress" />
import { createGalery } from '../page_objects/createGalleryPage';
const faker = require('@faker-js/faker');

describe('Create gallery test', () => {
    let title1 = faker.random.alpha({count:6})
    let invalidTitle1 = faker.random.alpha({count:1})
    let invalidTitle2 = faker.random.alpha({count:300})
    let description = 'test1'
    let image = 'https://docs.cypress.io/api/commands/contains#Syntax.jpg'
    let galleryId;
    let galleryData = {
        title: faker.name.firstName(),
        description: faker.name.firstName(),
        image: faker.image.avatar()
    }    

    before('login via backend', () => {
        cy.loginViaBackend()
        cy.visit('/create');
        cy.url().should('include', '/create');
    });

    it('create gallery without title and description',() => {

        cy.intercept({ 
            method: 'POST',
            url:'https://gallery-api.vivifyideas.com/api/galleries'

        }).as('withoutTitleDesc')

        createGalery.withoutTitleDesc(image)
        cy.url().should('include','/create')
        
    })


    it.only('create gallery with 300 characters in title',() => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('createGallery300')
    
        createGalery.titleWith300Characters(invalidTitle2,description,image)
        cy.url().should('include','/create')
       
        cy.wait('@createGallery300').then(interception => {
                expect(interception.response.body.errors.title[0])
                .eq("The title may not be greater than 255 characters.")
                createGalery.errorMessage.should('be.visible')
                .and('have.text','The title may not be greater than 255 characters.')
                .and('have.css','background-color','rgb(248, 215, 218)')
            
         })
    })

    it('create gallery with one character in title',() => {
    cy.intercept({
        method: 'POST',
        url: 'https://gallery-api.vivifyideas.com/api/galleries'
    }).as('createGallery')

    createGalery.titleWithOneCharacter(invalidTitle1,description,image)
    cy.url().should('include','/create')
   
    cy.wait('@createGallery').then(interception => {
            expect(interception.response.body.errors.title[0])
            .eq("The title must be at least 2 characters.")
            createGalery.errorMessage.should('be.visible')
            .and('have.text','The title must be at least 2 characters.')
            .and('have.css','background-color','rgb(248, 215, 218)')
        
        })
    })

    it('create gallery', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('createGallery')

        createGalery.createGallery(
            galleryData.title, 
            galleryData.description, 
            galleryData.image
            )

        cy.wait('@createGallery').then(interception => {
            galleryId = interception.response.body.id

            expect(interception.response.body.title).eq(galleryData.title)
            cy.visit(`/galleries/${galleryId}`)
            // cy.visit('/galleries/' + galleryId)
            cy.get('h1').should('have.text', galleryData.title)
        })
    })
})