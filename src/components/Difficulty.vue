<template>
    <div class="difficulty">
        <div class="instruction">{{$store.state.localisation.dataLang['difficultyInstruct']}}</div>
        <div :class="getErrorMsgClass()" class="error-msg">{{$store.state.localisation.dataLang['difficultyError']}}</div>
        <div class="difficulty-wrapper">
            <div class="easy difficulty-setting" v-on:click="clickDifficulty('easy')">
                <div :class="getDifficultyClass('easy')" class="picto"></div>
                <div :class="getDifficultyClass('easy')" class="text">{{$store.state.localisation.dataLang['easyText']}}</div>
            </div>

            <div class="medium difficulty-setting" v-on:click="clickDifficulty('medium')">
                <div :class="getDifficultyClass('medium')" class="picto"></div>
                <div :class="getDifficultyClass('medium')" class="text">{{$store.state.localisation.dataLang['mediumText']}}</div>
            </div>

            <div class="hard difficulty-setting" v-on:click="clickDifficulty('hard')">
                <div :class="getDifficultyClass('hard')" class="picto"></div>
                <div :class="getDifficultyClass('hard')" class="text">{{$store.state.localisation.dataLang['hardText']}}</div>
            </div>
        </div>
        <div class="options-insctruct">{{$store.state.localisation.dataLang['otherOptionsText']}}</div>

        <div class="settings">
            <div class="setting-wrapper">
                <div class="checkbox" v-on:click="clickAlternateForms()" :class="useAlternateForms ? 'checked': ''"></div>
                <div class="label" v-on:click="clickAlternateForms()">{{$store.state.localisation.dataLang['useAlternateFormsText']}}</div>
                <div class="question-mark">
                    ?
                    <div class="explanations">{{$store.state.localisation.dataLang['alternateFormsExplanation']}}</div>
                </div>
            </div>

            <div class="setting-wrapper">
                <div class="checkbox" v-on:click="clickHints()" :class="useHints ? 'checked': ''"></div>
                <div class="label" v-on:click="clickHints()">{{$store.state.localisation.dataLang['useHintsText']}}</div>
                <div class="question-mark">
                    ?
                    <div class="explanations">{{$store.state.localisation.dataLang['hintsExplanation']}}</div>
                </div>
            </div>
        </div>

        <div class="btn-wrapper">
            <div v-on:click="clickPrevious" class="btn white-btn">{{$store.state.localisation.dataLang['previousText']}}</div>
            <div v-on:click="clickNext" class="btn white-btn">{{$store.state.localisation.dataLang['nextText']}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Difficulty',

    data: function(){
        return {
            chosenDifficulty: '',
            useAlternateForms: false,
            useHints: false,
            hasError: false,
            errorFadeOut: false,
        }
    },

    methods: {
        clickDifficulty: function(difficulty) {
            this.chosenDifficulty = difficulty
        },

        clickAlternateForms: function(){
            this.useAlternateForms = !this.useAlternateForms
        },

        clickHints: function(){
            this.useHints = !this.useHints
        },

        clickPrevious() {
            this.$store.dispatch("previousComp")
        },

        clickNext() {
            if(!this.chosenDifficulty) {
               if(!this.errorFadeOut) {
                    this.errorFadeOut = true
                    this.hasError = true
                    setTimeout(() => {
                        this.hasError = false
                        this.errorFadeOut = false
                    }, 3000)
                }
            }

            else {
                this.$store.dispatch("setselectedDifficulty", this.chosenDifficulty)
                this.$store.dispatch("setAlternateForms", this.useAlternateForms)
                this.$store.dispatch("setHint", this.useHints)

                this.$store.dispatch("filterByGen", this.$store.state.settings.selectedGeneration)
                this.$store.dispatch("filterByType", this.$store.state.settings.selectedTypes)

                this.$store.dispatch("nextComp")  
            }
        },

        getDifficultyClass(difficulty) {
            return {
                chosenDifficulty: difficulty == this.chosenDifficulty
            }
        },


        getErrorMsgClass() {
            return {
                fadeOut: this.errorFadeOut,
                visible: this.hasError
            }
        }
    }
}
</script>