Feature: Period Selector
  Scenario: View one month of data
    Given I'm on the app
    And the 1M button is not selected
    When I click the 1M button
    Then 1M is highlighted
    And I see one month of data on each chart

  Scenario: View three months of data
    Given I'm on the app
    And the 3M button is not selected
    When I click the 3M button
    Then 3M is highlighted
    And I see three months of data on each chart

  Scenario: View six months of data
    Given I'm on the app
    And the 6M button is not selected
    When I click the 6M button
    Then 6M is highlighted
    And I see six months of data on each chart

  Scenario: View one year of data
    Given I'm on the app
    And the 1Y button is not selected
    When I click the 1Y button
    Then 1Y is highlighted
    And I see one year of data on each chart
