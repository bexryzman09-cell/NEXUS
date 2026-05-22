import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type Lang = 'ru' | 'uz' | 'en';
type Theme = 'red' | 'blue';

interface ProjectData {
    id: string;
    title: string;
    icon: string;
    desc: string;
    html: string;
    htmlExp: string;
    css: string;
    cssExp: string;
    js: string;
    jsExp: string;
}

interface LocalizationContent {
    themeBtn: string;
    copyText: string;
    copiedText: string;
    vsTitle: string;
    vsDesc: string;
    projects: ProjectData[];
}

const localization: Record<Lang, LocalizationContent> = {
    ru: {
        themeBtn: "СМЕНИТЬ ТЕМУ",
        copyText: "📋 Копировать весь код",
        copiedText: "✅ Скопировано в буфер!",
        vsTitle: "🚀 Как запустить этот код на компьютере? (Инструкция)",
        vsDesc: "1. <b>Создайте файлы:</b> Создайте на компьютере пустую папку. Откройте её в VS Code и создайте три файла с точными названиями: <code>index.html</code>, <code>style.css</code> и <code>script.js</code>.<br>2. <b>Магия быстрого старта (Shift + 1):</b> Откройте пустой файл <code>index.html</code>, зажмите клавиши <kbd>Shift</kbd> + <kbd>1</kbd> (чтобы получился восклицательный знак <b>!</b>) и нажмите <kbd>Enter</kbd>. Программа сама создаст стандартный готовый шаблон HTML-страницы!<br>3. <b>Куда вставлять код?</b> Код из блока <b>index.html</b> ниже скопируйте и вставьте строго <u>внутрь</u> созданного тега <code>&lt;body&gt; ваш код &lt;/body&gt;</code>.<br>4. <b>Свяжите файлы вместе:</b> Чтобы файлы начали общаться, внутри <code>index.html</code> (в блоке <code>&lt;head&gt;</code>) добавьте строчку: <code>&lt;link rel='stylesheet' href='style.css'&gt;</code>. А в самый низ тега <code>&lt;body&gt;</code> добавьте строчку: <code>&lt;script src='script.js'&gt;&lt;/script&gt;</code>.",
        projects: [
            {
                id: "calc",
                title: "Калькулятор",
                icon: "🧮",
                desc: "Умный калькулятор, который умеет считать любые математические примеры.",
                html: `<div class="calc-container">\n  <input type="text" id="display" readonly placeholder="0">\n  <div class="buttons-grid">\n    <button onclick="clearDisplay()" class="action-btn">C</button>\n    <button onclick="insert('/')">/</button>\n    <button onclick="insert('*')">*</button>\n    <button onclick="insert('-')">-</button>\n    <button onclick="insert('7')">7</button>\n    <button onclick="insert('8')">8</button>\n    <button onclick="insert('9')">9</button>\n    <button onclick="insert('+')">+</button>\n    <button onclick="insert('4')">4</button>\n    <button onclick="insert('5')">5</button>\n    <button onclick="insert('6')">6</button>\n    <button onclick="calculate()" class="equal-btn">=</button>\n    <button onclick="insert('1')">1</button>\n    <button onclick="insert('2')">2</button>\n    <button onclick="insert('3')">3</button>\n    <button onclick="insert('0')">0</button>\n  </div>\n</div>`,
                htmlExp: "<strong>Простым языком об HTML:</strong><br>Это скелет нашего калькулятора. Тег <code>&lt;input&gt;</code> создает окошко-экран, где будут видны цифры. Мы дали ему имя <code>id='display'</code>, чтобы JavaScript мог его найти. Каждая кнопка <code>&lt;button&gt;</code> имеет команду <code>onclick</code> — это значит: 'При клике мышкой включи нужную команду в JavaScript'.",
                css: `body { background: #0b0f19; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }\n.calc-container { background: #151d30; padding: 20px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.4); width: 300px; box-sizing: border-box; }\n#display { width: 100%; height: 50px; font-size: 24px; text-align: right; margin-bottom: 15px; padding: 5px 10px; background: #090d16; color: #fff; border: 1px solid #222; border-radius: 6px; box-sizing: border-box; }\n.buttons-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }\nbutton { padding: 18px; font-size: 18px; color: #fff; background: #202b42; border: none; border-radius: 6px; cursor: pointer; }\nbutton:hover { background: #2a3b5c; }\n.action-btn { background: #ff3344; }\n.equal-btn { background: #0077ff; grid-row: span 2; height: 100%; }`,
                cssExp: "<strong>Простым языком о CSS:</strong><br>Это внешний вид и красота калькулятора. Свойство <code>display: grid</code> берет наши кнопки и автоматически выстраивает их в красивую сетку из 4 колонок (команда <code>repeat(4, 1fr)</code>). Команда <code>button:hover</code> делает так, чтобы кнопка плавно меняла цвет, когда мы наводим на нее курсор мышки.",
                js: `const display = document.getElementById('display');\n\nfunction insert(val) { \n  display.value += val; \n}\n\nfunction clearDisplay() { \n  display.value = ''; \n}\n\nfunction calculate() {\n  try {\n    if (display.value) display.value = eval(display.value);\n  } catch (error) {\n    display.value = 'Ошибка';\n  }\n}`,
                jsExp: "<strong>Простым языком о JavaScript:</strong><br>Это мозг калькулятора. Строка <code>getElementById('display')</code> находит наш экран из HTML. Функция <code>insert(val)</code> дописывает цифры на экран друг за другом. Функция <code>clearDisplay()</code> очищает экран (делает его пустым <code>''</code>). А главная магия происходит в команде <code>eval()</code> — она берет всё, что написано на экране (например, текст '5+5*2'), и мгновенно считает правильный математический ответ."
            },
            {
                id: "tictac",
                title: "Крестики-Нолики",
                icon: "❌",
                desc: "Игра для двоих на одном экране с автоматическим определением победителя.",
                html: `<div class="game-wrapper">\n  <h2 id="status">Ходит: X</h2>\n  <div class="board" id="board"></div>\n  <button onclick="resetGame()" style="margin-top:20px; padding: 10px 20px; cursor:pointer;">Перезапуск</button>\n</div>`,
                htmlExp: "<strong>Простым языком об HTML:</strong><br>Тег <code>h2</code> с именем <code>id='status'</code> — это текстовая строка сверху, которая говорит, чья сейчас очередь ходить или кто выиграл. Блок <code>div id='board'</code> — это пустое место, коробка, в которую JavaScript сам добавит 9 игровых клеток.",
                css: `body { background: #0d0f14; color: #fff; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: sans-serif; }\n.game-wrapper { text-align: center; }\n.board { display: grid; grid-template-columns: repeat(3, 100px); gap: 6px; margin-top: 20px; }\n.cell { width: 100px; height: 100px; background: #161920; border: 1px solid #333; display: flex; justify-content: center; align-items: center; font-size: 36px; font-weight: bold; cursor: pointer; }\n.cell:hover { background: #222733; }`,
                cssExp: "<strong>Простым языком о CSS:</strong><br>Мы превращаем пустую коробку поля в идеальный квадрат. Свойство <code>grid-template-columns: repeat(3, 100px)</code> говорит: 'Сделай 3航колонки, каждая ровно по 100 пикселей'. В итоге получается ровное поле 3 на 3 клетки. Свойство <code>cursor: pointer</code> меняет мышку на палец, показывая, что на клетку можно нажать.",
                js: `const board = document.getElementById('board');\nconst statusText = document.getElementById('status');\nlet currentPlayer = 'X';\nlet gameActive = true;\nlet gameState = ["", "", "", "", "", "", "", "", ""];\nconst winningConditions = [\n  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]\n];\nfunction createBoard() {\n  board.innerHTML = '';\n  for(let i=0; i<9; i++) {\n    const cell = document.createElement('div');\n    cell.className = 'cell';\n    cell.addEventListener('click', () => handleCellClick(cell, i));\n    board.appendChild(cell);\n  }\n}\nfunction handleCellClick(cell, index) {\n  if(gameState[index] !== "" || !gameActive) return;\n  gameState[index] = currentPlayer;\n  cell.innerText = currentPlayer;\n  checkResult();\n}\nfunction checkResult() {\n  let roundWon = false;\n  for(let i=0; i<winningConditions.length; i++) {\n    const [a, b, c] = winningConditions[i];\n    if(gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) { roundWon = true; break; }\n  }\n  if(roundWon) { statusText.innerText = 'Победил: ' + currentPlayer; gameActive = false; return; }\n  if(!gameState.includes(\"\")) { statusText.innerText = 'Ничья!'; gameActive = false; return; }\n  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';\n  statusText.innerText = 'Ходит: ' + currentPlayer;\n}\nfunction resetGame() { currentPlayer = 'X'; gameActive = true; gameState = [\"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\"]; statusText.innerText = 'Ходит: X'; createBoard(); }\ncreateBoard();`,
                jsExp: "<strong>Простым языком о JavaScript:</strong><br>В массиве <code>winningConditions</code> записаны все выигрышные линии (три в ряд по горизонтали, вертикали и диагонали). Функция <code>createBoard()</code> через цикл <code>for</code> создает 9 клеток. Когда вы жмете на клетку, JS проверяет: если она пустая, он ставит туда ваш символ (X или O), меняет игрока и проверяет по линиям, не победил ли кто-то."
            },
            {
                id: "timer",
                title: "Таймер / Секундомер",
                icon: "⏱️",
                desc: "Точный секундомер, считающий минуты и секунды.",
                html: `<div class="stopwatch">\n  <div id="time-display">00:00</div>\n  <div class="controls-row">\n    <button onclick="startTimer()">Старт</button>\n    <button onclick="pauseTimer()">Пауза</button>\n    <button onclick="resetTimer()">Сброс</button>\n  </div>\n</div>`,
                htmlExp: "<strong>Простым языком об HTML:</strong><br>Тут всего два элемента: большой блок <code>div id='time-display'</code>, внутри которого будут тикать цифры времени, и три кнопки под ним, которые запускают разные функции в файле скрипта.",
                css: `body { background: #0a0514; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }\n.stopwatch { text-align: center; color: #fff; }\n#time-display { font-size: 70px; font-family: monospace; margin-bottom: 20px; text-shadow: 0 0 10px #0077ff; }\n.controls-row button { margin: 5px; padding: 10px 25px; font-weight: bold; cursor: pointer; }`,
                cssExp: "<strong>Простым языком о CSS:</strong><br>Чтобы цифры выглядели футуристично, мы увеличили размер шрифта до огромных 70 пикселей (<code>font-size: 70px</code>) и добавили неоновое свечение синего цвета командой <code>text-shadow</code>. Шрифт <code>monospace</code> крайне важен: он делает все цифры одинаковыми по ширине, чтобы текст не прыгал, когда цифра 1 меняется на цифру 0.",
                js: `let sec = 0, timerInterval;\nfunction startTimer() {\n  if(!timerInterval) {\n    timerInterval = setInterval(() => {\n      sec++;\n      let m = Math.floor(sec/60).toString().padStart(2, '0');\n      let s = (sec%60).toString().padStart(2, '0');\n      document.getElementById('time-display').innerText = m + ':' + s;\n    }, 1000);\n  }\n}\nfunction pauseTimer() { clearInterval(timerInterval); timerInterval = null; }\nfunction resetTimer() { pauseTimer(); sec = 0; document.getElementById('time-display').innerText = '00:00'; }`,
                jsExp: "<strong>Простым языком о JavaScript:</strong><br>Главный инструмент здесь — встроенный таймер <code>setInterval(..., 1000)</code>. Он заставляет код внутри себя работать циклично, строго раз в одну секунду (1000 миллисекунд). Каждую секунду переменная <code>sec</code> увеличивается на 1. Математика <code>sec/60</code> высчитывает минуты, а <code>sec%60</code> (остаток от деления) находит секунды."
            },
            {
                id: "step",
                title: "Шагомер",
                icon: "👟",
                desc: "Простой симулятор фитнес-трекера шагов.",
                html: `<div class="pedometer-box">\n  <h3>Виртуальный трекер</h3>\n  <div class="stat-num" id="step-count">0</div>\n  <p>Пройдено шагов</p>\n  <button onclick="simulateStep()">Сделать шаг</button>\n</div>`,
                htmlExp: "<strong>Простым языком об HTML:</strong><br>Текстовый блок <code>id='step-count'</code> хранит в себе цифру 0. Кнопка снизу при клике активирует функцию шага в коде.",
                css: `body { background: #0c110a; display: flex; justify-content: center; align-items: center; height: 100vh; margin:0; color: #fff; font-family: sans-serif; }\n.pedometer-box { border: 2px solid #55aa55; padding: 30px; border-radius: 15px; text-align: center; }\n.stat-num { font-size: 60px; color: #55aa55; font-weight: bold; margin: 15px 0; }\nbutton { padding: 10px 20px; font-size: 16px; cursor: pointer; border-radius: 6px; border: none; background: #55aa55; color: white; }`,
                cssExp: "<strong>Простым языком о CSS:</strong><br>Мы создаем рамку зеленого цвета (<code>border: 2px solid #55aa55</code>) вокруг нашего трекера, делая его похожим на экран спортивного браслета. Делаем текст по центру с помощью <code>text-align: center</code>.",
                js: `let steps = 0;\nfunction simulateStep() {\n  steps++;\n  document.getElementById('step-count').innerText = steps;\n}`,
                jsExp: "<strong>Простым языком о JavaScript:</strong><br>Супер-простая логика, идеальная для первого урока! У нас есть коробка-переменная <code>steps</code>, где изначально лежит ноль. Функция <code>simulateStep()</code> при каждом вызове прибавляет к этому числу единицу (команда <code>steps++</code>), а затем находит текст на экране и заменяет старую цифру на новую."
            },
            {
                id: "tetris",
                title: "Тетрис",
                icon: "🕹️",
                desc: "Отрисовка первой фигуры легендарной игры на холсте HTML5.",
                html: `<div style="text-align:center; color:#fff;">\n  <h3>TETRIS MINI</h3>\n  <canvas id="tetris" width="240" height="400" style="background:#000; border:2px solid #333;"></canvas>\n</div>`,
                htmlExp: "<strong>Простым языком об HTML:</strong><br>Здесь используется специальный продвинутый тег <code>&lt;canvas&gt;</code> (переводится как 'холст'). Это пустая белая доска для рисования, на которой с помощью JavaScript можно рисовать фигуры, линии и делать полноценные игры.",
                css: `body { background: #111; display: flex; justify-content: center; margin: 0; padding-top: 50px; font-family: sans-serif; }`,
                cssExp: "<strong>Простым языком о CSS:</strong><br>Здесь CSS просто делает общий фон страницы очень темным, чтобы яркие неоновые блоки тетриса смотрелись эффектно и контрастно.",
                js: `const canvas = document.getElementById('tetris');\nconst ctx = canvas.getContext('2d');\nctx.scale(20, 20);\nctx.fillStyle = '#ff3344';\nctx.fillRect(2, 1, 1, 1);\nctx.fillRect(2, 2, 1, 1);\nctx.fillRect(3, 2, 1, 1);`,
                jsExp: "<strong>Простым языком о JavaScript:</strong><br>Сначала JS берет наш холст и включает режим рисования <code>getContext('2d')</code>. Функция <code>scale(20, 20)</code> увеличивает пиксели в 20 раз, чтобы фигурки не были микроскопическими. Команда <code>fillStyle</code> выбирает цвет кисти (красный), а встроенные функции <code>fillRect(X, Y, ширина, высота)</code> рисуют маленькие квадратики в нужных координатах сетки, собирая их в букву 'L'."
            }
        ]
    },
    uz: {
        themeBtn: "MAVZUNI O'ZGARTIRISH",
        copyText: "📋 Koddan nusxa olish",
        copiedText: "✅ Nusxa olindi!",
        vsTitle: "🚀 Kodni kompyuterda qanday ishga tushirish kerak? (Yo'riqnoma)",
        vsDesc: "1. <b>Fayllarni yarating:</b> Kompyuterda yangi papka oching va VS Code dasturida ochib, 3 ta fayl yarating: <code>index.html</code>, <code>style.css</code> va <code>script.js</code>.<br>2. <b>Shift + 1 Mo'jizasi:</b> Bo'sh <code>index.html</code> fayli ichida <kbd>Shift</kbd> + <kbd>1</kbd> (<b>!</b> belgisi) bosing va <kbd>Enter</kbd> tugmasini bosing. Tayyor HTML struktura avtomat hosil bo'ladi!<br>3. <b>Kodni qayerga qo'yish kerak?</b> Pastdagi HTML kodni nusxalab, strukturaning <code>&lt;body&gt; shu yerga &lt;/body&gt;</code> qismiga joylashtiring.<br>4. <b>Fayllarni bog'lang:</b> Fayllar bir-biri bilan ishlashi uchun <code>index.html</code> ichiga (<code>&lt;head&gt;</code> qismiga): <code>&lt;link rel='stylesheet' href='style.css'&gt;</code> kodini, va <code>&lt;body&gt;</code> tegining eng pastki qismiga <code>&lt;script src='script.js'&gt;&lt;/script&gt;</code> kodini yozing.",
        projects: [
            {
                id: "calc",
                title: "Kalkulyator",
                icon: "🧮",
                desc: "JavaScript-da yozilgan funksional va chiroyli kalkulyator dasturi.",
                htmlExp: "<strong>HTML haqida oddiy tushuncha:</strong><br>Bu kalkulyatorning suyaklari. <code>&lt;input&gt;</code> ekranni yaratadi. Har bir tugmadagi <code>onclick</code> buyrug'i bosilganda JS funksiyasini ishga tushiradi.",
                cssExp: "<strong>CSS haqida oddiy tushuncha:</strong><br>Tashqi ko'rinish dizayni. <code>display: grid</code> buyrug'i tugmalarni 4 ta teng ustunli chiroyli jadval ko'rinishiga keltiradi.",
                jsExp: "<strong>JavaScript haqida oddiy tushuncha:</strong><br>Kalkulyatorning miyasi. <code>eval()</code> ekrandagi barcha matnli matematik amallarni avtomat hisoblab beradi.",
                html: "", css: "", js: ""
            },
            {
                id: "tictac",
                title: "X-O O'yini",
                icon: "❌",
                desc: "Ikki kishilik klassik mantiqiy o'yin.",
                htmlExp: "<strong>HTML haqida:</strong> <code>div id='board'</code> - bu bo'sh quti bo'lib, JS uning ichiga 9 ta katakchani avtomat yaratib beradi.",
                cssExp: "<strong>CSS haqida:</strong> <code>repeat(3, 100px)</code> yordamida 3 ta 100 pikselli kataklardan iborat kvadrat maydon yaratiladi.",
                jsExp: "<strong>JavaScript haqida:</strong> <code>winningConditions</code> massivida barcha yutuq chiziqlari indekslari saqlanadi va tekshiriladi.",
                html: "", css: "", js: ""
            },
            {
                id: "timer",
                title: "Taymer",
                icon: "⏱️",
                desc: "Vaqt intervallarini aniq o'lchovchi sekundomer tizimi.",
                htmlExp: "<strong>HTML haqida:</strong> Vaqt ko'rsatkichi va boshqaruvchi Start/Pauza/Sbros tugmalari yaratilgan.",
                cssExp: "<strong>CSS haqida:</strong> <code>monospace</code> shrifti juda muhim: raqamlar o'zgarganda ekran qimirlab ketmaydi.",
                jsExp: "<strong>JavaScript haqida:</strong> <code>setInterval(..., 1000)</code> har 1 soniyada ichidagi kodni qayta-qayta ishga tushiradi.",
                html: "", css: "", js: ""
            },
            {
                id: "step",
                title: "Shagomer",
                icon: "👟",
                desc: "Qadamlar va sarflangan energiyani hisoblagich qurilma.",
                htmlExp: "<strong>HTML haqida:</strong> Qadamlar sonini ko'rsatuvchi ekran va virtual qadam bosish tugmasi.",
                cssExp: "<strong>CSS haqida:</strong> Fitness bilaguzuk interfeysiga o'xshash chiroyli yashil ramka stillari.",
                jsExp: "<strong>JavaScript haqida:</strong> <code>steps++</code> buyrug'i tugma bosilganda raqamni bittaga oshiradi.",
                html: "", css: "", js: ""
            },
            {
                id: "tetris",
                title: "Tetris",
                icon: "🕹️",
                desc: "Toza JavaScript va HTML Canvas texnologiyasida retro o'yin.",
                htmlExp: "<strong>HTML haqida:</strong> <code>&lt;canvas&gt;</code> tegi rasm chizish uchun mo'ljallangan maxsus doska vazifasini bajaradi.",
                cssExp: "<strong>CSS haqida:</strong> O'yin maydonini markazga tekislash va fonni to'q rangga o'tkazish.",
                jsExp: "<strong>JavaScript haqida:</strong> <code>fillRect</code> funktsiyasi belgilangan koordinatalar bo'yicha kvadrat shakllarni chizadi.",
                html: "", css: "", js: ""
            }
        ]
    },
    en: {
        themeBtn: "CHANGE THEME",
        copyText: "📋 Copy Full Code",
        copiedText: "✅ Copied to Clipboard!",
        vsTitle: "🚀 How to run this code on your computer? (Guide)",
        vsDesc: "1. <b>Create files:</b> Create a new folder. Inside VS Code, build 3 clean files named: <code>index.html</code>, <code>style.css</code>, and <code>script.js</code>.<br>2. <b>The Shift + 1 Magic:</b> Open your empty <code>index.html</code>, press <kbd>Shift</kbd> + <kbd>1</kbd> to type an exclamation mark (<b>!</b>) and hit <kbd>Enter</kbd>. Emmet will generate the full baseline code skeleton instantly!<br>3. <b>Where to paste?</b> Copy the <b>index.html</b> source block below and paste it strictly <u>inside</u> the generated <code>&lt;body&gt; ... &lt;/body&gt;</code> tags.<br>4. <b>Link files together:</b> Put <code>&lt;link rel='stylesheet' href='style.css'&gt;</code> inside the HTML <code>&lt;head&gt;</code> box, and append <code>&lt;script src='script.js'&gt;&lt;/script&gt;</code> right at the absolute bottom of the <code>&lt;body&gt;</code> zone.",
        projects: [
            {
                id: "calc",
                title: "Calculator",
                icon: "🧮",
                desc: "Dynamic interactive mathematical calculation module.",
                htmlExp: "<strong>HTML Explained Simply:</strong> This is the skeleton. The <code>&lt;input&gt;</code> tag acts as the screen display. Every <code>&lt;button&gt;</code> uses an <code>onclick</code> attribute to route mouse click actions directly into Javascript engines.",
                cssExp: "<strong>CSS Explained Simply:</strong> Visual layout stylings. <code>display: grid</code> structures structural buttons into 4 unified columns using <code>repeat(4, 1fr)</code> formulas.",
                jsExp: "<strong>JS Explained Simply:</strong> The brain of the application. <code>eval()</code> takes raw string data visible on screen (e.g. '5+2*3') and evaluates mathematical results instantly.",
                html: "", css: "", js: ""
            },
            {
                id: "tictac",
                title: "Tic-Tac-Toe",
                icon: "❌",
                desc: "Classic 3-in-a-row puzzle board game.",
                htmlExp: "<strong>HTML Explained Simply:</strong> The <code>div id='board'</code> container starts empty. Javascript will auto-generate 9 gameplay interactive matrix squares inside it.",
                cssExp: "<strong>CSS Explained Simply:</strong> <code>repeat(3, 100px)</code> constructs a perfect 3x3 play grid map where each cell spans exactly 100px.",
                jsExp: "<strong>JS Explained Simply:</strong> The array multi-matrix <code>winningConditions</code> stores all victory line variations. Loops check active cells values on every action click.",
                html: "", css: "", js: ""
            },
            {
                id: "timer",
                title: "Stopwatch",
                icon: "⏱️",
                desc: "High precision speed time tracker.",
                htmlExp: "<strong>HTML Explained Simply:</strong> Standard plain structure containing text presentation views and control triggers.",
                cssExp: "<strong>CSS Explained Simply:</strong> Large 70px fonts styled with blue custom text shadows. <code>monospace</code> prevents screen shifting when numbers adjust.",
                jsExp: "<strong>JS Explained Simply:</strong> Built upon <code>setInterval(..., 1000)</code> engines firing loops precisely every 1 second, ticking step values up.",
                html: "", css: "", js: ""
            },
            {
                id: "step",
                title: "Step Counter",
                icon: "👟",
                desc: "Fitness and motion tracking logic simulation.",
                htmlExp: "<strong>HTML Explained Simply:</strong> Simple numerical value indicator container linked up with a core event click trigger.",
                cssExp: "<strong>CSS Explained Simply:</strong> Applies specialized sports green borders to mimic real smart wearable bracelet screens.",
                jsExp: "<strong>JS Explained Simply:</strong> Stores numerical metrics state in a variable. <code>steps++</code> increments digits by 1 on every trigger.",
                html: "", css: "", js: ""
            },
            {
                id: "tetris",
                title: "Tetris Game",
                icon: "🕹️",
                desc: "Minimal canvas rendering model of classic bricks game.",
                htmlExp: "<strong>HTML Explained Simply:</strong> Features the specialized <code>&lt;canvas&gt;</code> drawing tag node. It behaves like a blank physical whiteboard for programmatic drawing.",
                cssExp: "<strong>CSS Explained Simply:</strong> Standard dark application centering properties to produce neon brick game designs.",
                jsExp: "<strong>JS Explained Simply:</strong> Activates <code>getContext('2d')</code> drawing canvas modules. <code>fillRect</code> draws real geometric rectangles via custom vector coordinates.",
                html: "", css: "", js: ""
            }
        ]
    }
};

