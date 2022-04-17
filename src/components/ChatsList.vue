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

                                :propChatId="chatsItem.id"
                                :propContactName="chatsItem.recipientName"
                                :propChatLastMessage="chatsItem.chatLastMessage" 
                                :propChatLastMessageTs="chatsItem.ts" 

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
        propChatsFilterString: {
            type: String,
            required: true
        }
    },

    computed: {

        ...mapGetters([
            "showChatsList"
        ]),

        parserChatsList: function() {
            
            /**
                * Автор:        Макаров Алексей
                * Описание:     Выполнение обработки загруженного списка чатов 
            */

            var parsedChatsList = []

            for (let chatItem of this.showChatsList) {

                if (parseInt(localStorage.userId) === chatItem.contactOne.id) {
                    var recipientData = chatItem.contactTwo
                } else {
                    var recipientData = chatItem.contactOne
                }

                parsedChatsList.push({
                    id: chatItem.id,
                    ts: chatItem.updateTs,
                    recipientName: recipientData.name,
                    chatLastMessage: chatItem.fullRead
                })

            }

            return parsedChatsList


        },

        filteredChatsList: function() {

            /**
                * Автор:    Макаров Алексей
                * Описание: Фильтрация списка чатов по контакту
            */

            return this.parserChatsList.filter(row => {
                return row.recipientName.toLowerCase().includes(this.propChatsFilterString.toLowerCase())
            })

        }

    }
    
}

</script>
