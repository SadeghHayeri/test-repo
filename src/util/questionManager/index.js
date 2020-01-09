const persianTexts = require('./text');
const selectionByAge = require('./selections');

export default class QuestionGenerator {
    constructor(age, sex, hasAutism) {
        this.age = age;
        this.sex = sex;
        this.hasAutism = hasAutism;
        this.language = 'fa';
        this.questions = selectionByAge[age];
        this.mute = false;
        this.answers = {};
    }

    changeLanguage(language) {
        if (language) {
            this.language = language;
            this.mute = false;
        } else {
            this.mute = true;
        }
    }

    getLanguage() {
        return this.language;
    }

    isMute() {
        return this.mute;
    }

    getCount() {
        return this.questions.length;
    }

    getQuestion(index) {
        this.preFetchSounds(index + 1);
        const questionNumber = this.questions[index];
        switch (this.language) {
            case 'fa':
                return {
                    id: questionNumber,
                    number: index,
                    text: persianTexts[questionNumber],
                    sound: !this.mute && require(`./sounds/persian/q${questionNumber+1}.mp3`),
                };
            case 'tr':
                return {
                    id: questionNumber,
                    number: index,
                    text: persianTexts[questionNumber],
                    sound: !this.mute && require(`./sounds/turkish/q${questionNumber+1}.mp3`),
                };
        }
    }

    preFetchSounds(index) {
        setTimeout(() => {
            const questionNumber = this.questions[index];
            if (questionNumber && !this.mute) {
                require(`./sounds/persian/q${questionNumber+1}.mp3`);
                require(`./sounds/turkish/q${questionNumber+1}.mp3`);
            }
        }, 100);
    }

    answerQuestion(id, answer) {
        this.answers[id] = answer;
    }

    getAnswer(id) {
        return this.answers[id];
    }
}