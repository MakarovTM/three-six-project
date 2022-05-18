<template>
    <div :class="this.chatViewClass">
        <div class="d-lg-flex">
            <div class="w-100 overflow-hidden position-relative">
                <div class="p-3 p-lg-4 border-bottom user-chat-topbar">
                    <div class="row align-items-center">
                        <div class="col-sm-10 col-10">
                            <div class="d-flex align-items-center">
                                <div class="d-block d-lg-none me-2 ms-0" v-if="this.showChatViewMode == 1">
                                    <a
                                        href="#"
			                            class="user-chat-remove text-muted font-size-16 p-2"
			                            @click="this.chatViewClosedUpdate"
		                            >
			                            <Icon icon="bx:arrow-back" />
		                            </a>
                                </div>
                                <div class="me-3 ms-0">
                                    <div class="avatar-xs">
                                        <span class="avatar-title rounded-circle bg-soft-primary text-primary">
                                            {{ this.messageRecipient.name.charAt(0) }}
                                        </span>
                                    </div>
                                </div>
                                <div class="flex-grow-1 overflow-hidden">
                                    <h5 class="font-size-16 mb-0 text-truncate">
                                        {{ this.messageRecipient.name }}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="chat-conversation p-3 p-lg-4" data-simplebar="init">
                    <div class="simplebar-wrapper" style="margin: -24px;">
                        <div class="simplebar-mask">
                            <div class="simplebar-offset" style="right: -20px; bottom: 0px;">
                                <div class="simplebar-content-wrapper" style="height: 100%; padding-right: 20px; padding-bottom: 0px; overflow: hidden scroll;">
                                    <div class="simplebar-content" style="padding: 24px;">
                                        <ul class="list-unstyled mb-0">
                                            <ChatViewMessage 
                                                v-for="chatMessage in this.chatMessages" :key="chatMessage.id"
                                                :propMessageAlign="this.checkMessageShowClass(chatMessage.sender.id)"
                                                :propMessageAuthor="this.checkMessageShowClass(chatMessage.sender.id) ? chatMessage.sender.name : chatMessage.recipient.name"
                                                :propMessageContent="chatMessage.messageText"
                                                :propMessageTimeStamp="chatMessage.ts"
                                            />
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="simplebar-placeholder" style="width: auto; height: 1178px;"></div>
                    </div>
                    <div class="simplebar-track simplebar-horizontal" style="visibility: hidden;"><div class="simplebar-scrollbar" style="transform: translate3d(0px, 0px, 0px); display: none;"></div></div>
                    <div class="simplebar-track simplebar-vertical" style="visibility: visible;"><div class="simplebar-scrollbar" style="height: 257px; transform: translate3d(0px, 0px, 0px); display: block;"></div></div>
                </div>

                <div class="chat-input-section p-3 p-lg-4 border-top mb-0">
                    <BaseInputWithButton
                        propInputButtonIcon="bi:send-fill"
                        propInputPlaceHolder="Сообщение"
                    />
                </div>

            </div>    
        </div>
    </div>
</template>


<script>

/**
    * Автор:        Макаров Алексей
    * Описание:     Представление для отображения чата  
*/

import ChatViewMessage from "@/components/ChatViewMessage.vue"
import BaseInputWithButton from "@/components/Base/BaseInputWithButton.vue"

import { Icon } from '@iconify/vue'

import { mapActions, mapGetters } from 'vuex'

export default {

    components: {
        Icon,
        ChatViewMessage,
        BaseInputWithButton
    },

    data() {
        return {

            chatData: {
                chatId: 1,
                contactOne: {
                    id: 3,
                    name: "Макаров Алексей"
                },
                contactTwo: {
                    id: 2,
                    name: "Иван Иванов"
                }
            },

            chatMessages: 
                [
                    {
                        id: 1,
                        chatId: 1,
                        sender: {
                            id: 3,
                            name: "Макаров Алексей"
                        },
                        recipient: {
                            id: 2,
                            name: "Иван Иванов"
                        },
                        messageText: "Привет Ваня!",
                        ts: "2022-04-17 11:52"
                    },
                    {
                        id: 2,
                        chatId: 1,
                        sender: {
                            id: 2,
                            name: "Макаров Алексей"
                        },
                        recipient: {
                            id: 3,
                            name: "Иван Иванов"
                        },
                        messageText: "Привет Леша! Как твои дела?",
                        ts: "2022-04-17 11:52"
                    },
                    {
                        id: 2,
                        chatId: 1,
                        sender: {
                            id: 2,
                            name: "Макаров Алексей"
                        },
                        recipient: {
                            id: 3,
                            name: "Иван Иванов"
                        },
                        messageText: "Привет Леша! Как твои дела?",
                        ts: "2022-04-17 11:52"
                    },
                    {
                        id: 2,
                        chatId: 1,
                        sender: {
                            id: 2,
                            name: "Макаров Алексей"
                        },
                        recipient: {
                            id: 3,
                            name: "Иван Иванов"
                        },
                        messageText: "Привет Леша! Как твои дела?",
                        ts: "2022-04-17 11:52"
                    },
                    {
                        id: 2,
                        chatId: 1,
                        sender: {
                            id: 2,
                            name: "Макаров Алексей"
                        },
                        recipient: {
                            id: 3,
                            name: "Иван Иванов"
                        },
                        messageText: "Привет Леша! Как твои дела?",
                        ts: "2022-04-17 11:52"
                    }
                ]
        }
    },

    methods: {

        ...mapActions([
            "chatViewClosedUpdate"
        ]),

        checkMessageShowClass: function(userId) {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Определение параметров просмотра сообщения
            */

            return parseInt(localStorage.userId) == userId ? true : false
        }

    },

    computed: {

        ...mapGetters([
            "showChatViewMode",
            "showChatViewOpened",
            "showChatViewClosed"
        ]),

        chatViewClass: function() {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Определение параметров просмотра окна с чатом
            */


            if (this.showChatViewMode === 2) {
                return "user-chat w-100 overflow-hidden user-chat-show"
            }

            if (this.showChatViewMode === 1 && this.showChatViewOpened === true && this.showChatViewClosed === false)  {
                return "user-chat w-100 overflow-hidden user-chat-show"
            }

            if (this.showChatViewMode === 1 && this.showChatViewOpened === false && this.showChatViewClosed === true)  {
                return "user-chat w-100 overflow-hidden"
            }

            if (this.showChatViewMode === 1 && this.showChatViewOpened === false && this.showChatViewClosed === false) {
                return "user-chat w-100 overflow-hidden"
            }

        },

        messageRecipient: function() {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Определение заголовка чата, те получателя сообщений 
            */

            return parseInt(localStorage.userId) === this.chatData.contactOne.id ? this.chatData.contactTwo : this.chatData.contactOne

        }

    }
    
}

</script>

<style scoped>
    .flex-grow-1.overflow-hidden {
        margin-left: 20px;
    }
</style>
