<template>
    <div class="tab-content">
        <div class="tab-pane active">
            <div>
                <div class="p-4 chat-message-list chat-group-list">
                    <div>
                        <ul class="list-unstyled contact-list">
                            <ChatsListItem

                                v-for="chatsItem in this.filteredChatsList" 
                                :key="chatsItem.id" 

                                :propChatId="chatsItem.chat_id.id"
                                :propContactName="chatsItem.chat_id.name"
                                propChatLastMessage="Тест" 
                                :propChatLastMessageTs="chatsItem.chat_id.last_action_timestamp" 

                            />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

/**
    * Автор:    Макаров Алексей
    * Описание: Отображение списка контактов пользователя
*/

import { mapGetters } from "vuex"

import ChatsListItem  from "@/components/ChatsListItem.vue"

export default {

    components: {
        ChatsListItem,
    },

    props: {
        propUserChatsList: {
            type: Array,
            required: true
        },

        propChatsFilterString: {
            type: String,
            required: true
        }
    },

    computed: {

        filteredChatsList: function() {

            /**
                * Автор:    Макаров Алексей
                * Описание: Фильтрация списка чатов по контакту
            */

            return this.propUserChatsList.filter(row => {
                return row.chat_id.name.toLowerCase().includes(this.propChatsFilterString.toLowerCase())
            })

        }

    }
    
}

</script>
