class AllGalleriesPage {
    get searchField() {
        return cy.get('#searchField');
    }

    get allGalleries() {
        return cy.get('.grid')
    }

    get singleGallery() {
        return cy.get('.cell')
    }

    get loadMoreBtn(){
        cy.get('button').eq(1).click();
    }

    //get galleryTitle() {
    //    return cy.get('.box-title')
   // }
    get galleryTitle() {
        return this.singleGallery.first().find('a');
    }
}

export const allGalleriesPage = new AllGalleriesPage();