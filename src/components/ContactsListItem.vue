<template>
    <li>
        <div class="media">
            <div class="chat-user-img mr-3">
                <div class="avatar-xs">
                    <span class="avatar-title rounded-circle bg-soft-primary text-primary">
                        {{ this.propContactName.charAt(0) }}
                    </span>
                </div>
            </div>
            <div class="media-body overflow-hidden">
                <h5 class="text-truncate font-size-15 mb-0">
                    {{ this.propContactName }}
                </h5>
                <p class="chat-user-message text-truncate mb-0">
                    Статус: {{ this.propChatLastMessage }}
                </p>
            </div>
            <div class="dropdown b-dropdown btn-group">
                <button 
                    type="button" class="btn dropdown-toggle btn-white text-muted p-0" 
                    @click="this.updateContactEditDropDown">
                        <Icon icon="ic:baseline-format-list-bulleted" />
                </button>
                <ul role="menu" :class="this.contactEditDropDownClass">
                    <a class="dropdown-item" @click="this.blockContact">
                        <Icon icon="ic:baseline-block" />
                        Блокировать
                    </a>
                    <a class="dropdown-item" @click="this.deleteContact"> 
                        <Icon icon="ic:baseline-delete" />
                        Удалить
                    </a>
                </ul>
            </div>
        </div>
    </li>
</template>


<script>

/**
    * Автор:    Макаров Алексей
    * Описание: Отображение строки в списке контактов пользователя
*/

import { Icon } from '@iconify/vue'

export default {

    components: {
        Icon
    },
    
    props: {

        propContactId: {
            type: Number,
            required: true
        },

        propContactName: {
            type: String,
            required: true
        }

    },

    data() {
        return {
            contactEditDropDownOpen: false
        }
    },

    computed: {

        contactEditDropDownClass: function() {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Вычисление стиля для выпадающего меню по действиям с контактом  
            */

            return this.contactEditDropDownOpen ? "dropdown-menu dropdown-menu-right show" : "dropdown-menu dropdown-menu-right"

        }

    },

    methods: {

        updateContactEditDropDown: function() {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Обновление статуса выпадающего меню по действию с контактом
            */

            this.contactEditDropDownOpen = !this.contactEditDropDownOpen

        },

        blockContact: function() {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Блокировка пользовтеля из реестра контактов 
            */
        
            console.log("Блокировать контакт с id = ", this.propContactId)

        },

        deleteContact: function() {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Удаление контакта из списка контактов пользователя
            */

            console.log("Удалить контакт с id = ", this.propContactId)

        }

    }

}

</script>
