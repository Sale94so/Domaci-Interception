class CreateGallery {
    get titleInput() {
        return cy.get('#title');
    }
    get createGalleryBtn() {
        return cy.get('.nav-link').eq(2).click()
    }

    get descriptionInput() {
        return cy.get('#description')
    }

    get imageInput() {
        return cy.get('input').last();
    }

    get submitBtn() {
        return cy.get('button').eq(-2);
    }

    get errorMessage() {
        return cy.get ('p[class="alert alert-danger"]');
    }


    titleWithOneCharacter(title,description,image) {
        this.titleInput.type(title);
        this.descriptionInput.type(description)
        this.imageInput.type(image);
        this.submitBtn.click();
    }

    createGallery(title, description, image) {
        this.createGalleryBtn.click();
        this.titleInput.type(title);
        this.descriptionInput.type(description);
        this.imageInput.type(image);
        this.submitBtn.click();
        
    }

    withoutTitleDesc(image) {
         this.createGalleryBtn.click();
         this.imageInput.type(image);
         this.submitBtn.click();
    }

    titleWith300Characters(title,description,image){
        this.titleInput.type(title)
        this.descriptionInput.type(description)
        this.imageInput.type(image)
        this.submitBtn.click()
    }
}

export const createGalery = new CreateGallery()