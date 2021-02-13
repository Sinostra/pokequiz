<template>
    <div class="error-msg" :class="getErrorMsgClass()">{{message}}</div>
</template>

<script>
export default {
    name: 'Error',

    data: function(){
        return {    
            activeError: false,
            errorFadeOut: false
        }
    },

    props: {
        message: String,
        hasError: Boolean
    },
    watch: {
        hasError: function(newVal) {
            if(newVal) {
                if(!this.errorFadeOut) {
                this.activeError = true
                this.errorFadeOut = true
                setTimeout(() => {
                    this.activeError = false
                    this.errorFadeOut = false
                    this.$emit('errorFaded')
                }, 3000)
            }
            }
        }
    },

    methods: {
        getErrorMsgClass() {
        return {
            fadeOut: this.errorFadeOut,
            visible: this.activeError
        }
    },
    }
}

</script>