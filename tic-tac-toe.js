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
  this.claim = function (space_id) {
    console.log('claimed: ', space_id)
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

  var player = 'player1'

  spaces.click(function (event) {
    event.preventDefault()

    game.claim($(this).attr('id'))
    $(this).addClass(player)
  })


})
