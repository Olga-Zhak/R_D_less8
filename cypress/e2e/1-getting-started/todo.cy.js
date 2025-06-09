import { faker } from '@faker-js/faker';

describe('Get goals', () => {

  it('Getting goal by id is not possible without valid token', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.clickup.com/api/v2/goal/274fc150-e695-4a59-b1a8-d645aca9af34',
      headers: {
        'Authorization': 'invalid_token'
      },
      failOnStatusCode: false
    }).then( (positiveCheck) => {
      expect(positiveCheck.status).to.eq(401)

    })
  })

  it('Should send GET request and return 200', () => {
    // url. header, body, method
    cy.request({
      url: 'https://api.clickup.com/api/v2/team/90151152155/goal',
      method: 'GET',
      headers: {
        'Authorization': 'pk_194448192_K8TF4EQBGZS7DZJ2GKEXBKRL7O44LJ8A'
      }

    }).then( (positiveCheck) => {
      expect(positiveCheck.status).to.eq(200)
    })

  })

  it('Post goal', () => {
    cy.request({
      method: 'POST',
      url: 'https://api.clickup.com/api/v2/team/90151152155/goal',
      headers: {
        'Authorization': 'pk_194448192_K8TF4EQBGZS7DZJ2GKEXBKRL7O44LJ8A',
        'Content-Type': 'application/json'
      },
      body: {
        'name': faker.internet.email()
      }
    })
  })


  it('Update goal by id', () => {

    cy.request({
      method: 'POST',
      url: 'https://api.clickup.com/api/v2/team/90151152155/goal',
      headers: {
        'Authorization': 'pk_194448192_K8TF4EQBGZS7DZJ2GKEXBKRL7O44LJ8A',
        'Content-Type': 'application/json'
      },
      body: {
        'name': faker.internet.email()
      }
    }).then( (response) => {
      cy.wrap(response.body.id).as('goalId')
    })

    cy.get('@goalId').then( (goalId) => {
      cy.request({
        method: 'PUT',
        url: 'https://api.clickup.com/api/v2/goal/' + goalId,
        headers: {
          'Authorization': 'pk_194448192_K8TF4EQBGZS7DZJ2GKEXBKRL7O44LJ8A',
          'Content-Type': 'application/json'
        },
        body: {
          'name': faker.internet.username()
        },
        failOnStatusCode: false
      })
    })
  })

  it('Delete goal by id', () => {

    cy.request({
      method: 'POST',
      url: 'https://api.clickup.com/api/v2/team/90151152155/goal',
      headers: {
        'Authorization': 'pk_194448192_K8TF4EQBGZS7DZJ2GKEXBKRL7O44LJ8A',
        'Content-Type': 'application/json'
      },
      body: {
        'name': faker.internet.email()
      }
    }).then( (response) => {
      cy.wrap(response.body.id).as('goalId')
    })

    cy.get('@goalId').then( (goalId) => {
      cy.request({
        method: 'DELETE',
        url: 'https://api.clickup.com/api/v2/goal/' + goalId,
        headers: {
          'Authorization': 'pk_194448192_K8TF4EQBGZS7DZJ2GKEXBKRL7O44LJ8A'
        },
        failOnStatusCode: false
      })
    })
  })


})

