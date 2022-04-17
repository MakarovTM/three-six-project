<template>
    <button 
        type="button" class="btn btn-primary" 
        :disabled="this.propButtonDisabled"
        @click="this.buttonClicked"
    >
        {{ this.propButtonTitle }}
    </button>
</template>


<script>

/**
    * Автор:        Макаров Алексей
    * Описание:     Базовая кнопка UI
*/

export default {

    props: {

        propButtonTitle: {
            type: String,
            required: true
        },

        propButtonDisabled: {
            type: Boolean,
            required: true
        }

    },

    methods: {

        buttonClicked: function() {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Отправка события в родитель о нажатии кнопки 
            */

            this.$emit("buttonClicked")

        }

    }
    
}
</script>
