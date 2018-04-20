var onePlayerBtn = document.getElementById('onePlayerBtn');
var twoPlayersBtn = document.getElementById('twoPlayersBtn');
var startScr = document.getElementById('startScr');
var chooseSideScr = document.getElementById('chooseSideScr');
var backBtn = document.getElementById('backBtn');
var sideBtns = Array.prototype.slice.call(document.getElementsByClassName('sideBtn'));
var infoScr = document.getElementById('infoScr');
var turnInfoScr = document.getElementById('turnInfoScr');
var player1ScoreScr = document.getElementById('player1ScoreScr');
var player2ScoreScr = document.getElementById('player2ScoreScr');
var aiLvlScr = document.getElementById('aiLvlScr');
var aiLvlBtns = Array.prototype.slice.call(document.getElementsByClassName('aiLvlBtn'));
var replayBtn = document.getElementById('replayBtn');
var startNewGameBtn = document.getElementById('startNewGameBtn');
var playingField = document.getElementById('playingField');
var endScr = document.getElementById('endScr');
var footer = document.getElementById('footer');

var splashEls = Array.prototype.slice.call(document.getElementsByClassName('splashEl'));

var cells;
var symbol;
var index;
var aiTurn;
var aiSymbol;
var userSymbol;
var line1, line2, line3, line4, line5, line6, line7, line8;
var lines;
var player1Score;
var player2Score;
var aiLvl;

returnToStart();

function returnToStart() {
    startScr.style.display = '';
    endScr.style.display = 'none';
    chooseSideScr.style.display = 'none';
    playingField.style.display = 'none';
    infoScr.style.display = 'none';
    aiLvlScr.style.display = 'none';
    replayBtn.style.display = 'none';
    startNewGameBtn.style.display = 'none';
    footer.style.display = 'none';
    aiLvl = undefined;
}
function setAiLvl() {
    aiLvl = this.innerText;
    aiLvlBtns.forEach(function (btn) {
        btn.innerText === aiLvl ? btn.style.color = '#e8e8e8' : btn.style.color = '';
    });
}
function gameInitialize () {
    if (aiSymbol !== undefined) {
        player1ScoreScr.innerText = 'Player\nscore:\n0';
        player2ScoreScr.innerText = 'AI\nscore:\n0';
        aiLvl = 'Easy';
        aiLvlBtns.forEach(function (btn) {
            btn.innerText === aiLvl ? btn.style.color = '#e8e8e8' : btn.style.color = '';
        });
    } else {
        player1ScoreScr.innerText = 'Player X\nscore:\n0';
        player2ScoreScr.innerText = 'Player 0\nscore:\n0';
    }
    player1Score = 0;
    player2Score = 0;
    roundInitialize();
}

function roundInitialize () {
    endScr.style.display = 'none';
    cells = Array.prototype.slice.call(document.getElementsByClassName('cell'));
    line1 = new Line (cells[0], cells[1], cells[2]);
    line2 = new Line (cells[3], cells[4], cells[5]);
    line3 = new Line (cells[6], cells[7], cells[8]);
    line4 = new Line (cells[0], cells[3], cells[6]);
    line5 = new Line (cells[1], cells[4], cells[7]);
    line6 = new Line (cells[2], cells[5], cells[8]);
    line7 = new Line (cells[0], cells[4], cells[8]);
    line8 = new Line (cells[2], cells[4], cells[6]);
    lines = [line1, line2, line3, line4, line5, line6, line7, line8];
    cells.forEach(function (cell) {
        cell.style.background = 'none';
        cell.textContent = '';
    });
    symbol = 'X';
    index = 0;
    aiTurn = undefined;
    if (aiSymbol === 'X') {
        aiTurn = true;
        turnInfoScr.innerText = 'It\'s\nAI\nturn';
        turn();
        return null;
    }
    if (aiSymbol === '0') {
        aiTurn = false;
        turnInfoScr.innerText = 'It\'s\nyour\nturn';
    } else {
        turnInfoScr.innerText = '\nX turn';
    }
    cells.forEach(function (cell) {
        cell.addEventListener('click', turn);   
    });
}

