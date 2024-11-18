new Vue({
    el: '#app',
    data: {
        word: '',
        displayedWord: [],
        guessedLetters: [],
        wrongGuesses: 0,
        maxGuesses: 10,
        alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
        showCheat: false
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
        },
        guessLetter(letter) {
            this.guessedLetters.push(letter);
            if (this.word.includes(letter)) {
                for (let i = 0; i < this.word.length; i++) {
                    if (this.word[i] === letter) {
                        this.$set(this.displayedWord, i, letter);
                    }
                }
            } else {
                this.wrongGuesses++;
            }
        },
        toggleCheat() {
            this.showCheat = !this.showCheat;
        },
        resetGame() {
            this.initializeGame();
        }
    },
    mounted() {
        this.initializeGame();
    }
});