// what is a turn?

// determine which player has a turn

// select a space
 // space available?
 // space advantage
// claim space using player identifier
// check win/loss state
 // what is a win?
 // what is a draw?
 // what is a loss?
 // communicate outcome
 // continue play?

function TicTacToe() {

  this.claimSpace = function (space_id) {
    if (typeof(this.board[space_id]) !== 'number') {
      console.log("already claimed")
      return false
    } else {
      this.board[space_id] = this.player()
      console.log(this.player() + ' claimed ', space_id)
      if (this.hasWon()) {
        console.log(this.player() + ' won!')
      }
      this.turn++

      return true
    }
  }

  this.hasWon = function () {
    //check diagonal -- 4 and 2 apart
    if (this.board[1] === this.board[5] && this.board[5] === this.board[9]) { return true }
    if (this.board[3] === this.board[5] && this.board[5] === this.board[7]) { return true }
    // check horizontal -- differences are 1
    if (this.board[1] === this.board[2] && this.board[2] === this.board[3]) { return true }
    if (this.board[4] === this.board[5] && this.board[5] === this.board[6]) { return true }
    if (this.board[7] === this.board[8] && this.board[8] === this.board[9]) { return true }
    // check vertical -- 3 apart
    if (this.board[1] === this.board[4] && this.board[4] === this.board[7]) { return true }
    if (this.board[2] === this.board[5] && this.board[5] === this.board[8]) { return true }
    if (this.board[3] === this.board[6] && this.board[6] === this.board[9]) { return true }

    return false
  }

}

TicTacToe.prototype = {
  turn: 0,
  board: {
    1: 1, 2: 2, 3: 3,
    4: 4, 5: 5, 6: 6,
    7: 7, 8: 8, 9: 9
  },
  player: function () {
    return this.turn % 2 === 0 ? 'player1' : 'player2'
  }
}

// jQ
$(document).on('ready', function() {
  console.log('create and begin the game here!')

  var game = new TicTacToe()
  var board = $('.board')
  var spaces = $('.space')

  // claiming a space
  spaces.click(function (event) {
    event.preventDefault()
    var id = $(this).attr('id')
    if (game.claimSpace(id)) {
      $(this).addClass(game.player())
    }
  })


})
