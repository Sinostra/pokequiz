<template>
    <div class="generation">
        <div class="instruction">{{$store.state.localisation.dataLang['genInstruct']}}</div>
        <div class="error-msg">{{$store.state.localisation.dataLang['genError']}}</div>
        <div class="gen-wrapper">

            <div class="first-half">

                <div class="gen-box">
                    <div v-on:click="clickGeneration" class="gen gen-1"></div>
                    <div class="gen-number">1</div>
                </div>

                <div class="gen-box">
                    <div v-on:click="clickGeneration" class="gen gen-2"></div>
                    <div class="gen-number">2</div>
                </div>

                <div class="gen-box">
                    <div v-on:click="clickGeneration" class="gen gen-3"></div>
                    <div class="gen-number">3</div>
                </div>

                <div class="gen-box">
                    <div v-on:click="clickGeneration" class="gen gen-4"></div>
                    <div class="gen-number">4</div>
                </div>

            </div>

            <div class="second-half">

                <div class="gen-box">
                    <div v-on:click="clickGeneration" class="gen gen-5"></div>
                    <div class="gen-number">5</div>
                </div>

                <div class="gen-box">
                    <div v-on:click="clickGeneration" class="gen gen-6"></div>
                    <div class="gen-number">6</div>
                </div>

                <div class="gen-box">
                    <div v-on:click="clickGeneration" class="gen gen-7"></div>
                    <div class="gen-number">7</div>
                </div>

                <div class="gen-box">
                    <div v-on:click="clickGeneration" class="gen gen-8"></div>
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

  methods: {
    clickGeneration: function(element) {
        element.target.classList.toggle("active")
    },

    clickNext: function(){
        if(!document.getElementsByClassName("active").length) {
            document.getElementsByClassName("error-msg")[0].classList.remove("transition")
            document.getElementsByClassName("error-msg")[0].classList.add("displayed")
            setTimeout(function(){
                document.getElementsByClassName("error-msg")[0].classList.add("transition")
                document.getElementsByClassName("error-msg")[0].classList.remove("displayed")
            }, 1)
        }

        else {
            var chosenGensList = Array.from(document.getElementsByClassName("active"))
            var gensNumber = []

            chosenGensList.forEach(function(element){
                gensNumber.push(element.classList[1].split('-')[1])
            })

            this.$store.dispatch("setselectedGeneration", gensNumber)
            this.$store.dispatch("nextComp")
        }
    }
  }
}
</script>