function checkStatus() {
    for (var i = 0; i < 8; i++) {
        if (lines[i].finished() !== false) {
            if (aiTurn !== undefined) {
                if (lines[i].finished() === aiSymbol + aiSymbol + aiSymbol) {
                    endScr.textContent = 'AI wins!';
                    player2Score++;
                    player2ScoreScr.innerText = 'AI\nscore:\n' + player2Score;
                } else {
                    endScr.textContent = 'You win!';
                    player1Score++;
                    player1ScoreScr.innerText = 'Player\nscore:\n' + player1Score;
                }
            } else {
                if (lines[i].finished() === 'XXX') {
                    endScr.textContent = 'X wins!';
                    player1Score++;
                    player1ScoreScr.innerText = 'Player X\nscore:\n' + player1Score;
                } else {
                    endScr.textContent = '0 wins!';
                    player2Score++;
                    player2ScoreScr.innerText = 'Player 0\nscore:\n' + player2Score;
                }
            }
            return true;   
        }
    }
    if (cells.length === 0) {
        endScr.textContent = 'It\'s a draw!';
        return true;
    }
}

function turn () {
    if (aiTurn) {
        index = aITryToWin();
        aiTurn = false;
    } else {
        index = cells.indexOf(this);
        if (aiTurn === false) {
            cells.forEach(function (cell) {
                cell.removeEventListener('click', turn);
            });
            aiTurn = true;   
        }
    }
    cells[index].textContent = symbol;
    cells[index].removeEventListener('click', turn);
    cells.splice(cells.indexOf(cells[index]), 1);
    if (checkStatus()) {
        roundEnd();
        return null;
    }
    symbol === 'X' ? symbol = '0' : symbol = 'X';
    if (aiTurn === undefined) {
        turnInfoScr.innerText = '\n' + symbol + ' turn';
    } else if (!aiTurn) {
        turnInfoScr.innerText = 'It\'s\nyour\nturn';
        cells.forEach(function (cell) {
            cell.addEventListener('click', turn); 
        });
    } else {
        turnInfoScr.innerText = 'It\'s\nAI\nturn';
        turn();
    }
}

function Line (cell1, cell2, cell3) {
    this.cells = [cell1, cell2, cell3];
    this.emptyCells = function () {
        var emptyCells = [];
        this.cells.forEach (function (cell) {
           if (cell.textContent === '') emptyCells.push(cell); 
        });
        return emptyCells;
    }
    this.str = function () {
        var str = '';
        this.cells.forEach (function (cell) {
            str += cell.textContent;
        });
        return str;
    }
    this.finished = function () {
        if (this.str() === 'XXX' || this.str() === '000') {
            this.cells.forEach(function (cell) {
               cell.style.background = '#7f7f7f';
            });
            return this.str();
        }
        return false;
    }
}

function roundEnd() {
    endScr.style.display = 'block';
}

onePlayerBtn.addEventListener('click', function () {
    startScr.style.display = 'none';
    chooseSideScr.style.display = '';
    footer.style.display = '';
});

twoPlayersBtn.addEventListener('click', function () {
    startScr.style.display = 'none';
    infoScr.style.display = '';
    playingField.style.display = '';
    replayBtn.style.display = '';
    startNewGameBtn.style.display = '';
    footer.style.display = '';
    aiSymbol = undefined;
    gameInitialize();
});
    
sideBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        chooseSideScr.style.display = 'none';
        infoScr.style.display = '';
        aiLvlScr.style.display = '';
        playingField.style.display = '';
        replayBtn.style.display = '';
        startNewGameBtn.style.display = '';
        userSymbol = btn.textContent;
        userSymbol === 'X' ? aiSymbol = '0' : aiSymbol = 'X';
        aiSymbol === 'X' ? aiTurn = true : aiTurn = false;
        gameInitialize();
    });
});
backBtn.addEventListener('click', returnToStart);
aiLvlBtns.forEach(function (btn) {
    btn.addEventListener('click', setAiLvl);
});
startNewGameBtn.addEventListener('click', returnToStart)
replayBtn.addEventListener('click', function () {
    roundInitialize();
});