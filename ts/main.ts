let gameOver: boolean = false;
let cells: [boolean?][] = [];
let cellsInfo: [[number, boolean]?][] = [];
let mineCount: number = 0;

function startGame() {
    gameOver = false;

    console.log('asdf');

    document.querySelector('#gatsu').classList.add('resetInit');

    setTimeout(() => {
        document.querySelector('#gatsu').classList.add('reset');
    }, 30);

    setTimeout(() => {
        document.querySelector('#gatsu').classList.remove('resetInit');
        document.querySelector('#gatsu').classList.remove('reset');
    }, 1500);

    generateBoard();
    started();
    information();
}


const getCell = myLocation => {
    try {
        return cellsInfo[Math.floor(myLocation / 10)][myLocation % 10]
    } catch {
        return [null, null]
    }
}

function generateBoard(): void {
    const boardDiv: HTMLDivElement = document.querySelector('#board');
    mineCount = 0;
    boardDiv.innerHTML='';
    // boardDiv.removeChild(boardDiv);/

    for (let i = 0; i < 10; i++) {
        cells.push([]);
        cellsInfo.push([]);
        for (let j = 0; j < 10; j++) {
            let board: HTMLDivElement = document.createElement('div');
            board.className = `id-${i * 10 + j} r${j} off`;
            // board.oncontextmenu = setFlag(this);

            // cells[i].push(plantMines(board)) [0, false]
            cellsInfo[i].push(plantMines(board))

            boardDiv.appendChild(board);
        }
    }
}

function plantMines(e: HTMLDivElement): [number, boolean] {
// boardDiv.childNodes.forEach((e: HTMLDivElement) => {
    let isMine: number = Math.random();
    let doc: HTMLInputElement = document.querySelector('#difficulty');
    let 확률: number = Number(doc.value);
    const myLocation = Number(e.className.split(' ')[0].split('-')[1]);

    if (isMine <= 확률 / 100) {
        e.className += ' mine';
        mineCount += 1;

        document.querySelector('#gatsu').innerHTML = mineCount.toString();
        return [-1, true];
    } else {
        return [0, false];
    }
    // })
}

function information(): void {
    const boardDiv: HTMLDivElement = document.querySelector('#board');

    boardDiv.childNodes.forEach((e: HTMLDivElement) => {
        for (let i = 0; i < 2; i++) {
            const myLocation = Number(e.className.split(' ')[0].split('-')[1]);
            // console.log(myLocation);

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

            // console.log(checking);
            // e.innerHTML = num.toString();
            // console.log(myLocation / 10, myLocation % 10);
            cellsInfo[Math.floor(myLocation / 10)][myLocation % 10][0] = num

        }
    })
}

function started(): void {
    const boardDiv: HTMLDivElement = document.querySelector('#board');
    boardDiv.childNodes.forEach((e: HTMLDivElement) => {
        e.addEventListener('contextmenu', (event) => {
            if(!gameOver) {
                event.preventDefault();
                const myLocation = Number(e.className.split(' ')[0].split('-')[1]);
                const myLocationDiv = document.querySelector(`.id-${myLocation}`).classList;

                if (!myLocationDiv.contains('flag')){
                    document.querySelector(`.id-${myLocation}`).className += ' flag';
                    mineCount -= 1;
                } else {
                    document.querySelector(`.id-${myLocation}`).classList.remove('flag');
                    mineCount += 1;
                }
                document.querySelector('#gatsu').innerHTML = mineCount.toString();


                let isClear: boolean = true;
                document.querySelectorAll('.mine').forEach((e) => {
                    isClear = isClear ? e.classList.contains('flag') : false;
                });

                console.log(isClear);

                if (isClear && document.querySelectorAll('.flag').length === document.querySelectorAll('.mine').length) {
                    alert('클리어!');
                    enteredMine();
                }
            }
        })

        e.addEventListener('click', (event) => {
            if (!gameOver) {
                if (e.className.indexOf('mine') != -1) {
                    alert("게임 오버ㅋ")
                    enteredMine();

                } else {
                    const textColor = ['blue', 'green', 'red', 'darkblue', 'brown', 'rgb(0, 160, 152)', 'black', 'white']
                    const classes: string = e.className;
                    const myLocation = Number(e.className.split(' ')[0].split('-')[1]);

                    cellsInfo[Math.floor(myLocation / 10)][myLocation % 10][1] = true;
                    e.innerHTML = cellsInfo[Math.floor(myLocation / 10)][myLocation % 10][0].toFixed();
                    e.style.color = textColor[Number(getCell(myLocation)[0])-1]
                    findZero(myLocation);
                    // console.log(classes);

                }
            }
        })

    })
}

function findZero(startLocation: number) {
    const boardDiv: HTMLDivElement = document.querySelector('#board');
    const myLocation = Number(boardDiv.className.split(' ')[0].split('-')[1]);
    let goContinue: boolean = false;
    let loop: number = 0;

    let checking = [
        startLocation % 10 == 0 ? null : startLocation - 11,
        startLocation - 10,
        startLocation % 10 == 9 ? null : startLocation - 9,
        startLocation % 10 == 0 ? null : startLocation - 1,
        startLocation % 10 == 9 ? null : startLocation + 1,
        startLocation % 10 == 0 ? null : startLocation + 9,
        startLocation + 10,
        startLocation % 10 == 9 ? null : startLocation + 11
    ];

    if(getCell(startLocation)[0] === 0 && getCell(startLocation)[1] == true) {
        checking.forEach((e: number) => {
            if(getCell(e)[0] === 0) {
                // console.log(`id-${e}`);
                // console.log(document.querySelector(`id-${e}`));
                document.querySelector(`.id-${e}`).innerHTML = getCell(e)[0]?.toFixed();
                goContinue = true;
            }
        })
    }
}

function enteredMine() {
    gameOver = true;

    for(let i = 0; i < 100; i++) {
        // console.log(i);
        const e: HTMLDivElement = document.querySelector(`.id-${i}`);
        e.classList.add('end');
        if (!e.classList.contains('mine')) {
            e.innerHTML = getCell(i)[0].toString()

            const textColor = ['blue', 'green', 'red', 'darkblue', 'brown', 'rgb(0, 160, 152)', 'black', 'white']
            e.innerHTML = cellsInfo[Math.floor(i / 10)][i % 10][0].toFixed();
            e.style.color = textColor[Number(getCell(i)[0])-1]
        }
    }
}

/*
for (let i = 0; i < cells.length * cells[1].length; i++) {
            boardDiv.childNodes.forEach((e: HTMLDivElement) => {
            const myLocation = Number(e.className.split(' ')[0].split('-')[1]);
            
            if (getCell(myLocation)[0] == 0 && getCell(myLocation)[1] == true) {
                let checking = [
                    myLocation % 10 == 0 ? null : myLocation - 11,
                    myLocation - 10,
                    myLocation % 10 == 9 ? null : myLocation - 9,
                    myLocation % 10 == 0 ? null : myLocation - 1,
                    myLocation % 10 == 9 ? null : myLocation + 1,
                    myLocation % 10 == 0 ? null : myLocation + 9,
                    myLocation + 10,
                    myLocation % 10 == 9 ? null : myLocation + 11
                ];
                console.log(checking);
                checking.forEach((e) => {
                    if(getCell(e) !== null) {
                        if(getCell(e)[0] == 0 && getCell(e)[1] == false) {
                            getCell(e)[1] = true;
                            console.log(`.id-${e}`);
                            document.querySelector(`.id-${e}`).innerHTML = getCell(e)[0].toFixed();
                        }
                    }
                })
            }
        })
        
    } */
