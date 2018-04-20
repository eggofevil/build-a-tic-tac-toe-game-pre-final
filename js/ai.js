function rule1 (currSymbol) {
    for (var i in lines) {
        if (lines[i].str() === currSymbol + currSymbol) return cells.indexOf(lines[i].emptyCells()[0]);
    }
    if (currSymbol === userSymbol) return undefined;
    return rule1(userSymbol);
}
function rule2 (currSymbol) {
    var potentialLines = [];
    var potentialTurns = [];
    for (var i in lines) {
        if (lines[i].str() === currSymbol) potentialLines.push(lines[i]);
    }
    if (potentialLines.lengh < 2) return undefined;
    for (var j in potentialLines) {
        potentialLines.splice(j, 1)[0].emptyCells().forEach(function (emptyCell) {
            for (var k in potentialLines) {
                if (potentialLines[k].emptyCells().indexOf(emptyCell) !== -1) {
                    if (potentialTurns.indexOf(emptyCell) === -1) {
                        potentialTurns.push(emptyCell);
                    }
                }
            }
        });
    }
    if (potentialTurns.length === 0) return undefined;
    return cells.indexOf(potentialTurns[Math.floor(Math.random() * potentialTurns.length)]);
}
function rule3 (currSymbol) {
    var potentialTurns = [];
    for (var i in lines) {
        if (lines[i].str() === currSymbol) {
            lines[i].emptyCells().forEach(function (emptyCell) {
               if (potentialTurns.indexOf(emptyCell) === -1) potentialTurns.push(emptyCell); 
            });
        }
    }
    if (potentialTurns.length === 0) return undefined;
    return cells.indexOf(potentialTurns[Math.floor(Math.random() * potentialTurns.length)]);
}
function previsionRule () {
    var potentialTurns = [];
    for (var i in cells) {
        cells[i].textContent = aiSymbol;
        if (pushUserSymbol()) potentialTurns.push(cells[i]);
        cells[i].textContent = '';
    }
    return cells.indexOf(potentialTurns[Math.floor(Math.random() * potentialTurns.length)]);
    
    function pushUserSymbol() {
        var userCell,
            result;
        for (var i in lines) {
            if (lines[i].str() === userSymbol + userSymbol) return false;
        }
        for (var i in lines) {
            if (lines[i].str() === aiSymbol + aiSymbol) {
                userCell = lines[i].emptyCells()[0];
                userCell.textContent = userSymbol;
                result = pushAiSymbol();
                userCell.textContent = '';
                return result;
            }
        }
        for (var i in cells) {
            if (cells[i].textContent === '') {
                cells[i].textContent = userSymbol;
                result = pushAiSymbol();
                cells[i].textContent = '';
                if (result === false) return false;
            }
        }
        return true;
    }
    
    function pushAiSymbol() {
        var aiCell,
            result;
        for (var i in lines) {
            if (lines[i].str() === aiSymbol + aiSymbol) return true;
        }
        for (var i in lines) {
            if (lines[i].str() === userSymbol + userSymbol) {
                aiCell = lines[i].emptyCells()[0];
                aiCell.textContent = aiSymbol;
                result = pushUserSymbol();
                aiCell.textContent = '';
                return result;
            }
        }
        return true;
    }
}
function aITryToWin() {
    var currIndex = rule1(symbol);
    if (!isNaN(currIndex)) return currIndex;
    currIndex = rule2(symbol);
    if (!isNaN(currIndex)) return currIndex;
    if (aiLvl === 'Hard') {
        currIndex = previsionRule();
        if (!isNaN(currIndex)) return currIndex;
    } else {
        currIndex = rule3(symbol);
        if (!isNaN(currIndex)) return currIndex;
        return cells.indexOf(cells[Math.floor(Math.random() * cells.length)]);
    }
}
