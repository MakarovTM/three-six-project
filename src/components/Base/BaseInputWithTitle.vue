<template>
    <div class="mb-3">
        <label class="form-label">
            {{ this.propInputTitle }}
        </label>
        <div class="input-group mb-3 bg-soft-light rounded-3">
            <input 
                type="text" class="form-control form-control-lg border-light bg-soft-light"
                :placeholder="this.propInputPlaceholder"
                v-model="this.inputValue"
            />
        </div>
    </div>
</template>


<script>

/**
    * Автор:        Макаров Алексей
    * Описание:     Базовое поле ввода текста с заголовком
*/

export default {

    props: {

        propInputTitle: {
            type: String,
            required: true
        },

        propInputValue: {
            type: String,
            required: false
        },

        propInputPlaceholder: {
            type: String,
            required: false
        },

    },

    data() {
        return {
            inputValue: this.propInputValue
        }
    },

    watch: {

        inputValue: function() {

            /**
                * Автор:    Макаров Алексей
                * Описание: Выполнение наблюдения за переменной ввода данных 
            */

            this.$emit("updateInputValue", this.inputValue)

        }

    }
    
}
</script>