const Laboratory: React.FC = () => {
    const [lang, setLang] = useState<Lang>('ru');
    const [theme, setTheme] = useState<Theme>('red');
    const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
    const [copyStatuses, setCopyStatuses] = useState<Record<string, boolean>>({});

    const toggleTheme = () => {
        setTheme(prev => (prev === 'red' ? 'blue' : 'red'));
    };

    const handleCopy = (codeText: string, typeKey: string) => {
        navigator.clipboard.writeText(codeText).then(() => {
            setCopyStatuses(prev => ({ ...prev, [typeKey]: true }));
            setTimeout(() => {
                setCopyStatuses(prev => ({ ...prev, [typeKey]: false }));
            }, 2000);
        }).catch(err => {
            console.error('Copy failed: ', err);
        });
    };

    const activeProject = localization[lang].projects.find(p => p.id === activeProjectId);
    // Так как в UZ/EN контент исходных кодов пустой (согласно разметке), берем код из RU версии
    const ruFallbackProject = localization['ru'].projects.find(p => p.id === activeProjectId);

    const displayHtml = ruFallbackProject?.html || '';
    const displayCss = ruFallbackProject?.css || '';
    const displayJs = ruFallbackProject?.js || '';

    // Тексты пояснений берутся из выбранной локализации
    const displayHtmlExp = activeProject?.htmlExp || ruFallbackProject?.htmlExp || '';
    const displayCssExp = activeProject?.cssExp || ruFallbackProject?.cssExp || '';
    const displayJsExp = activeProject?.jsExp || ruFallbackProject?.jsExp || '';

    // Стилизация на основе выбранной темы
    const themeStyles = {
        accentColor: theme === 'red' ? '#ff3344' : '#0077ff',
        accentGlow: theme === 'red' ? 'rgba(255, 51, 68, 0.15)' : 'rgba(0, 119, 255, 0.15)',
        borderColor: theme === 'red' ? 'rgba(255, 51, 68, 0.25)' : 'rgba(0, 119, 255, 0.25)',
        explainBg: theme === 'red' ? 'rgba(255, 51, 68, 0.04)' : 'rgba(0, 119, 255, 0.04)',
    };

    return (
        <div style={{ ...styles.body, backgroundColor: '#0d0f14' }}>
            <header style={styles.header}>
                <div style={styles.logo}>NEXUS<span style={{ color: themeStyles.accentColor }}>.LAB</span></div>
                <div style={styles.controls}>
                    <select
                        value={lang}
                        onChange={(e) => setLang(e.target.value as Lang)}
                        style={styles.select}
                    >
                        <option value="ru">RU</option>
                        <option value="uz">UZ</option>
                        <option value="en">EN</option>
                    </select>
                    <button
                        onClick={toggleTheme}
                        style={{ ...styles.btnBase, border: `1px solid ${themeStyles.borderColor}` }}
                    >
                        {localization[lang].themeBtn}
                    </button>
                </div>
            </header>

            {/* Сетка проектов */}
            <div style={styles.grid}>
                {localization[lang].projects.map((project) => {
                    // Иконку подтягиваем из полной RU версии, если в UZ/EN её нет
                    const fullProjectData = localization['ru'].projects.find(p => p.id === project.id);
                    return (
                        <div
                            key={project.id}
                            onClick={() => setActiveProjectId(project.id)}
                            style={styles.card}
                            className="project-card"
                        >
                            <div style={styles.cardImg}>
                                {fullProjectData?.icon}
                                <div style={{ ...styles.cardImgLine, backgroundColor: themeStyles.accentColor }} />
                            </div>
                            <div style={styles.cardContent}>
                                <div style={styles.cardTitle}>{project.title}</div>
                                <div style={styles.cardDesc}>{project.desc}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Модальное окно просмотра кода */}
            {activeProjectId && activeProject && (
                <div style={styles.modal} onClick={() => setActiveProjectId(null)}>
                    <div style={{ ...styles.modalContent, border: `1px solid ${themeStyles.borderColor}`, boxShadow: `0 0 60px ${themeStyles.accentGlow}` }} onClick={(e) => e.stopPropagation()}>
                        <button style={styles.closeBtn} onClick={() => setActiveProjectId(null)}>&times;</button>

                        <h2>{activeProject.title} {ruFallbackProject?.icon}</h2>
                        <div style={styles.modalSubtitle}>{activeProject.desc}</div>

                        {/* Рабочая интерактивная инструкция запуска */}
                        <div style={{ ...styles.guideBox, borderLeft: `4px solid ${themeStyles.accentColor}` }}>
                            <h5 style={{ color: '#fff', marginBottom: '5px', fontSize: '15px' }}>{localization[lang].vsTitle}</h5>
                            <p dangerouslySetInnerHTML={{ __html: localization[lang].vsDesc }} style={{ margin: 0 }} />
                        </div>

                        {/* Блок HTML */}
                        <div style={styles.codeHeader}>
                            <h4>📂 index.html</h4>
                            <button style={styles.copyBtn} onClick={() => handleCopy(displayHtml, 'html')}>
                                {copyStatuses['html'] ? localization[lang].copiedText : localization[lang].copyText}
                            </button>
                        </div>
                        <pre style={styles.pre}><code>{displayHtml}</code></pre>
                        <div style={{ ...styles.explanationBlock, borderLeft: `3px solid ${themeStyles.accentColor}`, backgroundColor: themeStyles.explainBg }} dangerouslySetInnerHTML={{ __html: displayHtmlExp }} />

                        {/* Блок CSS */}
                        <div style={styles.codeHeader}>
                            <h4>🎨 style.css</h4>
                            <button style={styles.copyBtn} onClick={() => handleCopy(displayCss, 'css')}>
                                {copyStatuses['css'] ? localization[lang].copiedText : localization[lang].copyText}
                            </button>
                        </div>
                        <pre style={styles.pre}><code>{displayCss}</code></pre>
                        <div style={{ ...styles.explanationBlock, borderLeft: `3px solid ${themeStyles.accentColor}`, backgroundColor: themeStyles.explainBg }} dangerouslySetInnerHTML={{ __html: displayCssExp }} />

                        {/* Блок JS */}
                        <div style={styles.codeHeader}>
                            <h4>⚡ script.js</h4>
                            <button style={styles.copyBtn} onClick={() => handleCopy(displayJs, 'js')}>
                                {copyStatuses['js'] ? localization[lang].copiedText : localization[lang].copyText}
                            </button>
                        </div>
                        <pre style={styles.pre}><code>{displayJs}</code></pre>
                        <div style={{ ...styles.explanationBlock, borderLeft: `3px solid ${themeStyles.accentColor}`, backgroundColor: themeStyles.explainBg }} dangerouslySetInnerHTML={{ __html: displayJsExp }} />
                    </div>
                </div>
            )}
            <Link
                to="/courses"
                className="btnError"
                style={{ textDecoration: 'none', display: 'inline-block' }}
            >Назад

            </Link>

            {/* Глобальные ховер-эффекты через стили */}
            <style>{`
        .project-card { transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s; }
        .project-card:hover { 
          transform: translateY(-5px); 
          border-color: ${themeStyles.borderColor} !important; 
          box-shadow: 0 12px 40px ${themeStyles.accentGlow} !important; 
        }
        kbd {
          background: #222; 
          padding: 2px 6px; 
          border-radius: 4px; 
          font-family: monospace; 
          border: 1px solid #444; 
          color: #fff;
        }
        code {
          font-family: monospace;
          color: #ff3344;
          background: rgba(255,51,68,0.08);
          padding: 2px 4px;
          border-radius: 4px;
        }
        pre code {
          color: #e2e8f0;
          background: none;
          padding: 0;
        }
      `}</style>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    body: {
        margin: 0,
        padding: '40px 20px',
        color: '#ffffff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        boxSizing: 'border-box'
    },
    header: {
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '60px',
        paddingBottom: '20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    },
    logo: {
        fontSize: '22px',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '2px',
    },
    controls: {
        display: 'flex',
        gap: '15px',
    },
    select: {
        background: '#161920',
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        padding: '10px 18px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: '14px',
        outline: 'none'
    },
    btnBase: {
        background: '#161920',
        color: '#ffffff',
        padding: '10px 18px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: '14px',
        transition: 'all 0.3s'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '30px',
        width: '100%',
        maxWidth: '1200px',
    },
    card: {
        background: '#161920',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        boxSizing: 'border-box'
    },
    cardImg: {
        width: '100%',
        height: '160px',
        background: 'linear-gradient(135deg, #1c202c, #0d0f14)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '55px',
        position: 'relative',
    },
    cardImgLine: {
        content: "''",
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '2px',
    },
    cardContent: {
        padding: '25px',
    },
    cardTitle: {
        fontSize: '20px',
        get margin() { return '0 0 10px 0'; },
        fontWeight: 700,
    },
  
    cardDesc: {
        color: '#7d8590',
        fontSize: '14px',
        lineHeight: 1.6,
    },
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(5, 6, 8, 0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '20px',
        boxSizing: 'border-box'
    },
    modalContent: {
        background: '#161920',
        maxWidth: '900px',
        width: '100%',
        borderRadius: '20px',
        padding: '40px',
        position: 'relative',
        maxHeight: '85vh',
        overflowY: 'auto',
        boxSizing: 'border-box'
    },
    closeBtn: {
        position: 'absolute',
        top: '25px',
        right: '25px',
        fontSize: '32px',
        background: 'none',
        border: 'none',
        color: '#7d8590',
        cursor: 'pointer',
    },
    modalSubtitle: {
        color: '#7d8590',
        marginBottom: '25px',
        fontSize: '15px',
    },
    guideBox: {
        background: 'rgba(255, 255, 255, 0.02)',
        padding: '20px',
        borderRadius: '6px',
        marginBottom: '25px',
        fontSize: '14px',
        lineHeight: 1.6,
    },
    explanationBlock: {
        padding: '15px',
        borderRadius: '0 6px 6px 0',
        marginTop: '10px',
        marginBottom: '30px',
        fontSize: '14px',
        lineHeight: 1.6,
        color: '#ced4da',
    },
    codeHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
        marginTop: '20px',
    },
    copyBtn: {
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#7d8590',
        padding: '6px 14px',
        borderRadius: '6px',
        fontSize: '12px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    pre: {
        background: '#090b0f',
        padding: '15px',
        borderRadius: '8px',
        overflowX: 'auto',
        fontFamily: "'Courier New', Courier, monospace",
        color: '#e2e8f0',
        fontSize: '13px',
        lineHeight: '1.5',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'relative',
        margin: 0
    },

}   



export default Laboratory;