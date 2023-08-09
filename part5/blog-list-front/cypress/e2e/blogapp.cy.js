describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user1 = {
      name: 'Juan Camilo',
      username: 'camilo',
      password: 'camilopass',
    }
    const user2 = {
      name: 'Jhon Doe',
      username: 'jhonD',
      password: 'test',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Loggin into aplication')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('camilo')
      cy.get('#password').type('camilopass')
      cy.get('#login-button').click()

      cy.contains('Juan Camilo logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wronguser')
      cy.get('#password').type('wrongpass')
      cy.get('#login-button').click()

      cy.contains('Incorrect username or password')
      cy.get('.error')
        .should('contain', 'Incorrect username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'camilo', password: 'camilopass' })
    })

    it('A blog can be created', function () {
      cy.contains('Add blog').click()
      cy.get('#title').type('Created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('cypress.com')

      cy.contains('Save').click()
      cy.contains('Created by cypress')
    })

    describe('and several blog exists', function () {

      beforeEach(function () {
        cy.createBlog({
          title: 'blog 1',
          author: 'author 1',
          url: 'url1',
          likes: 25,
        })
        cy.createBlog({
          title: 'blog 2',
          author: 'author 2',
          url: 'url2',
          likes: 58,
        })
        cy.createBlog({
          title: 'blog 3',
          author: 'author 3',
          url: 'url3',
          likes: 0,
        })
      })

      it('A blog can be liked', function () {
        cy.contains('blog 3').as('thechoosenone')
        cy.get('@thechoosenone').contains('show').click()
        cy.get('@thechoosenone')
          .parent()
          .contains('Like', { timeout: 2000 })
          .click()
      })

      it('A blog can be deleted only by the creator user', function () {
        cy.login({ username: 'jhonD', password: 'test' })
        cy.createBlog({ title: 'blog 4', author: 'author 4', url: 'url4' })

        cy.contains('blog 3').as('canNotBeDeleted')
        cy.get('@canNotBeDeleted').contains('show').click()
        cy.get('@canNotBeDeleted').parent().not('.remove')

        cy.contains('blog 4').as('canBeDeleted')
        cy.get('@canBeDeleted').contains('show').click()
        cy.get('@canBeDeleted').parent().contains('Remove').click()

        cy.contains('blog 4 by author 4 has been removed')
      })

      it('The blog list is sorted from max likes to min likes', function () {
        cy.get('.blog').eq(0).should('contain', 'blog 2')
        cy.get('.blog')
        .eq(1)
        .should('contain', 'blog 1')
        cy.get('.blog').eq(2).should('contain', 'blog 3')
      })
    })
  })
})
