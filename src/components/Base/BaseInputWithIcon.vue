<template>
    <div class="search-box chat-search-box">
        <div class="input-group bg-light input-group-lg rounded-lg">
            <div class="input-group-prepend">
                <button class="btn btn-link text-decoration-none text-muted pr-1" type="button">
                    <Icon :icon="this.propInputSeparatedIcon" width="24" height="24" />
                </button>
            </div>
            <input 
                type="text" class="form-control bg-light" 
                :placeholder="this.propInputPlaceholder"
                v-model="this.inputValue"
            />
        </div>
    </div>
</template>


<script>

/**
    * Автор:    Макаров Алексей    
    * Описание: Базовое поле ввода текста 
*/

import { Icon } from '@iconify/vue'

export default {

    components: {
        Icon
    },

    props: {
        propInputValue: {
            type: String,
            default: "",
            required: false
        },
        propInputPlaceholder: {
            type: String,
            required: true
        },
        propInputSeparatedIcon: {
            type: String,
            required: true
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
