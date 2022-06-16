import { allGalleriesPage, AllGalleriesPage } from '../page_objects/allGalleriesPage';

describe('all Galleries POM', () => {
    const searchField = {
        search: 'something'
    
}

before('all Galleries Page', () => {
    cy.visit('/');
    cy.get('.form-control').type('nesto');
    cy.get('.input-button').click();
})

it('POM all galleries page', () => {
    allGalleriesPage.singleGallery.should('have.length')
    allGalleriesPage.loadMoreBtn.click()
    allGalleriesPage.singleGallery.should('have.length')
    
    
  })

  it.only('test redirection to single gallery', () =>{
      allGalleriesPage.galleryTitle.first();
  })
})