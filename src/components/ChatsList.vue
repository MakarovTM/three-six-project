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

                                :propChatId="chatsItem.chatId"
                                :propContactName="chatsItem.contactName"
                                :propChatLastMessage="chatsItem.chatLastMessage" 
                                :propChatLastMessageTs="chatsItem.chatLastMessageTs" 

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

import ChatsListItem from "@/components/ChatsListItem.vue"

export default {

    components: {
        ChatsListItem,
    },

    props: {
        propChatsFilterString: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            chatsList: [
                {
                    chatId: 1,
                    contactName: "Макаров Алексей",
                    chatLastMessage: "Привет мир",
                    chatLastMessageTs: "29 март 15:25"
                },
            ]
        }
    },

    computed: {

        filteredChatsList: function() {

            /**
                * Автор:    Макаров Алексей
                * Описание: Фильтрация списка чатов по контакту
            */

            return this.chatsList.filter(row => {
                return row.contactName.toLowerCase().includes(this.propChatsFilterString.toLowerCase())
            })

        }

    }
    
}

</script>
