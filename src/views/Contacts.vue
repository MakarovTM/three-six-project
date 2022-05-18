<template>

    <ContactsModalAdd
        v-if="this.showContactsAddModalStatus"
        @closeAddContactModal="this.contactAddModalAction(2)"
    />

    <BaseLayout>
        <template v-slot:messenger-left-frame>
            <ViewsHeader
                propViewHeaderTitle="Контакты"
                propViewHeaderModalIcon="akar-icons:person-add"
                @modalOpenButtonClicked="this.contactAddModalAction(1)"
            >
                <template v-slot:view-header-search-element>
                    <BaseInputWithIcon
                        propInputPlaceholder="Имя пользователя"
                        propInputSeparatedIcon="fluent:search-square-24-regular"
                        @updateInputValue="this.updateUserContactsFilterString"
                    />
                </template>

            </ViewsHeader>

            <LoadingPage
                v-if="this.contactsListIsLoading"
            />

            <ContactsList 
                v-if="!this.contactsListIsLoading"
                :propUserContactsList="this.contactsList"
                :propUserContactsListFilterString="this.contactsFilterString"
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

import axios from "axios"

import { mapActions, mapGetters } from "vuex"

import BaseLayout from "@/layouts/BaseLayout.vue"

import ViewsHeader from "@/components/Base/BaseViewsHeader.vue"

import ContactsList from "@/components/ContactsList.vue"

import ContactsModalAdd from "@/components/ContactsModalAdd.vue"

import BaseInputWithIcon from "@/components/Base/BaseInputWithIcon.vue"

import ChatView from "@/components/ChatView.vue"

import LoadingPage from "@/plugs/LoadingPage.vue"

export default {

    components: {
        ChatView,
        BaseLayout,
        ViewsHeader,
        LoadingPage,
        ContactsList,
        ContactsModalAdd,
        BaseInputWithIcon,
    },

    data() {
        return {

            contactsList: [],
            contactsListIsLoading: true,

            contactsFilterString: "",

            contactsModalTreatOpened: false,

        }
    },

    computed: {
        
        ...mapGetters(
            [
                "showApiHost",
                "showContactsAddModalStatus"
            ]
        )

    },

    methods: {

        ...mapActions([
            "updateSideBarActiveTab",
            "updateContactsAddModalStatus"
        ]),

        contactAddModalAction: function(mode) {

            /**
                * Автор:    Макаров Алексей
                * Описание: Выполнение закрытия
                *           модального окна по добавлению контактов 
            */

            if (mode === 1) {
                this.updateContactsAddModalStatus()
            }

            if (mode === 2) {
                this.updateUserContactsList()
                this.updateContactsAddModalStatus()
            }

        },

        updateUserContactsFilterString: function(updatedUserContactsFilterString) {
           this.contactsFilterString = updatedUserContactsFilterString
        },

        updateUserContactsList: function() {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Выполнение загрузки списка контактов пользователя 
            */

            this.contactsListIsLoading = true

            let config = {
                url:     `${this.showApiHost}/contacts/${localStorage.getItem("userId")}`,
                method:  "GET",
                headers: { 
                    "sessionToken": localStorage.getItem("sessionToken")
                }
            }

            axios(config)
            .then((response) => {
                switch(response.data.status) {
                    case 0: {
                        this.$notify(
                            {
                                type: "success",
                                text: response.data.reason
                            }
                        )
                        this.contactsList = response.data.data
                        this.contactsListIsLoading = false
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
                console.log(error);
            })

        },

    },

    mounted() {
        this.updateUserContactsList()
        this.updateSideBarActiveTab(1)
        document.title = "Контакты пользователя"
    }

}
</script>
