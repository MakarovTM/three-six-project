<template>
    <div class="row g-0">
        <div class="col">
            <input 
                type="text"
                class="form-control form-control-lg bg-light border-light"
                :placeholder="this.propInputPlaceHolder"
                v-model="this.inputValue"
            />
        </div>
        <div class="col-auto">
            <div class="chat-input-links ms-md-2 me-md-0">
                <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                        <button 
                            type="submit" 
                            class="btn btn-primary font-size-16 btn-lg chat-send waves-effect waves-light"
                        >
                            <Icon :icon="this.propInputButtonIcon" />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>

/**
    * Автор:        Макаров Алексей
    * Описание:     Базовое поле ввода текста c кнопкой
*/

import { Icon } from '@iconify/vue'

export default {

    components: {
        Icon
    },

    props: {

        propInputButtonIcon: {
            type: String,
            required: true
        },

        propInputPlaceHolder: {
            type: String,
            required: true
        },

    },

    data() {
        return {
            inputValue: ""
        }
    }
    
}
</script>
