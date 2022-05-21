describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/',{ 'username':'testip', 'name':'Testi Persoona', 'password':'salasana' })
    cy.visit('http://localhost:3000')
  })

  it('login displayed by default', function() {
    cy.contains('Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('testip')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('You are logged in as Testi Persoona')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testip')
      cy.get('#password').type('eisalasana')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testip')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#visible-button').click()
      cy.get('#title').type('Tämä on testi')
      cy.get('#author').type('Testi T.')
      cy.get('#url').type('Testin verkko-osoite')
      cy.get('#submit-button').click()

      cy.contains('Tämä on testi')
    })

    it('User can like a blog', function() {
      cy.get('#visible-button').click()
      cy.get('#title').type('Tämä on testi')
      cy.get('#author').type('Testi T.')
      cy.get('#url').type('Testin verkko-osoite')
      cy.get('#submit-button').click()

      cy.get('#view-button').click()
      cy.get('#like-button').click()

      cy.contains('Likes: 1')
    })

    it('User can delete a blog', function() {
      cy.get('#visible-button').click()
      cy.get('#title').type('Tämä on testi')
      cy.get('#author').type('Testi T.')
      cy.get('#url').type('Testin verkko-osoite')
      cy.get('#submit-button').click()

      cy.get('#view-button').click()
      cy.get('#delete-button').click()

      cy.contains('Tämä on testi has been deleted')
    })

    it('Blog with most likes is first on the page', function() {
      cy.get('#visible-button').click()
      cy.get('#title').type('Tämä on testi')
      cy.get('#author').type('Testi T.')
      cy.get('#url').type('Testin verkko-osoite')
      cy.get('#submit-button').click()

      cy.get('#visible-button').click()
      cy.get('#title').type('Tämä on testi too')
      cy.get('#author').type('Testi Too')
      cy.get('#url').type('Testi too:n verkko-osoite')
      cy.get('#submit-button').click()

      cy.get('.blog').should('have.length', 2).eq(0).find('#view-button').click()
      cy.get('.blog').should('have.length', 2).eq(1).find('#view-button').click()

      cy.get('.blog').should('have.length', 2).eq(1).find('#like-button').click()

      cy.get('.blog').should( blogs => {
        expect(blogs[0]).to.contain.text('Tämä on testi too')
        expect(blogs[1]).to.contain.text('Tämä on testi')
      })
    })
  })
})