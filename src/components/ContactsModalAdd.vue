<template>
	<BaseModal 
        propsModalTitle="Добавить контакт" 
        @closeModal="this.closeContactAddModal"
    >
		<template v-slot:modal-body-content>

            <BaseInputWithTitle
                v-if="this.foundUserProfile === null"
                propInputTitle="Адрес эл. почты пользователя"
                :propInputRegexPattern="showRegexPatterns.regexEmail.pattern"
                :propInputRegexPatternInvalidMessage="showRegexPatterns.regexEmail.message"
                @updateInputValue="this.updateSearchUserEmail"
                @updateInputValueValidation="this.updateSearchUserEmailValidation"
            />
            <ContactsModalAddFoundProfile
                v-if="this.foundUserProfile !== null"
                :propFoundUserProfile="this.foundUserProfile"
            />

            <div class="text-center p-4" v-if="this.foundUserProfileBlank">
                <p class="text-muted text-truncate mb-1">
                    Профиль пользователя не найден
                </p>
            </div>

		</template>
		<template v-slot:modal-footer-content>
            <BaseButton
                :propButtonTitle="this.contactAddButtonTittle"
                :propButtonDisabled="!this.searchUserEmailValidation" 
                @buttonClicked="this.contactAddButtonClicked()" 
            />
		</template>
	</BaseModal>
</template>


<script>

/**
    * Автор:    Макаров Алексей
    * Описание: Модальное окно для создания контакта с пользователем
*/

import axios from "axios"

import { mapGetters } from "vuex"

import BaseModal from "@/components/Base/BaseModal.vue"
import BaseButton from "@/components/Base/BaseButton.vue"
import BaseInputWithTitle from "@/components/Base/BaseInputWithTitle.vue"
import ContactsModalAddFoundProfile from "@/components/ContactsModalAddFoundProfile.vue"

export default {

    components: {
        BaseModal,
        BaseButton,
        BaseInputWithTitle,
        ContactsModalAddFoundProfile
    },

    data() {
        return {

            searchUserEmail: "",
            searchUserEmailValidation: false,

            foundUserProfile: null,
            foundUserProfileBlank: false,

            contactAddStage: 1

        }
    },
    
    methods: {

        updateSearchUserEmail: function(updatedSearchUserEmail) {
            this.searchUserEmail = updatedSearchUserEmail
        },

        updateSearchUserEmailValidation: function(updatedSearchUserEmailValidation) {
            this.searchUserEmailValidation = updatedSearchUserEmailValidation
        },

        closeContactAddModal: function() {
            this.$emit("closeAddContactModal")
        },

        contactAddButtonClicked: function() {
            
            /**
                * Автор:        Макаров Алексей
                * Описание:     Обработка нажатия кнопки сохранения
                *               формы на модальном окне создания контакта 
            */

            this.contactAddStage === 1 ? this.searchUserProfile() : this.foundUserProfileCreateContact()

        },

        searchUserProfile: function() {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Выполнение процесса поиска
                *               профиля пользователя по адресу эл. почты
            */

            let data = new FormData()

            data.append("email", this.searchUserEmail)

            let config = {
                method:  "POST",
                url:     `${this.showApiHost}/contacts/search`,
                headers: { 
                    "sessionToken": localStorage.getItem("sessionToken")
                },
                data:    data
            }

            axios(config)
            .then((response) => {
                switch (response.data.status) {
                    case 0: {
                        if (response.data.data.length === 0) {
                            this.foundUserProfileBlank = true
                        }
                        else {
                            this.foundUserProfile = response.data.data[0]

                            this.contactAddStage = 2
                            this.foundUserProfileBlank = false
                        }
                        break
                    }
                    case 1: {
                        this.$notify(
                            {
                                type: "warn",
                                text: response.data.reason
                            }
                        )
                    }
                }
            })
            .catch((error) => {
                this.$notify(
                    {
                        type: "danger",
                        text: "Произошла неизвестная ошибка"
                    }
                )
                console.log(error)
            })

        },

        foundUserProfileCreateContact: function() {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Создание контакта
                *               с найденным профилем пользователя 
            */

            let data = new FormData()

            data.append("contact_to", this.foundUserProfile.id)
            data.append("contact_from", localStorage.getItem("userId"))

            let config = {
                url:     `${this.showApiHost}/contacts/add`,
                method:  "POST",
                headers: { 
                    "sessionToken": localStorage.getItem("sessionToken")
                },
                data:    data
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
                        this.closeContactAddModal()
                        break
                    }
                    case 1: {
                        this.$notify(
                            {
                                type: "warn",
                                text: response.data.reason
                            }
                        )
                        this.closeContactAddModal()
                        break
                    }
                }
            })
            .catch((error) => {
                this.$notify(
                    {
                        type: "danger",
                        text: "Произошла неизвестная ошибка"
                    }
                )
                console.log(error)
            })

        }

    },

    computed: {

        ...mapGetters(
            [
                "showApiHost",
                "showRegexPatterns"
            ]
        ),

        contactAddButtonTittle: function() {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Вычисление имени кнопки формы 
            */

            return this.foundUserProfile == null ? "Поиск" : "Добавить"

        },

    }

}
</script>
