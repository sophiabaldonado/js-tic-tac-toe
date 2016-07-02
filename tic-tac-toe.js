function TicTacToe(mode) {
  var thisGame = this
  this.mode = mode

  this.board = {
    1: 1, 2: 2, 3: 3,
    4: 4, 5: 5, 6: 6,
    7: 7, 8: 8, 9: 9
  }

  this.claimSpace = function (space_id) {
    if (this.mode === 1 && this.player() === 'player2') {

      function chooseId() {
        var c = Math.floor(Math.random() * 9) + 1
        console.log('c: ', c)
        console.log('won: ', thisGame.hasWon())
        if (typeof(thisGame.board[c]) === 'number') { return c }
        if (thisGame.hasWon()) { return }
        chooseId()
      }
      var compId = chooseId()
      console.log('compid: ', compId)
      this.board[compId] = this.player()
      if (this.hasWon()) {
        this.winner = this.player()
      }
      this.turn++

      return compId
    } else {


      if (this.hasWon()) {
        return false
      } else if (typeof(this.board[space_id]) !== 'number') {
        return false
      } else {
        this.board[space_id] = this.player()
        if (this.hasWon()) {
          this.winner = this.player()
        }
        this.turn++

        return true
      }
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
  player: function () {
    return this.turn % 2 === 0 ? 'player1' : 'player2'
  },
  winner: null,
  draw: function () {
    return this.turn >= 9
  }
}

// jQ
$(document).on('ready', function() {
  var game = newGame()
  var spaces = $('.space')
  var announce = $('#announce')
  setupDisplay()

  function newGame() {
    game = new TicTacToe(1)
    return game
  }

  function setupDisplay() {
    announce.text('Ready, Set, Go')
    $('.space').each(function() {
      if ($(this).hasClass('player1')) {
        $(this).removeClass('player1')
      }
      if ($(this).hasClass('player2')) {
        $(this).removeClass('player2')
      }
    })
    if (announce.hasClass('winner')) {
      announce.removeClass('winner')
    }
  }

  function name(player) {
    var name = player === 'player1' ? 'Blue' : 'Red'
    return name
  }

  score = {
    player1: 0,
    player2: 0
  }

  // claiming a space/play a turn
  spaces.click(function (event) {
    event.preventDefault()
    var id = $(this).attr('id')
    if (game.claimSpace(id)) {
      $(this).addClass(game.player())
      if (game.hasWon()) {
        announce.text(name(game.winner) + ' won!')
        announce.addClass('winner')
        score[game.winner]++
        $('#' + game.winner).text(score[game.winner])
      } else if (game.draw()) {
        announce.text("It's a draw!")
      } else {
        announce.text(name(game.player()) + "'s turn")
        if (game.mode === 1) {
          $('#' + game.claimSpace()).addClass(game.player())
        }
      }
    } else if (game.hasWon()){
      announce.text('The game has ended')
    } else {
      announce.text('That spot is already taken')
    }
    console.log(game.board)
  })

  // reset game
  $("#restart").click(function(event) {
    newGame()
    setupDisplay()
  })
})
