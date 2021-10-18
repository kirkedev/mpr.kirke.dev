Feature: Loads the page
    Scenario: App loads
        Given an app
        When I load the app
        Then I see the MPR Dashboard header
