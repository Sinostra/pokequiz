<template>
    <div class="generation">
        <div class="instruction">{{$store.state.localisation.dataLang['genInstruct']}}</div>
        <div :class="getErrorMsgClass()" class="error-msg">{{$store.state.localisation.dataLang['genError']}}</div>
        <div class="gen-wrapper">

            <div class="first-half">

                <div class="gen-box">
                    <div v-on:click="clickGeneration(1)" :class="getCheckBoxClass(1)" class="gen gen-1"></div>
                    <div class="gen-number">1</div>
                </div>

                <div class="gen-box">
                    <div v-on:click="clickGeneration(2)" :class="getCheckBoxClass(2)" class="gen gen-2"></div>
                    <div class="gen-number">2</div>
                </div>

                <div class="gen-box">
                    <div v-on:click="clickGeneration(3)" :class="getCheckBoxClass(3)" class="gen gen-3"></div>
                    <div class="gen-number">3</div>
                </div>

                <div class="gen-box">
                    <div v-on:click="clickGeneration(4)" :class="getCheckBoxClass(4)" class="gen gen-4"></div>
                    <div class="gen-number">4</div>
                </div>

            </div>

            <div class="second-half">

                <div class="gen-box">
                    <div v-on:click="clickGeneration(5)" :class="getCheckBoxClass(5)" class="gen gen-5"></div>
                    <div class="gen-number">5</div>
                </div>

                <div class="gen-box">
                    <div v-on:click="clickGeneration(6)" :class="getCheckBoxClass(6)" class="gen gen-6"></div>
                    <div class="gen-number">6</div>
                </div>

                <div class="gen-box">
                    <div v-on:click="clickGeneration(7)" :class="getCheckBoxClass(7)" class="gen gen-7"></div>
                    <div class="gen-number">7</div>
                </div>

                <div class="gen-box">
                    <div v-on:click="clickGeneration(8)" :class="getCheckBoxClass(8)" class="gen gen-8"></div>
                    <div class="gen-number">8</div>
                </div>

            </div>

        </div>
        <div class="btn-wrapper">
            <div v-on:click="clickNext" class="btn white-btn">{{$store.state.localisation.dataLang['nextText']}}</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Generation',

  data:function() {
    return {
        chosenGensList: [],
        hasError: false,
        errorFadeOut: false,
    }
  },

  methods: {

    clickGeneration(genNumber) {
        if(this.chosenGensList.indexOf(genNumber) > -1) {
            this.chosenGensList.splice(this.chosenGensList.indexOf(genNumber), 1)
        }

        else {
            this.chosenGensList.push(genNumber)
        }
    },

    getCheckBoxClass(genNumber) {
        return {
            active: this.chosenGensList.indexOf(genNumber) > -1
        }
    },

    getErrorMsgClass() {
        return {
            fadeOut: this.errorFadeOut,
            visible: this.hasError
        }
    },

    clickNext: function(){
        if(!this.chosenGensList.length) {
            if(!this.errorFadeOut) {
                this.hasError = true
                this.errorFadeOut = true
                setTimeout(() => {
                    this.hasError = false
                    this.errorFadeOut = false
                }, 3000)
            }
        }

        else {

            this.$store.dispatch("setselectedGeneration", this.chosenGensList)
            this.$store.dispatch("nextComp")
        }
    }
  },

  mounted: function() {
    this.$store.dispatch("displayBackground", true)
  }
}
</script>