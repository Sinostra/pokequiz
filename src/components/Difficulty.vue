<template>
    <div class="difficulty">
        <div class="instruction">{{$store.state.localisation.dataLang['difficultyInstruct']}}</div>
        <div class="settings">
            <div class="checkbox" v-on:click="clickAlternateForms()" :class="useAlternateForms ? 'checked': ''"></div>
            <div class="label" v-on:click="clickAlternateForms()">Jouer avec les formes alternatives</div>
            <div class="question-mark">
                ?
                <div class="explanations">Explications</div>
            </div>
        </div>
        <div class="difficulty-wrapper">
            <div class="easy difficulty-setting" v-on:click="clickDifficulty" data-difficulty="easy">
                <div class="picto"></div>
                <div class="text">{{$store.state.localisation.dataLang['easyText']}}</div>
            </div>

            <div class="medium difficulty-setting" v-on:click="clickDifficulty" data-difficulty="medium">
                <div class="picto"></div>
                <div class="text">{{$store.state.localisation.dataLang['mediumText']}}</div>
            </div>

            <div class="hard difficulty-setting" v-on:click="clickDifficulty" data-difficulty="hard">
                <div class="picto"></div>
                <div class="text">{{$store.state.localisation.dataLang['hardText']}}</div>
            </div>
        </div>

        <div class="btn-wrapper">
            <div v-on:click="clickPrevious" class="btn white-btn">{{$store.state.localisation.dataLang['previousText']}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Difficulty',

    data: function(){
        return {
            useAlternateForms: false
        }
    },

    methods: {
        clickDifficulty: function(element) {
            var chosenDifficulty = ""
            if(Array.from(element.target.classList).includes("difficulty-setting")) {
                chosenDifficulty = element.target.getAttribute("data-difficulty")
            }
            else chosenDifficulty = element.target.parentElement.getAttribute("data-difficulty")

            this.$store.dispatch("setselectedDifficulty", chosenDifficulty)
            this.$store.dispatch("setAlternateForms", this.useAlternateForms)
            console.log(this.useAlternateForms)

            this.$store.dispatch("filterByGen", this.$store.state.settings.selectedGeneration)
            this.$store.dispatch("filterByType", this.$store.state.settings.selectedTypes)

            this.$store.dispatch("nextComp")           
        },

        clickAlternateForms: function(){
            this.useAlternateForms = !this.useAlternateForms
        },

        clickPrevious() {
            this.$store.dispatch("previousComp")
        }
    }
}
</script>