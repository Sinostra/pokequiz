<template>
    <div class="type">
        <div class="instruction">{{$store.state.localisation.dataLang['typeInstruct']}}</div>
        <Error :message="$store.state.localisation.dataLang['typeError']" :hasError="hasError" v-on:errorFaded="hasError = false"/>
        <div class="all-wrapper">
            <div v-on:click="clickAllTypes" :class="getCheckboxAllClass()" class="checkbox"></div>
            <div class="label">{{$store.state.localisation.dataLang['allTypesText']}}</div>
        </div>
        <div class="types-wrapper">
            <div class="types-box">
                <div class="specific-type" v-on:click="clickType('grass')">
                    <div :class="getCheckBoxClass('grass')" class="checkbox"></div>
                    <img class="label" :src="getUrl('grass')">
                </div>
                <div class="specific-type" v-on:click="clickType('fire')">
                    <div :class="getCheckBoxClass('fire')" class="checkbox"></div>
                    <img class="label" :src="getUrl('fire')">
                </div>
                <div class="specific-type" v-on:click="clickType('water')">
                    <div :class="getCheckBoxClass('water')" class="checkbox"></div>
                    <img class="label" :src="getUrl('water')">
                </div>
                <div class="specific-type" v-on:click="clickType('electric')">
                    <div :class="getCheckBoxClass('electric')" class="checkbox"></div>
                    <img class="label" :src="getUrl('electric')">
                </div>
                <div class="specific-type" v-on:click="clickType('ground')">
                    <div :class="getCheckBoxClass('ground')" class="checkbox"></div>
                    <img class="label" :src="getUrl('ground')">
                </div>
                <div class="specific-type" v-on:click="clickType('rock')">
                    <div :class="getCheckBoxClass('rock')" class="checkbox"></div>
                    <img class="label" :src="getUrl('rock')">
                </div>
            </div>

            <div class="types-box">
                <div class="specific-type" v-on:click="clickType('psychic')">
                    <div :class="getCheckBoxClass('psychic')" class="checkbox"></div>
                    <img class="label" :src="getUrl('psychic')">
                </div>
                <div class="specific-type" v-on:click="clickType('ghost')">
                    <div :class="getCheckBoxClass('ghost')" class="checkbox"></div>
                    <img class="label" :src="getUrl('ghost')">
                </div>
                <div class="specific-type" v-on:click="clickType('dark')">
                    <div :class="getCheckBoxClass('dark')" class="checkbox"></div>
                    <img class="label" :src="getUrl('dark')">
                </div>
                <div class="specific-type" v-on:click="clickType('fighting')">
                    <div :class="getCheckBoxClass('fighting')" class="checkbox"></div>
                    <img class="label" :src="getUrl('fighting')">
                </div>
                <div class="specific-type" v-on:click="clickType('fairy')">
                    <div :class="getCheckBoxClass('fairy')" class="checkbox"></div>
                    <img class="label" :src="getUrl('fairy')">
                </div>
                <div class="specific-type" v-on:click="clickType('steel')">
                    <div :class="getCheckBoxClass('steel')" class="checkbox"></div>
                    <img class="label" :src="getUrl('steel')">
                </div>
            </div>

            <div class="types-box">
                <div class="specific-type" v-on:click="clickType('normal')">
                    <div :class="getCheckBoxClass('normal')" class="checkbox"></div>
                    <img class="label" :src="getUrl('normal')">
                </div>
                <div class="specific-type" v-on:click="clickType('flying')">
                    <div :class="getCheckBoxClass('flying')" class="checkbox"></div>
                    <img class="label" :src="getUrl('flying')">
                </div>
                <div class="specific-type" v-on:click="clickType('ice')">
                    <div :class="getCheckBoxClass('ice')" class="checkbox"></div>
                    <img class="label" :src="getUrl('ice')">
                </div>
                <div class="specific-type" v-on:click="clickType('dragon')">
                    <div :class="getCheckBoxClass('dragon')" class="checkbox"></div>
                    <img class="label" :src="getUrl('dragon')">
                </div>
                <div class="specific-type" v-on:click="clickType('poison')">
                    <div :class="getCheckBoxClass('poison')" class="checkbox"></div>
                    <img class="label" :src="getUrl('poison')">
                </div>
                <div class="specific-type" v-on:click="clickType('bug')">
                    <div :class="getCheckBoxClass('bug')" class="checkbox"></div>
                    <img class="label" :src="getUrl('bug')">
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
import Error from './interfaceComponents/Error.vue'
export default {
    name: 'Type',

    components: {
        Error
    },

    data:function() {
        return {
            chosenTypesList: [],
            hasError: false,
            allTypesChecked: false
        }
    },

    methods: {
        getUrl(type) {
            return require('../assets/img/languages/' + this.$store.state.localisation.chosenLang + '/types/'+ type + '.png')
        },

        clickType: function(type){
            if(this.chosenTypesList.indexOf(type) > -1) {
                this.chosenTypesList.splice(this.chosenTypesList.indexOf(type), 1)
            }

            else {
                this.chosenTypesList.push(type)
            }
        },

        clickAllTypes: function(){
            if(this.allTypesChecked) {
                this.allTypesChecked = false
                this.chosenTypesList = []
            }

            else {
                this.allTypesChecked = true
                this.chosenTypesList = ['grass', 'fire', 'water', 'electric', 'ground', 'rock', 'psychic', 'ghost', 'dark', 'fighting', 'fairy', 'steel', 'normal', 'flying', 'ice', 'dragon', 'poison', 'bug']
            }
        },

        getCheckBoxClass(type) {
            return {
                checked: this.chosenTypesList.indexOf(type) > -1
            }
        },

        getCheckboxAllClass() {
            return {
                checked: this.allTypesChecked
            }
        },

        clickNext: function() {
            if(!this.chosenTypesList.length) {
            this.hasError = true
        }

            else {

                this.$store.dispatch("setselectedTypes", this.chosenTypesList)
                this.$store.dispatch("nextComp")
            }
        },

        clickPrevious() {
            this.$store.dispatch("previousComp")
        }
    }

}
</script>