class LogoutPage {
    get logoutBtn(){
        return cy.get('.nav-link').eq(3);
    }
}
export const logoutPage = new LogoutPage()