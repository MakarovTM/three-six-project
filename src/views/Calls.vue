<template>
    <BaseLayout>
        <template v-slot:messenger-left-frame>
            <ViewsHeader
                propViewHeaderTitle="История звонков"
            >
                <template v-slot:view-header-search-element>
                    <BaseInputWithIcon
                        propInputPlaceholder="Имя пользователя"
                        propInputSeparatedIcon="fluent:search-square-24-regular"
                        @updateInputValue="this.updateCallsFilterString"
                    />
                </template>
            </ViewsHeader>
            <CallsList 
                :propCallsFilterString="this.callsFilterString" 
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
    * Описание:     Представление для просмотра списка звонков пользователя 
*/

import { mapActions } from "vuex"

import BaseLayout from "@/layouts/BaseLayout.vue"

import CallsList from "@/components/CallsList.vue"
import ViewsHeader from "@/components/Base/BaseViewsHeader.vue"

import BaseInputWithIcon from "@/components/Base/BaseInputWithIcon.vue"

import ChatView from "@/components/ChatView.vue"

export default {

    components: {
        ChatView,
        CallsList,
        BaseLayout,
        ViewsHeader,
        BaseInputWithIcon
    },

    data() {
        return {
            callsFilterString: ""
        }
    },

    methods: {

        ...mapActions([
            "checkUserSession",
            "updateSideBarActiveTab"
        ]),

        updateCallsFilterString: function(updatedCallsString) {
        
            // Автор:       Макаров Алексей
            // Описание:    Выполнение обновления строки, 
            //              фильтрующей список звонков пользователя 

            this.callsFilterString = updatedCallsString

        }

    },
    
    mounted() {
        this.checkUserSession()
        this.updateSideBarActiveTab(2)
        document.title = "Звонки пользователя"
    }
    
}
</script>