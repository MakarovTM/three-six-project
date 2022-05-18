<template>
    <div class="mb-3">
        <label class="form-label">
            {{ this.propInputTitle }}
        </label>
        <div class="input-group mb-3 bg-soft-light rounded-3">
            <input 
                type="text" class="form-control form-control-lg border-light bg-soft-light"
                :maxlength="this.propInputLength"
                :placeholder="this.propInputPlaceholder"
                v-model="this.inputValue"
            />
        </div>
        <div class="text-muted">
            <p class="mb-4 text-danger" v-if="!this.inputValidation">
                {{ this.propInputRegexPatternInvalidMessage }}
            </p>
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
            defaul: "",
            required: false
        },

        propInputLength: {
            type: Number,
            defaul: 500,
            required: false
        },

        propInputPlaceholder: {
            type: String,
            required: false
        },

        propInputRegexPattern: {
            type: Object,
            required: true
        },

        propInputRegexPatternInvalidMessage: {
            type: String,
            required: true
        }

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
            this.$emit("updateInputValueValidation", this.propInputRegexPattern.test(this.inputValue))

        }

    },

    computed: {

        inputValidation: function() {

            /**
                * Автор:    Макаров Алексей
                * Описание: Выполнение проверки поля
                *           ввода по маске регулярного выражения
            */

            return this.propInputRegexPattern.test(this.inputValue)

        }

    }
    
}
</script>
