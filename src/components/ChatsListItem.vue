<template>
    <li @click="this.chatViewOpenedUpdate">
        <div class="media">
            <div class="chat-user-img online align-self-center mr-3 online">
                <div class="avatar-xs">
                    <span class="avatar-title rounded-circle bg-soft-primary text-primary">
                        {{ this.propContactName.charAt(0) }}
                    </span>
                </div>
            </div>
            <div class="media-body overflow-hidden">
                <h5 class="text-truncate font-size-15 mb-1">
                    {{ this.propContactName }}
                </h5>
                <p :class="this.chatLastMessageShowParams.class" >
                    {{ this.chatLastMessageShowParams.placeholder }}
                </p>
            </div>
            <div class="font-size-11">
                {{ this.propChatLastMessageTs }}
            </div>
        </div>
    </li>
</template>


<script>
import { mapActions } from 'vuex'

/**
    * Автор:    Макаров Алексей
    * Описание: Отображение чата пользователя
*/

export default {
    
    props: {

        propChatId: {
            type: Number,
            required: true
        },

        propContactName: {
            type: String,
            required: true
        },

        propChatLastMessage: {
            type: Number,
            required: true
        },

        propChatLastMessageTs: {
            type: String,
            required: true
        }
    },

    computed: {

        chatLastMessageShowParams: function(chatFullRead) {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Вычисление параметров отображения информации о чате
            */

            return this.propChatLastMessage === 1 ? {class: "chat-user-message text-truncate mb-0 text-success", placeholder: "Нет новых сообщений"} : {class: "chat-user-message text-truncate mb-0 text-danger", placeholder: "Новое сообщение"}

        }

    },

    methods: {
        ...mapActions([
            "chatViewOpenedUpdate"
        ])
    }

}

</script>
