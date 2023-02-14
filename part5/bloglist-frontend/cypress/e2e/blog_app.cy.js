describe('Blog app', function() {
  beforeEach(function() {
    // Reset the testing database
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    // Create new user for testing
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application').should('exist')
    cy.get('#login').should('exist')
    cy.get('#username').should('exist')
    cy.get('#password').should('exist')
    cy.contains('button', 'login').should('exist')
  })

  describe('Login', () => {
    it.only('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in').should('exist')
    })

    it.only('fails with invalid credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrongPassword')
      cy.get('#login-button').click()

      cy.contains('wrong username or password').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})