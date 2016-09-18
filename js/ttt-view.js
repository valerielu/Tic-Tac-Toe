var View = function (game, $el) {
  this.game = game;
  this.$el = $el;
  $el.append(this.setupBoard());
  this.bindEvents();
};

View.prototype.bindEvents = function () {
  $('li').click((event) => {
    let $square = $(event.currentTarget);
    console.log($square.data('pos'));
    if ($square.attr('class') === 'selected-move') {
      alert("Invalid move");
      return;
    }

    this.makeMove($square);

    if (this.game.winner()) {
      console.log("GAME WIN");
      let $msg = $(`<h1>You win, ${this.game.winner()}!</h1>`);
      this.$el.append($msg);
      $('li').each((idx, el) => {
        $(el).off("click");
        if ($(el).text() === this.game.winner()) {
          $(el).removeClass('selected-move');
          $(el).addClass('green');
        }
        else {
          $(el).addClass('selected-move');
          $(el).addClass('red');
        }
      });
    }
  });
};

View.prototype.makeMove = function ($square) {
  let currPlayer = this.game.currentPlayer;
  this.game.playMove($square.data('pos'));
  $square.text(currPlayer);
  $square.removeClass('hovered-over');
  $square.addClass('selected-move');
};

View.prototype.setupBoard = function () {
  const $grid = $('<ul></ul>');


  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let $li = $('<li></li>');

      $li.data('pos', [i, j]);

      $li.on("mouseover", (event) => {
        let $square = $(event.currentTarget);
        if ($square.attr('class')) {
          return;
        }
        $square.addClass('hovered-over');
      });

      $li.on("mouseout", (event) => {
        let $square = $(event.currentTarget);
        $square.removeClass('hovered-over');
      });

      $grid.append($li);
    }
  }
  return $grid;
};

module.exports = View;
