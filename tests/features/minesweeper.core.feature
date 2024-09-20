Feature: Core Minesweeper

      As a player:
      - I want to play to the classic minesweeper game
      - So I want to uncover all the cells without mines

      Scope:
      - This feature file covers the scenarios related only with the minefield

      How to refer to a cell:
      - Using the (row,column) nomenclature
      - Rows and columns starts from 1

      How to load mock data
      - Using the <ctrl>+m keyboard combination to discover
      the load mock data form

      To define the board data will use:
      "o" No mine
      "*" Mine
      "-" Row separator

      Thera are two ways to define mock data
      - Inline:
      "***-ooo-*oo"
      - Table:
      | * | * | * |
      | o | o | o |
      | * | o | o |

  Game example: https://minesweeper.online/es/game/3584089869

  Background:
    Given the player opens the game

  Scenario: Starting game - Minefield default sizing 9x9
    Then the minefield should have "9" rows and "9" columns

  Scenario: Starting game - All the cells should be covered
    Then all the cells should be covered

  Scenario: Starting game - All the cells should be enabled
    Then all the cells should be enabled

  Scenario: Uncovering a cell with the mouse - Using mouse left click
    Given the player loads the following mock data
      """
      | * | o |
      """
    When the player left clicks on the cell ("1","2")
    Then the cell ("1","2") should be uncovered

  Scenario: Uncovering a cell - Disabling the cell
    Given the player loads the following mock data
      """
      | * | o |
      """
    When the player uncovers the cell ("1","2")
    Then the cell ("1","2") should be disabled

  Scenario: Uncovering a cell with a mine - Losing the game
    Given the player loads the following mock data
      """
      | * | o |
      """
    When the player uncovers the cell ("1","1")
    Then the player should lose the game

  Scenario: Uncovering a cell with a mine - Showing a highlighted mine
    Given the player loads the following mock data
      """
      | * | o |
      """
    When the player uncovers the cell ("1","1")
    Then the cell ("1","1") should show a highlighted mine

  Scenario Outline: Uncovering a cell with no mine - Displaying the number of adjacent mines
    Given the player loads the following mock data <boardData>
    When the player uncovers the cell ("2","2")
    Then the cell ("2","2") should show the number <number>

    Examples:
      | boardData   | number |
      | o*o-ooo-ooo | 1      |
      | o*o-ooo-oo* | 2      |
      | o*o-ooo-*o* | 3      |
      | *o*-ooo-*o* | 4      |
      | ***-*o*-ooo | 5      |
      | *o*-*o*-*o* | 6      |
      | ***-oo*-*** | 7      |
      | ***-*o*-*** | 8      |

  Scenario: Suspecting that a cell is hiding a mine, mouse right click, tagging a cell as mined
    When the player right clicks on the cell ("1","1")
    Then the cell ("1","1") should show mined

  Scenario: The user does not have enough information to predict the content of a cell, mouse right click over a tagged cell, tagging a cell as inconclusive
    Given the player tags as mined the cell ("1","1")
    When the player right clicks on the cell ("1","1")
    Then the cell ("1","1") should show inconclusive

  Scenario: Untagging an cell, mouse right click over an inconclusive cell, removing the cell tag
    Given the player tags as inconclusive the cell ("1","1")
    When the player right clicks on the cell ("1","1")
    Then the cell ("1","1") should not be tagged

  Scenario: Uncovering a tagged cell as mined, the cell should remain covered
    Given the player tags as mined the cell ("1","1")
    When the player uncovers the cell ("1","1")
    Then the cell ("1","1") should be covered

  Scenario: Uncovering a tagged cell as inconclusive, the cell should remain covered
    Given the player tags as inconclusive the cell ("1","1")
    When the player uncovers the cell ("1", "1")
    Then the cell ("1","1") should be covered

  Scenario Outline: Finishing game, disabling all the cells
    Given the player loads the following mock data
      """
      | * | o |
      """
    When the player uncovers the cell ("<row>","<col>")
    Then all the cells should be disabled

    Examples:
      | row | col |
      | 1   | 1   |
      | 1   | 2   |

  Scenario: Finishing games - The cells don't allow changing tags
    Given the player loads the following mock data
      """
      | * | o |
      """
    When the player tags as mined the cell ("1","1")
    And the player uncovers the cell ("1","2")
    And the player tags as inconclusive the cell ("1","1")
    Then the cell ("1","1") should show mined

  Scenario: Winning the game, marking as mined all the mined cells
    Given the player loads the following mock data
      """
      | * | o |
      """
    When the player uncovers the cell ("1","2")
    Then the cell ("1","1") should show mined

  Scenario: Losing the game, showing all the mines in the minefield
    Given the player loads the following mock data
      """
      | * | * |
      | o | * |
      """
    When the player uncovers the cell ("1","1")
    Then the cell ("1","2") should show a mine
    And the cell ("2","2") should show a mine

  Scenario: Losing the game, showing cells incorrectly tagged as mined
    Given the player loads the following mock data
      """
      | * | o |
      | * | o |
      """
    And the player tags as mined the cell ("1","1")
    And the player tags as mined the cell ("1","2")
    When the player uncovers the cell ("2","1")
    Then the cell ("1","2") should show a wrongly tagged cell
    And the cell ("1","1") should show a mine

  Scenario: Uncovering a cell with no mine or mines around it - Displaying an empty cell
    Given the player loads the following mock data
      """
      | o | o | o |
      | o | o | o |
      | o | o | o |
      | * | * | * |
      """
    When the player uncovers the cell ("2","2")
    Then the cell ("2","2") should be empty

  Scenario: Uncovering an empty cell - Uncovering neighbor cells
    Given the player loads the following mock data
      """
      | o | o | o |
      | o | o | o |
      | o | o | o |
      | * | o | * |      
      """
    When the player uncovers the cell ("2","2")
    Then the cells around the cell ("2","2") should be uncovered
    And the fourth row should be covered

  Scenario: A non empty cell uncovered by a neighbor cell - Not uncovering its neighbor cells
    Given the player loads the following mock data
      """
      | o | o | o |
      | o | o | o |
      | o | o | o |
      | * | o | * |
      """
    When the player uncovers the cell ("2","2")
    Then the cell ("3","2") should be uncovered
    And the cell ("4","2") should be covered

  Scenario: An empty cell uncovered by a neighbor cell - Uncovering its neighbor cells
    Given the player loads the following mock data
      """
      | o | o | o |
      | o | o | o |
      | o | o | o |
      | * | o | * |
      """
    When the player uncovers the cell ("1","1")
    Then the first three rows should be uncovered
    And the fourth row should be covered