let gameOver: boolean = false;
let cells: [boolean?][] = [];
let cellsInfo: [number?][] = [];

function startGame() {
    generateBoard();
    started();
    information();
}

function generateBoard() {
    const boardDiv: HTMLDivElement = document.querySelector('#board');
    boardDiv.innerHTML='';
    // boardDiv.removeChild(boardDiv);/

    for (let i = 0; i < 10; i++) {
        cells.push([]);
        cellsInfo.push([]);
        for (let j = 0; j < 10; j++) {
            let board: HTMLDivElement = document.createElement('div');
            board.className = `id-${i * 10 + j} r${j} off`;
            
            cells[i].push(plantMines(board))
            cellsInfo[i].push(0)

            boardDiv.appendChild(board);
        }
    }
}

function plantMines(e: HTMLDivElement): boolean {
    // boardDiv.childNodes.forEach((e: HTMLDivElement) => {
        let isMine: number = Math.random();
        
        if (isMine <= 0.15) {
            e.className += ' mine';
            return true;
        } else {
            return false;
        }
        // })
    }
    

function information() {
    const boardDiv: HTMLDivElement = document.querySelector('#board');
    
    boardDiv.childNodes.forEach((e: HTMLDivElement) => {
        for (let i = 0; i < 2; i++) {
            const myLocation = Number(e.className.split(' ')[0].split('-')[1]);
            console.log(myLocation);

            let num = 0;
            let checking = [
                myLocation % 10 == 0 ? null : document.querySelector(`.id-${myLocation - 11}`),
                document.querySelector(`.id-${myLocation - 10}`),
                myLocation % 10 == 9 ? null : document.querySelector(`.id-${myLocation - 9}`),
                myLocation % 10 == 0 ? null : document.querySelector(`.id-${myLocation - 1}`),
                myLocation % 10 == 9 ? null : document.querySelector(`.id-${myLocation + 1}`),
                myLocation % 10 == 0 ? null : document.querySelector(`.id-${myLocation + 9}`),
                document.querySelector(`.id-${myLocation + 10}`),
                myLocation % 10 == 9 ? null : document.querySelector(`.id-${myLocation + 11}`)
            ];

            checking.forEach((e: null | HTMLDivElement) => {
                if (e && e?.className.indexOf('mine') != -1) {
                    num += 1
                }
            })

            console.log(checking);
            // e.innerHTML = num.toString();
            console.log(myLocation / 10, myLocation % 10);
            cellsInfo[Math.floor(myLocation / 10)][myLocation % 10] = num
            
        }
    })
}
    
function started() {
    const boardDiv: HTMLDivElement = document.querySelector('#board');
    boardDiv.childNodes.forEach((e: HTMLDivElement) => {
        e.addEventListener('click', () => {
            const classes: string = e.className;
            const myLocation = Number(e.className.split(' ')[0].split('-')[1]);

            e.innerHTML = cellsInfo[Math.floor(myLocation / 10)][myLocation % 10].toString();
            console.log(classes);
            // if (e.className.indexOf('mine') != -1) {
            //     enteredMine();
            //     alert("게임 오버ㅋ")
            // } 
        })
    })
}

function findZero() {
    /* 언젠가 쓰겠지~ */
}

function enteredMine() {
    gameOver = true;
}
