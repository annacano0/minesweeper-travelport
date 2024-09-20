Feature: Web Minesweeper

      As a player:
      - I want to play to the classic minesweeper game
        So I want to uncover all the cells without mines

      Scope:
      - This feature file covers the scenarios related 
        only with the elements outside the minefield
      - This feature file add more scenarios on the top
        of the core scenarios

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

Scenario: Starting game, default game status is waiting, the button status show a happy face
  Then the button status should show a happy face

Scenario: Waiting status, the timer should be 0
  Then the timer should be 0

Scenario: Waiting status, the remaining mines counter show the number of hidden mines, by default, 10
  Then the remaining mines counter should be 10

Scenario: Waiting status, the minefield has all the cells covered
  Then all the minefield cells should be covered

Scenario: Waiting status, remaining clicking a cell, the game status should be playing, the button status show a happy face
  Given the player loads the following mock data
    """
    | o | * | o |
    """
  When the player uncovers the cell ("1","1")
  Then the button status should show a happy face

Scenario: Waiting status, right clicking a cell, the game status should be playing
  When the player tags as mined the cell ("1","1")
  Then the button status should show a happy face

Scenario: Playing status, the remaining mines counter show the number of hidden mines
  Given the player loads the following mock data
    """
    | o | * | o |
    """
  When the player uncovers the cell ("1","1")
  Then the remaining mines counter should show "1"

@timeconsumer
Scenario: Playing status, the timer starts
  Given the player loads the following mock data
    """
    | o | * | o |
    """
  When the player uncovers the cell ("1","1")
  And the user waits "2" second
  Then the timer should show a number greater than "0"

Scenario: The user wins the game, the button status show a happy face with sunglasses
  Given the player loads the following mock data
  """
  | o | * | 
  """
  When the player uncovers the cell ("1","1")
  Then the button status should show a happy face with sunglasses

Scenario: The user loses the game, the button status show a sad face
  Given the player loads the following mock data
  """
  | o | * | 
  """
  When the player uncovers the cell ("1","2")
  Then the button status should show a sad face

Scenario: the user clicks on the button status, the game is waiting
  When the player clicks on the button status
  Then the button status should show a happy face

Scenario: Tagging a cell as mine, the remaining mines counter decrease
  Given the player loads the following mock data
  """
  | o | * | 
  """
  When the player tags as mined the cell ("1","1")
  Then the remaining mines counter should be "0"

Scenario: Untagging a cell as mine, the remaining mines counter increase
  Given the player loads the following mock data
  """
  | o | * | 
  """
  And the player tags as mined the cell ("1","1")
  When the player untags the cell ("1","1")
  Then the remaining mines counter should be "1"

Scenario: Tagging as mined more cells than the number of mines, the remaining mines counter is negative
  Given the player loads the following mock data
  """
  | o | * | 
  """
  And the player tags as mined the cell ("1","1")
  When the player tags as mined the cell ("1","2")
  Then the remaining mines counter should be "-1"

Scenario: Tagging a cell as inconclusive, the remaining mines counter remains equal
  Given the player loads the following mock data
  """
  | o | * | 
  """
  When the player tags as inconclusive the cell ("1","1")
  Then the remaining mines counter should be "1"

Scenario: Change tag from mined to inconclusive, the remaining mines counter increase
  Given the player loads the following mock data
  """
  | o | * | 
  """
  And the player tags as mined the cell ("1","1")
  When the player tags as inconclusive the cell ("1","1")
  Then the remaining mines counter should be "1"

Scenario: Change tag from inconclusive to mined, the remaining mines counter decrease
  Given the player loads the following mock data
  """
  | o | * | 
  """
  And the player tags as inconclusive the cell ("1","1")
  When the player tags as mined the cell ("1","1")
  Then the remaining mines counter should be "0"