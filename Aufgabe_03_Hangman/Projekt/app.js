new Vue({
    el: '#app',
    data: {
        word: '',
        displayedWord: [],
        guessedLetters: [],
        wrongGuesses: 0,
        maxGuesses: 10,
        alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
        showCheat: false,
        highscore: 0,
        timer: null,
        startTime: null,
        highscoreTable: [],
        level: 1
    },
    computed: {
        currentImage() {
            return `./data/hangman/${this.wrongGuesses}.jpg`;
        }
    },
    methods: {
        initializeGame() {
            this.word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
            this.displayedWord = Array(this.word.length).fill('_ ');
            this.guessedLetters = [];
            this.wrongGuesses = 0;
            this.showCheat = false;
            this.startTimer();
        },
        guessLetter(letter) {
            this.guessedLetters.push(letter);
            if (this.word.includes(letter)) {
                for (let i = 0; i < this.word.length; i++) {
                    if (this.word[i] === letter) {
                        this.$set(this.displayedWord, i, letter);
                    }
                }
                if (!this.displayedWord.includes('_')) {
                    this.stopTimer();
                    this.saveHighscore();
                }
            } else {
                this.wrongGuesses++;
            }
        },
        toggleCheat() {
            this.showCheat = !this.showCheat;
        },
        resetGame() {
            this.level = 1;
            this.highscoreTable = [];
            this.initializeGame();
        },
        nextLevel() {
            this.saveHighscore();
            this.level++;
            this.initializeGame();
        },
        startTimer() {
            this.startTime = Date.now();
            this.timer = setInterval(() => {
                this.highscore = Math.floor((Date.now() - this.startTime) / 1000);
            }, 1000);
        },
        stopTimer() {
            clearInterval(this.timer);
        },
        saveHighscore() {
            const score = {
                level: this.level,
                score: this.highscore
            };
            this.highscoreTable.push(score);
            localStorage.setItem('highscoreTable', JSON.stringify(this.highscoreTable));
        },
        loadHighscoreTable() {
            const storedTable = localStorage.getItem('highscoreTable');
            if (storedTable) {
                this.highscoreTable = JSON.parse(storedTable);
            }
        }
    },
    mounted() {
        this.loadHighscoreTable();
        this.initializeGame();
    }
});