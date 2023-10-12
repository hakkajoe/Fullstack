describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'kayttajan nimi',
      username: 'nimimerkki',
      password: '123',
    }
    const user2 = {
      name: 'kayttajan nimi2',
      username: 'nimimerkki2',
      password: '123',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('nimimerkki')
      cy.get('#password').type('123')
      cy.get('#login').click()

      cy.contains('nimi logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('vääränimimerkki')
      cy.get('#password').type('123')
      cy.get('#login').click()

      cy.contains('wrong username')
    })

  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('nimimerkki')
      cy.get('#password').type('123')
      cy.get('#login').click()
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('cypress blog')
      cy.get('#author').type('blog author')
      cy.get('#url').type('12345')
      cy.get('#submit').click()
      cy.contains('cypress blog')
    })
  })

  describe('when a blog exists', function() {
    beforeEach(function() {
      cy.get('#username').type('nimimerkki')
      cy.get('#password').type('123')
      cy.get('#login').click()

      cy.contains('new blog').click()
      cy.get('#title').type('blog 1')
      cy.get('#author').type('author 1')
      cy.get('#url').type('url 1')
      cy.get('#submit').click()
      cy.wait(3500)
      cy.contains('new blog').click()
      cy.get('#title').type('blog 2')
      cy.get('#author').type('author 2')
      cy.get('#url').type('url 2')
      cy.get('#submit').click()
    })

    it('can like blog', function() {
      cy.contains('view').click()
      cy.get('#like').click()
      cy.contains('likes 1')
    })

    it('can remove blog', function() {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.on('window:confirm', (str) => {
        expect(str).to.equal('Remove blog blog 1 by author 1?')
        return true
      })
      cy.get('html').should('not.contain', 'blog 1')
    })

    it('another user cannot remove blog', function() {
      cy.contains('logout').click()
      cy.get('#username').type('nimimerkki2')
      cy.get('#password').type('123')
      cy.get('#login').click()
      cy.contains('view').click()
      cy.get('button').should('not.contain', 'remove')
    })
  })
})