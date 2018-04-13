var onePlayerBtn = document.getElementById('onePlayerBtn');
var twoPlayersBtn = document.getElementById('twoPlayersBtn');
var startScr = document.getElementById('startScr');
var chooseSideScr = document.getElementById('chooseSideScr');
var backBtn = document.getElementById('backBtn');
var sideBtns = Array.prototype.slice.call(document.getElementsByClassName('sideBtns'));
var replayBtn = document.getElementById('replayBtn');
var startNewGameBtn = document.getElementById('startNewGameBtn');
var playingField = document.getElementById('playingField');
var endScr = document.getElementById('endScr');

var cells;
var symbol;
var index;
var aiTurn;
var aiSymbol;
var userSymbol;
var line1, line2, line3, line4, line5, line6, line7, line8;
var lines;

var logStr;

playingField.style.display = 'none';
replayBtn.style.display = 'none';
startNewGameBtn.style.display = 'none';

function returnToStart () {
    startScr.style.display = 'block';
    chooseSideScr.style.display = 'none';
    playingField.style.display = 'none';
    replayBtn.style.display = 'none';
    startNewGameBtn.style.display = 'none';
    endScr.style.display = 'none';
}

function initialize () {
    endScr.style.display = 'none';
    endScr.textContent = '';
    endScr.style.fontSize = '';
    endScr.style.color = '';
    endScr.style.paddingTop = '';
    endScr.style.textShadow = '';
    endScr.style.fontWeight = '';
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
        cell.addEventListener('click', turn);
    });
    symbol = 'X';
    index = 0;
    aiTurn = undefined;
    aiSymbol === 'X' ? aiTurn = true : aiSymbol === '0' ? aiTurn = false : void null;
    if(aiTurn) turn();
}

function checkStatus() {
    for (var i = 0; i < 8; i++) {
        if (lines[i].finished() !== false) {
            if (aiTurn !== undefined) {
                if (lines[i].finished() === aiSymbol + aiSymbol + aiSymbol) {
                    endScr.textContent = 'AI wins!';
                } else {
                    endScr.textContent = 'You win!';
                    endScr.style.color = 'orange';
                    endScr.style.paddingTop = '1vh';
                    endScr.style.fontSize = '4vh';
                    endScr.style.fontWeight = 'bold';
                    endScr.style.textShadow = '0.15vh 0.15vh #000000'
                    endScr.innerText += logStr;
                }
            } else {
                if (lines[i].finished() === 'XXX') {
                    endScr.textContent = 'X wins!';
                } else {
                    endScr.textContent = '0 wins!';
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
        if (aiTurn === false) aiTurn = true;
    }
    cells[index].textContent = symbol;
    cells[index].removeEventListener('click', turn);
        
    logStr += '\n' + symbol + ' to ' + cells[index].id;
    
    cells.splice(cells.indexOf(cells[index]), 1);
    if (checkStatus()) {
        endScr.style.display = 'block';
        return null;
    }
    symbol === 'X' ? symbol = '0' : symbol = 'X';
    if (aiTurn) turn();
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

onePlayerBtn.addEventListener('click', function () {
    startScr.style.display = 'none';
    chooseSideScr.style.display = 'block';
});

twoPlayersBtn.addEventListener('click', function () {
    startScr.style.display = 'none';
    playingField.style.display = '';
    startNewGameBtn.style.display = '';
    replayBtn.style.display = '';
    aiSymbol = undefined;
    initialize();
});
    
sideBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        playingField.style.display = 'inline-block';
        replayBtn.style.display = 'inline-block';
        startNewGameBtn.style.display = 'inline-block';
        userSymbol = btn.textContent;
        userSymbol === 'X' ? aiSymbol = '0' : aiSymbol = 'X';
        
        logStr = '\naiSymbol - ' + aiSymbol + ', userSymbol - ' + userSymbol; 
        
        aiSymbol === 'X' ? aiTurn = true : aiTurn = false;
        chooseSideScr.style.display = 'none';
        initialize();
    });
});

backBtn.addEventListener('click', returnToStart);

startNewGameBtn.addEventListener('click', returnToStart);

replayBtn.addEventListener('click', initialize);