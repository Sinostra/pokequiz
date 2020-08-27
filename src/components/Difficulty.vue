<template>
    <div class="difficulty">
        <div class="instruction">{{$store.state.localisation.dataLang['difficultyInstruct']}}</div>
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
    </div>
</template>

<script>
export default {
    name: 'Difficulty',

    methods: {
        clickDifficulty: function(element) {
            var chosenDifficulty = ""
            if(Array.from(element.target.classList).includes("difficulty-setting")) {
                chosenDifficulty = element.target.getAttribute("data-difficulty")
            }
            else chosenDifficulty = element.target.parentElement.getAttribute("data-difficulty")

            this.$store.dispatch("setselectedDifficulty", chosenDifficulty)
            this.$store.dispatch("changecurrentComp")           
        }
    }
}
</script>