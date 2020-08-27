<template>
    <div class="type">
        <div class="instruction">{{$store.state.localisation.dataLang['typeInstruct']}}</div>
        <div class="error-msg">{{$store.state.localisation.dataLang['typeError']}}</div>
        <div class="all-wrapper">
            <div class="checkbox"></div>
            <div class="label">{{$store.state.localisation.dataLang['allTypesText']}}</div>
        </div>
        <div class="types-wrapper">
            <div class="types-box">
                <div class="specific-type">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('grass')">
                </div>
                <div class="specific-type">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('fire')">
                </div>
                <div class="specific-type">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('water')">
                </div>
                <div class="specific-type">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('electric')">
                </div>
                <div class="specific-type">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('ground')">
                </div>
                <div class="specific-type">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('rock')">
                </div>
            </div>

            <div class="types-box">
                <div class="specific-type">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('psychic')">
                </div>
                <div class="specific-type">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('ghost')">
                </div>
                <div class="specific-type">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('dark')">
                </div>
                <div class="specific-type">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('fighting')">
                </div>
                <div class="specific-type">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('fairy')">
                </div>
                <div class="specific-type">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('steel')">
                </div>
            </div>

            <div class="types-box">
                <div class="specific-type">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('normal')">
                </div>
                <div class="specific-type">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('flying')">
                </div>
                <div class="specific-type">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('ice')">
                </div>
                <div class="specific-type">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('dragon')">
                </div>
                <div class="specific-type">
                    <div v-on:click="clickType" class="checkbox"></div>
                    <img class="label" :src="getUrl('poison')">
                </div>
                <div class="specific-type">
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

    data: function() {
        return {
            
        }
    },

    methods: {
        getUrl(type) {
            return require('../assets/img/languages/' + this.$store.state.localisation.chosenLang + '/types/'+ type + '.png')
        },

        clickType: function(element){
            element.target.classList.toggle("checked")
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
        }
    }

}
</script>