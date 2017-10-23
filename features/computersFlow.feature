Feature: Create record about computer
  As a user of the computers DB
  I would like to create new record about computer
  So that it is added to DB (list)

  Scenario: Create new computer record
    Given The computers page is opened
    When I press Add a new computer button
    Then Add a computer page is opened
    When Press Create button
    Then I'm restricted to create the computer without filling required fields
    When I fill required field with value "TestPC001"
    When Press Create button
    Then I return to computers list page
    And "Done! Computer TestPC001 has been created" message is displayed

  Scenario: Validate created computer and Update it with wrong data
    Given The computers page is opened
    When I search for the computer by name "TestPC001"
    Then I find one result
    When I open the found computer
    Then Entered form data is present and valid
    When I enter wrong data for Date fields
    Then Fields are highlighted, computer not updated
    When I press cancel button
    Then I return to computers list page

  Scenario: Validate created computer and Update it with correct data
    Given The computers page is opened
    When I search for the computer by name "TestPC001"
    Then I find one result
    When I open the found computer
    Then Incorrect data is not saved
    When I enter correct data for Date fields
    Then I return to computers list page
    And "Done! Computer TestPC001 has been updated" message is displayed

#  Scenario: Validate Updated computer and Delete it
#    Given The computers page is opened
    When I search for the computer by name "TestPC001"
    Then I find one updated result
    When I open the found computer
    Then All updated form data is present and valid
    When I press Delete button
    Then I return to computers list page
    And "Done! Computer has been deleted" message is displayed
    When I search for the computer by name "TestPC001"
    Then I find no results

