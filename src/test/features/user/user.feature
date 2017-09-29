Feature: Admin User management

    User "admin" should be able to manage other User with less authorities.
    In order to offer a User Management via an hypermedia REST API
    As an admin user
    I need to be able to retrieve and update User resources.

    Background:
        And I am successfully logged in with username: 'admin', and password: 'admin'

    Scenario: Can retrieve all users
        When I send a GET request to '/api/users?page=0&size=20&sort=id,asc'
        Then the response code should be 200
        And the response Content-Type should be equal to 'application/json;charset=UTF-8'
        And the response should contain an array of 3 objects

    Scenario: Can retrieve each user detail
        When I send a GET request to '/api/users/user'
        Then the response code should be 200
        And the response Content-Type should be equal to 'application/json;charset=UTF-8'

    Scenario: Cannot retrieve a none existant user
        When I send a GET request to '/api/users/jeanfrancois'
        Then the response code should be 404

    Scenario: Can delete another existing user
        When I send a DELETE request to '/api/users/user'
        Then the response code should be 200
        And I send a GET request to '/api/users/user'
        Then the response code should be 404

    Scenario: Cannot delete non existing user
        When I send a DELETE request to '/api/users/robert'
        Then the response code should be 200
        And I send a GET request to '/api/users/user'
        Then the response code should be 404
