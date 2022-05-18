<template>

    <ChatsModalAdd
        v-if="this.showChatsAddModalStatus"
        @closeChatAddModal="this.chatAddModalAction(2)"
    />

    <BaseLayout>
        <template v-slot:messenger-left-frame>
            <ViewsHeader
                propViewHeaderTitle="Чаты"
                propViewHeaderModalIcon="material-symbols:chat-add-on"
                @modalOpenButtonClicked="this.chatAddModalAction(1)"
            >
                <template v-slot:view-header-search-element>
                    <BaseInputWithIcon
                        propInputPlaceholder="Заголовок чата"
                        propInputSeparatedIcon="fluent:search-square-24-regular"
                        @updateInputValue="this.updateChatsListFilterString"
                    />
                </template>
            </ViewsHeader>

            <LoadingPage
                v-if="this.chatsListIsLoading"
            />

            <ChatsList
                v-if="!this.chatsListIsLoading"
                :propUserChatsList="this.chatsList"
                :propChatsFilterString="this.chatsListFilterString"
            />

        </template>
        <template v-slot:messenger-right-frame>
            <ChatView />
        </template>
    </BaseLayout>

</template>


<script>

/**
    * Автор:        Макаров Алексей
    * Описание:     Представление для просмотра списка чатов пользователя 
*/

import axios from "axios"

import { mapActions, mapGetters } from "vuex"

import BaseLayout from "@/layouts/BaseLayout.vue"

import LoadingPage from "@/plugs/LoadingPage.vue"

import ChatView from "@/components/ChatView.vue"
import ChatsList from "@/components/ChatsList.vue"
import ChatsModalAdd from "@/components/ChatsModalAdd.vue"

import ViewsHeader from "@/components/Base/BaseViewsHeader.vue"
import BaseInputWithIcon from "@/components/Base/BaseInputWithIcon.vue"


export default {

    components: {
        ChatView,
        ChatsList,
        LoadingPage,
        ChatsModalAdd,
        BaseLayout,
        ViewsHeader,
        BaseInputWithIcon
    },

    data() {
        return {
            chatsList: [],
            chatsListIsLoading: true,
            chatsListFilterString: ""
        }
    },

    methods: {

        ...mapActions([
            "updateSideBarActiveTab",
            "updateChatsAddModalStatus"
        ]),

        updateChatsListFilterString: function(updatedChatsListFilterString) {
            this.chatsListFilterString = updatedChatsListFilterString
        },

        chatAddModalAction: function(mode) {

            /**
                * Автор:    Макаров Алексей
                * Описание: Выполнение закрытия
                *           модального окна по добавлению контактов 
            */

            if (mode === 1) {
                this.updateChatsAddModalStatus()
            }

            if (mode == 2) {
                 this.updateChatsAddModalStatus()
            }

        },

        updateUserChatsList: function() {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Выполнение
                *               обновления списка чатов пользователя 
            */


            let config = {
                method:  "GET",
                url:     `${this.showApiHost}/chats/${localStorage.getItem("userId")}`,
                headers: { 
                    "sessionToken": localStorage.getItem("sessionToken")
                }
            }

            axios(config)
            .then((response) => {
                switch (response.data.status) {
                    case 0: {
                        this.$notify(
                            {
                                type: "success",
                                text: response.data.reason
                            }
                        )
                        this.chatsList = response.data.data
                        this.chatsListIsLoading = false
                        break
                    }
                    case 1: {
                        this.$notify(
                            {
                                type: "warn",
                                text: response.data.reason
                            }
                        )
                        break
                    }
                }
            })
            .catch((error) => {
                this.$notify(
                    {
                        type: "danger",
                        text: "Произошла неизвестная ошибка при выполнении запроса"
                    }
                )
                console.log(error)
            });

        }

    },

    computed: {

        ...mapGetters([
            "showApiHost",
            "showChatsAddModalStatus"
        ])

    },

    mounted() {
        this.updateUserChatsList()
        this.updateSideBarActiveTab(2)
        document.title = "Чаты пользователя"
    }
    
}
</script>
