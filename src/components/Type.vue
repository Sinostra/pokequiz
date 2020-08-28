<template>
    <div class="type">
        <div class="instruction">{{$store.state.localisation.dataLang['typeInstruct']}}</div>
        <div class="error-msg">{{$store.state.localisation.dataLang['typeError']}}</div>
        <div class="all-wrapper">
            <div v-on:click="clickAllTypes" class="checkbox"></div>
            <div class="label">{{$store.state.localisation.dataLang['allTypesText']}}</div>
        </div>
        <div class="types-wrapper">
            <div class="types-box">
                <div class="specific-type" data-type="grass">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('grass')">
                </div>
                <div class="specific-type" data-type="fire">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('fire')">
                </div>
                <div class="specific-type" data-type="water">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('water')">
                </div>
                <div class="specific-type" data-type="electric">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('electric')">
                </div>
                <div class="specific-type" data-type="ground">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('ground')">
                </div>
                <div class="specific-type" data-type="rock">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('rock')">
                </div>
            </div>

            <div class="types-box">
                <div class="specific-type" data-type="psychic">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('psychic')">
                </div>
                <div class="specific-type" data-type="ghost">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('ghost')">
                </div>
                <div class="specific-type" data-type="dark">
                    <div v-on:click="clickType" :class="$store.state.settings.selectedGeneration.includes('1') == 1 && $store.state.settings.selectedGeneration.length == 1 ? 'disabled' : ''" class="checkbox"></div>
                    <img class="label" :src="getUrl('dark')">
                </div>
                <div class="specific-type" data-type="fighting">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('fighting')">
                </div>
                <div class="specific-type" data-type="fairy">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('fairy')">
                </div>
                <div class="specific-type" data-type="steel">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('steel')">
                </div>
            </div>

            <div class="types-box">
                <div class="specific-type" data-type="normal">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('normal')">
                </div>
                <div class="specific-type" data-type="flying">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('flying')">
                </div>
                <div class="specific-type" data-type="ice">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('ice')">
                </div>
                <div class="specific-type" data-type="dragon">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('dragon')">
                </div>
                <div class="specific-type" data-type="poison">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('poison')">
                </div>
                <div class="specific-type" data-type="bug">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('bug')">
                </div>
            </div>
        </div>

        <div class="btn-wrapper">
            <div v-on:click="clickNext" class="btn">{{$store.state.localisation.dataLang['nextText']}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Type',

    methods: {
        getUrl(type) {
            return require('../assets/img/languages/' + this.$store.state.localisation.chosenLang + '/types/'+ type + '.png')
        },

        clickType: function(element){
            if(!Array.from(element.target.classList).includes("disabled")) {
                element.target.classList.toggle("checked")
            }
        },

        clickAllTypes: function(element){
            if(Array.from(element.target.classList).includes("active")) {
                element.target.classList.remove("active")
                document.getElementsByClassName("specific-type").forEach(function(element){
                    element.querySelector(".checkbox").classList.remove("checked")
                })
            }

            else {
                element.target.classList.add("active")
                document.getElementsByClassName("specific-type").forEach(function(element){
                    if(!Array.from(element.querySelector(".checkbox").classList).includes("disabled")) {
                        element.querySelector(".checkbox").classList.add("checked")
                    }
                })
                
            }
        },

        clickNext: function() {
            if(!document.getElementsByClassName("checked").length) {
                document.getElementsByClassName("error-msg")[0].classList.remove("transition")
                document.getElementsByClassName("error-msg")[0].classList.add("displayed")
                setTimeout(function(){
                    document.getElementsByClassName("error-msg")[0].classList.add("transition")
                    document.getElementsByClassName("error-msg")[0].classList.remove("displayed")
                }, 1)
            }

            else {
                var chosenTypesList = document.getElementsByClassName("checked")
                var typesList = []
                chosenTypesList.forEach(function(element){
                    typesList.push(element.parentElement.getAttribute("data-type"))
                })

                this.$store.dispatch("setselectedTypes", typesList)
                this.$store.dispatch("filterByType", typesList)
                this.$store.dispatch("changecurrentComp")
            }
        }
    }

}
</script>