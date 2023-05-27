describe('Routing through /pages', () => {
    it('Home', () => {
        cy.visit('http://localhost:8081');

        cy.get('a[href*="/movies"]').contains('Фильмы').click();

        cy.url().should('include', '/movies');

        cy.get('a[href*="/"]').contains('Мой иви').click();

        cy.url().should('equal', 'http://localhost:8081');
    });
});
