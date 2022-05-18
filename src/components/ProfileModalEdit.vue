<template>
	<BaseModal 
        propsModalTitle="Изменить профиль" 
        @closeModal="this.closeProfileEditModal"
    >
		<template v-slot:modal-body-content>
            <BaseInputWithTitle
                propInputTitle="Имя пользователя"
                :propInputValue="this.propUserFullName"
                :propInputRegexPattern="showRegexPatterns.regexUserFullName.pattern"
                :propInputRegexPatternInvalidMessage="showRegexPatterns.regexUserFullName.message"
                @updateInputValue="this.updateEditedUserFullName"
                @updateInputValueValidation="this.updateEditedUserFullNameValidation"
            />
            <BaseInputWithTitle
                propInputTitle=" О себе"
                :propInputValue="this.propUserAbout"
                :propInputRegexPattern="showRegexPatterns.regexUserAbout.pattern"
                :propInputRegexPatternInvalidMessage="showRegexPatterns.regexUserAbout.message"
                @updateInputValue="this.updateEditedUserAbout"
                @updateInputValueValidation="this.updateEditedUserAboutValidation"
            />
		</template>
		<template v-slot:modal-footer-content>
            <BaseButton
                propButtonTitle="Сохранить" 
                :propButtonDisabled="!(this.editedUserFullNameValidation && this.editedUserAboutValidation)" 
                @buttonClicked="this.updateUserProfileData" 
            />
		</template>
	</BaseModal>
</template>


<script>

/**
    * Автор:    Макаров Алексей
    * Описание: Модальное окно для изменения информаци о пользователе
*/
import axios from "axios"

import { mapGetters } from "vuex"

import BaseModal from "@/components/Base/BaseModal.vue"

import BaseButton from "@/components/Base/BaseButton.vue"
import BaseInputWithTitle from "./Base/BaseInputWithTitle.vue"

export default {

    components: {
        BaseModal,
        BaseButton,
        BaseInputWithTitle
    },

    props: {
        propUserFullName: {
            type: String,
            required: true
        },
        propUserAbout: {
            type: String,
            required: true
        }
    },

    data() {
        return {

            editedUserFullName: this.propUserFullName,
            editedUserFullNameValidation: false,

            editeddUserAbout: this.propUserAbout,
            editedUserAboutValidation: false

        }
    },
    
    methods: {

        updateEditedUserFullName: function(updatedUserFullName)  {
            this.editedUserFullName = updatedUserFullName
        },

        updateEditedUserFullNameValidation: function(updatedEditedUserFullNameValidation) {
            this.editedUserFullNameValidation = updatedEditedUserFullNameValidation
        },

        updateEditedUserAbout: function(updatedEditeddUserAbout) {
            this.editeddUserAbout = updatedEditeddUserAbout
        },

        updateEditedUserAboutValidation: function(updatedEditedUserAboutValidation) {
            this.editedUserAboutValidation = updatedEditedUserAboutValidation
        },

        closeProfileEditModal: function() {

            /**
                * Автор:    Макаров Алексей
                * Описание: Отправляем в родитель событие для свертывания модального окна
            */

            this.$emit("closeProfileEditModal")

        },

        updateUserProfileData: function() {

            /**
                * Автор:    Макаров Алексей
                * Описание: Выполнение обновления
                *           информации о пользователе 
            */

            let data = new FormData();

            data.append("full_name", this.editedUserFullName);
            data.append("about", this.editeddUserAbout);

            let config = {
                url:     `${this.showApiHost}/users/update/${localStorage.userId}`,
                method:  "PATCH",
                headers: {
                    "sessionToken": localStorage.sessionToken
                },
                data:    data
            }

            axios(config)
                .then((response) => {
                    switch (response.data.status) {
                        case -1:
                            this.$notify(
                                {
                                    type: "error",
                                    text: response.data.reason
                                }
                            )
                            break
                        case 0:
                            this.$notify(
                                {
                                    type: "success",
                                    text: response.data.reason
                                }
                            )
                            this.closeProfileEditModal()
                            break
                        case 1:
                            console.log("here")
                            this.$notify(
                                {
                                    type: "warn",
                                    text: response.data.reason
                                }
                            )
                            break
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

        }

    },

    computed: {

        ...mapGetters([
            "showApiHost",
            "showRegexPatterns"
        ]),

    }

}
</script>
