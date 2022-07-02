// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: dice;
const STATE_EMPTY = null
const STATE_PLAYER_ONE = 1
const STATE_PLAYER_TWO = 2

let CURRENT_PLAYER = STATE_PLAYER_ONE
let WINNER = null
let HAS_EMPTY_SQUARES = true

let board = [
  [ STATE_EMPTY, STATE_EMPTY, STATE_EMPTY ],
  [ STATE_EMPTY, STATE_EMPTY, STATE_EMPTY ],
  [ STATE_EMPTY, STATE_EMPTY, STATE_EMPTY ]
]

let table = new UITable()
updateTable()
table.present()

function updateTable() {
  table.removeAllRows()
  for (let rn = 0; rn < board.length; rn++) {
    let cols = board[rn]
    let row = new UITableRow()
    row.height = 80
    for (let cn = 0; cn < cols.length; cn++) {
      let state = cols[cn]
      let emoji = emojiForSquareState(state)
      let cell
      if (state == STATE_EMPTY && WINNER == null && HAS_EMPTY_SQUARES) {
        cell = row.addButton(emoji)
        cell.onTap = () => {
          move(rn, cn)
          checkForWinner()
          checkIfHasEmptySquares()
          changeCurrentPlayer()
          updateTable()
          table.reload()
        }
      } else {
        cell = row.addText(emoji)              
      }
      cell.centerAligned()
    }
    table.addRow(row) 
  }
  if (WINNER != null) {
    let row = new UITableRow()
    row.isHeader = true
    let emoji = emojiForSquareState(WINNER)
    let cell = row.addText(emoji + " won!") 
    cell.titleColor = new Color("54d132")
    cell.centerAligned()
    table.addRow(row)    
  } else if (!HAS_EMPTY_SQUARES) {
    let row = new UITableRow()
    row.isHeader = true
    let emoji = emojiForSquareState(WINNER)
    let cell = row.addText("It's a tie 👔")
    cell.titleColor = Color.orange()
    cell.centerAligned()
    table.addRow(row)    
  } else {
    let currentPlayerRow = new UITableRow()
    let currentPlayerEmoji = emojiForSquareState(CURRENT_PLAYER)
    let currentPlayerCell = currentPlayerRow.addText("Turn: " + currentPlayerEmoji)
    currentPlayerCell.centerAligned()
    table.addRow(currentPlayerRow)
  }
}

function move(rn, cn) {
  board[rn][cn] = CURRENT_PLAYER
}

function changeCurrentPlayer() {
  if (CURRENT_PLAYER == STATE_PLAYER_ONE) {
    CURRENT_PLAYER = STATE_PLAYER_TWO
  } else {
    CURRENT_PLAYER = STATE_PLAYER_ONE
  }
}

function checkForWinner() {
  for (let rn = 0; rn < board.length; rn++) {
    // horizontal non-null match
    if (board[rn][0] !== STATE_EMPTY && board[rn][0] === board[rn][1] && board[rn][1] === board[rn][2]) {
      WINNER = CURRENT_PLAYER
      return
    }
    // vertical non-null match
    if (board[0][rn] !== STATE_EMPTY && board[0][rn] === board[1][rn] && board[1][rn] === board[2][rn]) {
      WINNER = CURRENT_PLAYER
      return
    }
    // downward diagnal non-null-match
    if (board[0][0] !== STATE_EMPTY && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      WINNER = CURRENT_PLAYER
      return
    }
    // upward diagnal non-null-match
    if (board[2][0] !== STATE_EMPTY && board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
      WINNER = CURRENT_PLAYER
      return
    }
  }
}

function checkIfHasEmptySquares() {
  let hasEmptySquares = false
  for (let rn = 0; rn < board.length; rn++) {
    let shouldBreak = false
    let cols = board[rn]
    for (let cn = 0; cn < cols.length; cn++) {
      if (board[rn][cn] == STATE_EMPTY) {
        hasEmptySquares = true
        shouldBreak = true
        break
      }
    }
    if (shouldBreak) {
      break
    }
  }
  HAS_EMPTY_SQUARES = hasEmptySquares
}

function emojiForSquareState(state) {
  if (state == STATE_PLAYER_TWO) {
    return "🐶"
  } else if (state == STATE_PLAYER_ONE) {
    return "🦁"
  } else {
    return "⬛️"
  }
}