<template>

    <ContactsModalTreat
        v-if="this.showContactsModalStatus"
        @closeTreatContactModal="this.contactsModalStatusUpdate"
    />

    <BaseLayout>
        <template v-slot:messenger-left-frame>
            <ViewsHeader
                propViewHeaderTitle="Контакты"
                propViewHeaderModalIcon="akar-icons:person-add"
                @modalOpenButtonClicked="this.contactsModalStatusUpdate"
            >
                <template v-slot:view-header-search-element>
                    <BaseInputWithIcon
                        propInputPlaceholder="Имя пользователя"
                        propInputSeparatedIcon="fluent:search-square-24-regular"
                        @updateInputValue="this.updateContactsFilterString"
                    />
                </template>
            </ViewsHeader>

            <ContactsList 
                :propContactsFilterString="this.contactsFilterString" 
            />
        </template>
        <template v-slot:messenger-right-frame>
            <ChatView />
        </template>
    </BaseLayout>

</template>


<script>

/**
    * Автор:    Макаров Алексей
    * Описание: Представление для просмотра списка контактов пользователя
*/

import { mapActions, mapGetters } from "vuex"

import BaseLayout from "@/layouts/BaseLayout.vue"

import ViewsHeader from "@/components/Base/BaseViewsHeader.vue"

import ContactsList from "@/components/ContactsList.vue"
import ContactsModalTreat from "@/components/ContactsModalTreat.vue"

import BaseInputWithIcon from "@/components/Base/BaseInputWithIcon.vue"

import ChatView from "@/components/ChatView.vue"

export default {

    components: {
        ChatView,
        BaseLayout,
        ViewsHeader,
        ContactsList,
        BaseInputWithIcon,
        ContactsModalTreat
    },

    data() {
        return {
            contactsFilterString: "",
            contactsModalTreatOpened: false,
        }
    },

    computed: {
        ...mapGetters([
            "showContactsModalStatus"
        ])
    },

    methods: {

        ...mapActions([
            "checkUserSession",
            "updateSideBarActiveTab",

            "contactsListUpdate",
            "contactsModalStatusUpdate"
        ]),

        changeModalTreatOpenStatus: function() {

            /**
                * Автор:    Макаров Алексей
                * Описание: Изменение статуса отображения
                *           модального окна приглашения пользователя
            */

           this.contactsModalTreatOpened = !this.contactsModalTreatOpened

        },

        updateContactsFilterString: function(updatedFilterString) {

            /**
                * Автор:    Макаров Алексей
                * Описание: Выполнение обновления параметра фильтрации данных 
            */
           
           this.contactsFilterString = updatedFilterString

        }

    },

    mounted() {
        this.checkUserSession()
        this.updateSideBarActiveTab(1)
        document.title = "Контакты пользователя"

        this.contactsListUpdate()

    }

}
</script>
