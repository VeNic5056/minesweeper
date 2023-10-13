const word: HTMLSpanElement = document.querySelector('#word');
const statusSpan: HTMLParagraphElement = document.querySelector('#status');
const inputBox: HTMLInputElement = document.querySelector('#input');


const words: string[] = [
    '감자를 찌는 방법에는 크게 세가지의 방법이 있다.',
    '가는 날이 장날이다',
    '가는 말이 고와야 오는 말이 곱다',
    '가랑비에 옷 젖는 줄 모른다',
    '가랑잎이 솔잎더러 바스락거린다고 한다',
    '가재는 게 편이라',
    '가지 많은 나무에 바람 잘 날 없다',
    '간에 가 붙고 쓸개에 가 붙는다',
    '간에 기별도 안 간다',
    '간이 콩알만 해지다',
    '갈수록 태산',
    '같은 값이면 다홍치마',
    '개구리 올챙이 적 생각을 못 한다',
    '개천에서 용 난다',
    '고래 싸움에 새우 등 터진다',
    '고양이 목에 방울 달기',
    '공든 탑 무너지랴',
    '구더기 무서워 장 못 담글까',
    '구슬이 서 말이라도 꿰어야 보배라',
    '귀에 걸면 귀걸이, 코에 걸면 코걸이',
    '까마귀 날자 배 떨어진다',
    '남의 잔치에 감 놓아라 배 놓아라 한다',
    '나랏말ᄊᆞ미듕귁에달아문ᄍᆞᆼ와로서르ᄉᆞᄆᆞᆺ디아니ᄒᆞᆯᄊᆡ',
    '이런젼ᄎᆞ로어린ᄇᆡᆨ셔ᇰ이르고져호ᇙ배이셔도',
    'ᄆᆞᄎᆞᆷ내져ᄠᅳ들시러펴디몯ᄒᆞᆯ노미하니리라',
    '낮말은 새가 듣고 밤말은 쥐가 듣는다',
    '늦게 배운 도둑이 날 새는 줄 모른다',
    '닭 잡아먹고 오리발 내민다',
    '돌다리도 두들겨 보고 건너라',
    '똥 묻은 개가 겨 묻은 개 나무란다',
    '말 한마디에 천 냥 빚도 갚는다',
    '목구멍이 포도청',
    '못된 송아지 엉덩이에 뿔 난다',
    '바늘 도둑이 소 도둑 된다',
    '백지장도 맞들면 낫다',
    '노영필아미타여래구존도및고려태조담무갈보살예배도'
];

type Status = {
    score: number,
    fail: number,
    success: number
}

let now: number = 0;
let nowWord: string = words[0]
let userJSON: Status  = {
    score: 0,
    fail: 0,
    success: 0
}

nowWord = words[Math.floor(Math.random() * words.length)];
word.innerHTML = nowWord;

inputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        if(entered(nowWord, inputBox.value)) {
            userJSON.score += 500;
            userJSON.success += 1;
        } else {
            userJSON.fail += 1;
        }
        
        statusSpan.innerHTML = `${userJSON.score}점 (정확 ${userJSON.success}개 | 오타 ${userJSON.fail}개) `;
        inputBox.value = '';
        nowWord = words[Math.floor(Math.random() * words.length)];
        word.innerHTML = nowWord;
    }
});



/**
 * 
 * @param 제시어 주어진 문장 넣는데
 * @param 입력한거 유저가 입력한거 넣는데
 * @returns 제시어랑 입력한거 같은지 확인하는거
 */
function entered(제시어: string, 입력한거: string): boolean {
    if(제시어 === 입력한거) {
        return true;
    } else {
        return false;
    }
}