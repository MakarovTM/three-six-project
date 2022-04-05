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


export default {

    components: {
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
            "checkUserSession"
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
        document.title = "Звонки пользователя"
    }
    
}
</script>