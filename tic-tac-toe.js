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

  this.board = {}

  this.claimSpace = function (space_id) {
    if (this.board[space_id]) {
      console.log("already claimed")
      return false
    } else {
      this.board[space_id] = 1
      console.log(this.player() + ' claimed ', space_id)
      this.turn++
      console.log(this.turn % 2)
      if (this.hasWon()) {
        console.log('won!')
      }
      return true
    }
  }

  this.hasWon = function () {
    return false
  }

}

TicTacToe.prototype = {
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
