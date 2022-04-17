<template>
    <BaseLayout>
        <template v-slot:messenger-left-frame>
            <ViewsHeader
                propViewHeaderTitle="Чаты"
            >
                <template v-slot:view-header-search-element>
                    <BaseInputWithIcon
                        propInputPlaceholder="Имя пользователя"
                        propInputSeparatedIcon="fluent:search-square-24-regular"
                        @updateInputValue="this.updateChatsFilterString"
                    />
                </template>
            </ViewsHeader>
            <ChatsList 
                :propChatsFilterString="this.chatsFilterString" 
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

import { mapActions } from "vuex"

import BaseLayout from "@/layouts/BaseLayout.vue"

import ChatsList from "@/components/ChatsList.vue"
import ViewsHeader from "@/components/Base/BaseViewsHeader.vue"

import BaseInputWithIcon from "@/components/Base/BaseInputWithIcon.vue"

import ChatView from "@/components/ChatView.vue"


export default {

    components: {
        ChatView,
        ChatsList,
        BaseLayout,
        ViewsHeader,
        BaseInputWithIcon
    },

    data() {
        return {
            chatsFilterString: ""
        }
    },

    methods: {

        ...mapActions([
            "chatsListUpdate",
            "checkUserSession",
            "updateSideBarActiveTab",
        ]),

        updateChatsFilterString: function(updatedChatsFilterString) {
        
            // Автор:       Макаров Алексей
            // Описание:    Выполнение обновления строки, 
            //              фильтрующей список чатов пользователя 

            this.chatsFilterString = updatedChatsFilterString

        }

    },

    mounted() {
        this.chatsListUpdate()
        this.checkUserSession()
        this.updateSideBarActiveTab(3)
        document.title = "Чаты пользователя"
    }
    
}
</script>
