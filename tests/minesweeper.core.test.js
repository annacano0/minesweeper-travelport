import { loadFeature, defineFeature } from 'jest-cucumber'
import * as steps from './steps/minesweeper.steps'

const feature = loadFeature('./tests/features/minesweeper.core.feature')

defineFeature(feature, (test) => {
  test('Starting game - Minefield default sizing 9x9', ({ given, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    then(/^the minefield should have "(.*)" rows and "(.*)" columns$/, (numberOfRows, numberOfCols) => {
      expect(steps.mineFieldDimensionsValidation(numberOfRows, numberOfCols)).toBe(true)
    })
  })

  test('Starting game - All the cells should be covered', ({ given, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    then('all the cells should be covered', () => {
      expect(steps.areAllCellsCovered()).toBe(true)
    })
  })

  test('Starting game - All the cells should be enabled', ({ given, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    then('all the cells should be enabled', () => {
      expect(steps.areAllCellsEnabled()).toBe(true)
    })
  })

  test('Uncovering a cell with the mouse - Using mouse left click', ({ given, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })
    when(/^the player left clicks on the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.uncoverCell(rowPosition, colPosition)
    })
    then(/^the cell \("(.*)","(.*)"\) should be uncovered$/, (rowPosition, colPosition) => {
      expect(steps.isCellUncovered(rowPosition, colPosition)).toBe(true)
    })
  })

  test('Uncovering a cell - Disabling the cell', ({ given, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.uncoverCell(rowPosition, colPosition)
    })
    then(/^the cell \("(.*)","(.*)"\) should be disabled$/, (rowPosition, colPosition) => {
      expect(steps.isCellDisabled(rowPosition, colPosition)).toBe(true)
    })
  })

  test('Uncovering a cell with a mine - Losing the game', ({ given, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.uncoverCell(rowPosition, colPosition)
    })
    then('the player should lose the game', () => {
      expect(steps.hasHighlightedMine()).toBe(true)
    })
  })

  test('Uncovering a cell with a mine - Showing a highlighted mine', ({ given, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.uncoverCell(rowPosition, colPosition)
    })
    then(/^the cell \("(.*)","(.*)"\) should show a highlighted mine$/, (rowPosition, colPosition) => {
      expect(steps.isHighlightedMine(rowPosition, colPosition)).toBe(true)
    })
  })

  test('Uncovering a cell with no mine - Displaying the number of adjacent mines', ({ given, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given(/^the player loads the following mock data (.*)$/, (docString) => {
      steps.setMockData(docString)
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.uncoverCell(rowPosition, colPosition)
    })
    then(/^the cell \("(.*)","(.*)"\) should show the number (.*)$/, (rowPosition, colPosition, number) => {
      expect(steps.isNumber(rowPosition, colPosition, number)).toBe(true)
    })
  })

  test('Uncovering a cell with no mine or mines around it - Displaying an empty cell', ({ given, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.uncoverCell(rowPosition, colPosition)
    })
    then(/^the cell \("(.*)","(.*)"\) should be empty$/, (rowPosition, colPosition) => {
      expect(steps.isCellEmpty(rowPosition, colPosition)).toBe(true)
    })
  })

  test('Finishing game, disabling all the cells', ({ given, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.uncoverCell(rowPosition, colPosition)
    })
    then('all the cells should be disabled', () => {
      expect(steps.areAllCellsDisabled()).toBe(true)
    })
  })

  test('Suspecting that a cell is hiding a mine, mouse right click, tagging a cell as mined', ({ given, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    when(/^the player right clicks on the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.tagCell(rowPosition, colPosition)
    })
    then(/^the cell \("(.*)","(.*)"\) should show mined$/, (rowPosition, colPosition) => {
      expect(steps.isTaggedAsMined(rowPosition, colPosition)).toBe(true)
    })
  })

  test('The user does not have enough information to predict the content of a cell, mouse right click over a tagged cell, tagging a cell as inconclusive', ({ given, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.tagCellAsMined(rowPosition, colPosition)
    })
    when(/^the player right clicks on the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.tagCell(rowPosition, colPosition)
    })
    then(/^the cell \("(.*)","(.*)"\) should show inconclusive$/, (rowPosition, colPosition) => {
      expect(steps.isTaggedAsInconclusive(rowPosition, colPosition)).toBe(true)
    })
  })

  test('Untagging an cell, mouse right click over an inconclusive cell, removing the cell tag', ({ given, when, then, and }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given(/^the player tags as inconclusive the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.tagCellAsInconclusive(rowPosition, colPosition)
    })
    when(/^the player right clicks on the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.tagCell(rowPosition, colPosition)
    })
    then(/^the cell \("(.*)","(.*)"\) should not be tagged$/, (rowPosition, colPosition) => {
      expect(steps.isNotTagged(rowPosition, colPosition)).toBe(true)
    })
  })

  test('Uncovering a tagged cell as mined, the cell should remain covered', ({ given, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.tagCellAsMined(rowPosition, colPosition)
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.uncoverCell(rowPosition, colPosition)
    })
    then(/^the cell \("(.*)","(.*)"\) should be covered$/, (rowPosition, colPosition) => {
      expect(steps.isCellUncovered(rowPosition, colPosition)).toBe(false)
    })
  })

  test('Uncovering a tagged cell as inconclusive, the cell should remain covered', ({ given, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given(/^the player tags as inconclusive the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.tagCellAsInconclusive(rowPosition, colPosition)
    })
    when(/^the player uncovers the cell \("(.*)", "(.*)"\)$/, (rowPosition, colPosition) => {
      steps.uncoverCell(rowPosition, colPosition)
    })
    then(/^the cell \("(.*)","(.*)"\) should be covered$/, (rowPosition, colPosition) => {
      expect(steps.isCellUncovered(rowPosition, colPosition)).toBe(false)
    })
  })

  test('Winning the game, marking as mined all the mined cells', ({ given, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.uncoverCell(rowPosition, colPosition)
    })
    then(/^the cell \("(.*)","(.*)"\) should show mined$/, (rowPosition, colPosition) => {
      expect(steps.isTaggedAsMined(rowPosition, colPosition)).toBe(true)
    })
  })

  test('Losing the game, showing all the mines in the minefield', ({ given, when, then, and }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.uncoverCell(rowPosition, colPosition)
    })
    then(/^the cell \("(.*)","(.*)"\) should show a mine$/, (rowPosition, colPosition) => {
      expect(steps.isMine(rowPosition, colPosition)).toBe(true)
    })
    and(/^the cell \("(.*)","(.*)"\) should show a mine$/, (rowPosition, colPosition) => {
      expect(steps.isMine(rowPosition, colPosition)).toBe(true)
    })
  })

  test('Losing the game, showing cells incorrectly tagged as mined', ({ given, and, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })
    and(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.tagCellAsMined(rowPosition, colPosition)
    })
    and(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.tagCellAsMined(rowPosition, colPosition)
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.uncoverCell(rowPosition, colPosition)
    })
    then(/^the cell \("(.*)","(.*)"\) should show a wrongly tagged cell$/, (rowPosition, colPosition) => {
      expect(steps.isWronglyTaggedMine(rowPosition, colPosition)).toBe(true)
    })
    and(/^the cell \("(.*)","(.*)"\) should show a mine$/, (rowPosition, colPosition) => {
      expect(steps.isMine(rowPosition, colPosition)).toBe(true)
    })
  })

  test('Finishing games - The cells don\'t allow changing tags', ({ given, when, then, and }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })
    when(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.tagCellAsMined(rowPosition, colPosition)
    })
    and(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.uncoverCell(rowPosition, colPosition)
    })
    and(/^the player tags as inconclusive the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.tagCellAsInconclusive(rowPosition, colPosition)
    })
    then(/^the cell \("(.*)","(.*)"\) should show mined$/, (rowPosition, colPosition) => {
      expect(steps.isTaggedAsMined(rowPosition, colPosition)).toBe(true)
    })
  })

  test('Uncovering an empty cell - Uncovering neighbor cells', ({ given, when, then, and }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.uncoverCell(rowPosition, colPosition)
    })
    then(/^the cells around the cell \("(.*)","(.*)"\) should be uncovered$/, (rowPosition, colPosition) => {
      expect(steps.areCellsAroundACellUncovered(rowPosition, colPosition)).toBe(true)
    })
    and('the fourth row should be covered', () => {
      expect(steps.areCellsInARowCovered(4)).toBe(true)
    })
  })

  test('A non empty cell uncovered by a neighbor cell - Not uncovering its neighbor cells', ({ given, when, then, and, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.uncoverCell(rowPosition, colPosition)
    })
    then(/^the cell \("(.*)","(.*)"\) should be uncovered$/, (rowPosition, colPosition) => {
      expect(steps.isCellUncovered(rowPosition, colPosition)).toBe(true)
    })
    and(/^the cell \("(.*)","(.*)"\) should be covered$/, (rowPosition, colPosition) => {
      expect(steps.isCellUncovered(rowPosition, colPosition)).toBe(false)
    })
  })

  test('An empty cell uncovered by a neighbor cell - Uncovering its neighbor cells', ({ given, when, then, and, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.uncoverCell(rowPosition, colPosition)
    })
    then('the first three rows should be uncovered', () => {
      let result = true
      result = result && steps.areCellsInARowUncovered(1)
      result = result && steps.areCellsInARowUncovered(2)
      result = result && steps.areCellsInARowUncovered(3)
      expect(result).toBe(true)
    })
    and('the fourth row should be covered', () => {
      expect(steps.areCellsInARowCovered(4)).toBe(true)
    })
  })
})
