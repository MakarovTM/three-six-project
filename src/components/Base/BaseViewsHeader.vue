<template>

    <div class="p-4">

        <div class="user-chat-nav float-right" v-if="!!this.propViewHeaderModalIcon">
            <div>
                <button 
                    type="button" 
                    class="btn btn-link text-decoration-none text-muted font-size-18 py-0"
                    @click="this.headerButtonClicked"
                >
                    <Icon :icon="this.propViewHeaderModalIcon" width="24" height="24" />
                </button>
            </div>
        </div>

        <h4 class="mb-4">
            {{ this.propViewHeaderTitle }}
        </h4>

        <slot name="view-header-search-element"></slot>

    </div>

</template>


<script>

/**
    * Автор:    Макаров Алексей
    * Описание: Базовая шапка для активной страницы мессенджера 
*/

import { Icon } from "@iconify/vue"

export default {

    components: {
        Icon
    },
    
    props: {

        propViewHeaderTitle: {
            type: String,
            required: true
        },

        propViewHeaderModalIcon: {
            type: String,
            required: false
        }

    },

    methods: {

        headerButtonClicked: function() {

            /**
                * Автор:    Макаров Алексей
                * Описание: Отправляем событие в родительский 
                *           элемент о нажатии на кнопку модального окна
            */

           this.$emit("modalOpenButtonClicked")

        }

    }

}

</script>
