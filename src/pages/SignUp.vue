<template>
    <BareLayout>
        <template v-slot:messenger-centered-card>
            <div class="col-md-8 col-lg-6 col-xl-5">
                <div class="text-center mb-4">
                    <h4>Регистрация пользователя</h4>
                </div>
                <div class="card">
                    <div class="card-body p-4">
                        <div class="p-3">

                            <BaseInputWithTitle 
                                propInputTitle="Введите адрес эл. почты"
                                :propInputRegexPattern="showRegexPatterns.regexEmail.pattern"
                                :propInputRegexPatternInvalidMessage="showRegexPatterns.regexEmail.message"
                                @updateInputValue="this.updateUserEmail"
                                @updateInputValueValidation="this.updateUserEmailValidation"
                            />

                            <BaseInputWithTitle 
                                propInputTitle="Введите имя пользователя"
                                :propInputRegexPattern="showRegexPatterns.regexUserFullName.pattern"
                                :propInputRegexPatternInvalidMessage="showRegexPatterns.regexUserFullName.message"
                                @updateInputValue="this.updateUserFullName"
                                @updateInputValueValidation="this.updateUserFullNameValidation"
                            />

                            <BaseInputWithTitle 
                                propInputTitle="О себе"
                                :propInputRegexPattern="showRegexPatterns.regexUserAbout.pattern"
                                :propInputRegexPatternInvalidMessage="showRegexPatterns.regexUserAbout.message"
                                @updateInputValue="this.updateUserAbout"
                                @updateInputValueValidation="this.updateUserAboutValidation"
                            />

                            <BaseButton
                                propButtonTitle="Зарегистрироваться"
                                :propButtonDisabled="!this.formDataValidated"
                                @buttonClicked="this.userSignUp"
                            />

                        </div>
                    </div>
                </div>

                <div class="text-center mb-4">
                    <p class="text-muted mb-4"> </p>
                    <router-link class="nav-link" :to="{ name : 'SignIn' }">
                        Страница авторизации
		            </router-link>
                </div>

            </div>
        </template>
    </BareLayout>
</template>


<script>

/**
    * Автор:                Макаров Алексей
    * Описание:             Страница авторизации пользователя
*/

import axios from "axios"

import { mapActions, mapGetters } from "vuex"

import BareLayout from "@/layouts/BareLayout.vue"

import BaseButton from "@/components/Base/BaseButton.vue"
import BaseInputWithTitle from "@/components/Base/BaseInputWithTitle.vue"


export default {

    components: {
        BareLayout,
        BaseButton,
        BaseInputWithTitle,

    },
    
    data() {
        return {

            userAbout: null,
            userAboutValidation: false,

            userEmail: null,
            userEmailValidation: false,

            userFullName: null,
            userFullNameValidation: false

        }
    },

    methods: {

        ...mapActions([
            "singInAccessCode"
        ]),

        updateUserEmail: function(updatedUserEmail) {
            this.userEmail = updatedUserEmail
        },

        updateUserEmailValidation: function(updatedUserEmailValidation) {
            this.userEmailValidation = updatedUserEmailValidation
        },

        updateUserAbout: function(updatedUserAbout) {
            this.userAbout = updatedUserAbout
        },

        updateUserAboutValidation: function(updatedUserAboutValidation) {
            this.userAboutValidation = updatedUserAboutValidation
        },

        updateUserFullName: function(updatedUserFullName) {
            this.userFullName = updatedUserFullName
        },

        updateUserFullNameValidation: function(updatedUserFullNameValidation) {
            this.userFullNameValidation = updatedUserFullNameValidation
        },

        userSignUp: function() {

            /**
                * Автор:    Макаров Алексей
                * Описание: Создание аккаунта пользователя
            */

            let data = new FormData()

            data.append("email", this.userEmail)
            data.append("about", this.userAbout)
            data.append("full_name", this.userFullName)

            let config = {
                url:    `${this.showApiHost}/users/create`,
                data :   data,
                method: "POST",
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
                            this.$router.push(
                                {
                                    name: "SignIn"
                                }
                            )
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
                           text: "Произошла неизвестная ошибка"
                       }
                   )
                   console.log(error)
                });

        }

    },

    computed: {

        ...mapGetters(
            [
                "showApiHost",
                "showRegexPatterns"
            ]
        ),

        formDataValidated: function() {

            /**
                * Автор:    Макаров Алексей
                * Описание: Выполнение проверки полей формы    
            */

            return this.userAboutValidation && this.userEmailValidation && this.userFullNameValidation

        }

    },

    mounted() {

        /**
            * Автор:        Макаров Алексей
            * Описание:     Жизненный хук приложения
        */

        document.title = "Создание аккаунта пользователя"
    }
    
}

</script>
