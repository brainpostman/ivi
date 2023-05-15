describe('<Header />', () => {
  it('SMTH', () => {
    cy.viewport('macbook-15')
    cy.visit('http://localhost:8080', {
      onBeforeLoad: () => {
        Object.defineProperty(navigator, 'language', {
          value: 'ru',
        })
      },
    })

    cy.get('a[href*="/movies"]').contains('Фильмы').click()

    cy.url().should('include', '/movies')

    cy.get('a[href*="/"]').contains('Мой иви').click()

    cy.url().should('equal', 'http://localhost:8080')
  })
})
