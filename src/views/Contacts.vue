<template>

    <ContactsModalTreat
        v-if="this.contactsModalTreatOpened"
        @closeTreatContactModal="this.changeModalTreatOpenStatus"
    />

    <BaseLayout>
        <template v-slot:messenger-left-frame>
            <ViewsHeader
                propViewHeaderTitle="Контакты"
                propViewHeaderModalIcon="akar-icons:person-add"
                @modalOpenButtonClicked="this.changeModalTreatOpenStatus"
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
    </BaseLayout>

</template>


<script>

/**
    * Автор:    Макаров Алексей
    * Описание: Представление для просмотра списка контактов пользователя
*/

import { mapActions } from "vuex"

import BaseLayout from "@/layouts/BaseLayout.vue"

import ViewsHeader from "@/components/Base/BaseViewsHeader.vue"

import ContactsList from "@/components/ContactsList.vue"
import ContactsModalTreat from "@/components/ContactsModalTreat.vue"

import BaseInputWithIcon from "@/components/Base/BaseInputWithIcon.vue"

export default {

    components: {
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

    methods: {

        ...mapActions([
            "checkUserSession"
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
        document.title = "Контакты пользователя"
    }

}
</script>
