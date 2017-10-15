Feature: Create record about computer
  As a user of the computers DB
  I would like to create new record about computer
  So that it is added to DB (list)

  Scenario: Create new computer record without filling required fields
    Given The computers page is opened one
    When I press Add a new computer button one
    Then Add a computer page is opened one
    When I fill no fields and I press Create button
    Then I'm restricted to create the computer without filling required fields
    When I fill required field with value "TestPC001"
    When Press Create button
    Then I return to computers list page
    When I search the created computer by name "TestPC001"
    Then I find one result
    When I open the created computer
    Then All form data is present and valid
    When I enter wrong data for Date fields
    Then Fields are highlighted, computer not updated
    When I enter correct data for Date fields
    Then Computer is updated and saved
    When I search the updated computer by name "TestPC001"
    Then I find one updated result
    When I open the updated computer
    Then All updated form data is present and valid
    When I press Delete button
    Then Computer is deleted, message is displayed
    When I search the updated computer by name "TestPC001"
    Then I find no results

