Feature: Tesla Insurance UI Tests

  Scenario: Verify Insurance page heading
    Given I open the Tesla Insurance page
    Then I should see the heading "Tesla Insurance"

  Scenario: Verify Get Quote button is clickable
    Given I open the Tesla Insurance page
    When I click the Get Quote button
    Then I should see the popup form heading "Get Your Tesla Insurance Quote"

  Scenario: Verify Get Quote form submission
    Given I open the Tesla Insurance page
    When I fill the form with valid details and submit
    Then I should see an alert with text "Quote request submitted! Tesla will contact you shortly."
