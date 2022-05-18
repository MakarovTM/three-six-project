<template>
    <BareLayout>
        <template v-slot:messenger-centered-card>
            <div class="col-md-8 col-lg-6 col-xl-5">
                <div class="text-center mb-4">
                    <h4>Выполните авторизацию пользователя</h4>
                </div>
                <div class="card">
                    <div class="card-body p-4">
                        <div class="p-3">

                            <BaseInputWithTitle
                                v-if="this.signInStage == 1" 
                                propInputTitle="Введите адрес эл. почты"
                                :propInputRegexPattern="showRegexPatterns.regexEmail.pattern"
                                :propInputRegexPatternInvalidMessage="showRegexPatterns.regexEmail.message"
                                @updateInputValue="this.updateUserEmail"
                                @updateInputValueValidation="this.updateUserEmailValidation"
                            />

                            <BaseInputWithTitle
                                v-if="this.signInStage == 2" 
                                propInputTitle="Введите одноразовый код доступа"
                                :propInputRegexPattern="showRegexPatterns.regexDigitsOnly.pattern"
                                :propInputRegexPatternInvalidMessage="showRegexPatterns.regexDigitsOnly.message"
                                @updateInputValue="this.updateUserAccessCode"
                                @updateInputValueValidation="this.updateUserAccessCodeValidation"
                            />

                            <BaseButton
                                :propButtonTitle="this.signInButtonTitle"
                                :propButtonDisabled="!(this.userEmailValidation || this.userAccessCodeValidation)"
                                @buttonClicked="this.userSignUp"
                            />

                        </div>
                    </div>
                </div>

                <div class="text-center mb-4">
                    <router-link class="nav-link" :to="{ name : 'SignUp' }">
                        Создать аккаунт
		            </router-link>
                </div>

            </div>
        </template>
    </BareLayout>
</template>


<script>

/**
    * Автор:        Макаров Алексей
    * Описание:     Страница авторизации пользователя
*/

import axios from "axios";

import { mapGetters } from "vuex"

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

            signInStage: 1,

            signInToken: null,

            userEmail: "",
            userEmailValidation: false,

            userAccessCode: "",
            userAccessCodeValidation: false

        }
    },

    methods: {

        updateUserEmail: function(updatedUserEmail) {
            this.userEmail = updatedUserEmail
        },

        updateUserEmailValidation: function(updatedUserEmailValidation) {
            this.userEmailValidation = updatedUserEmailValidation
        },

        updateUserAccessCode: function(updatedUserAccessCode) {
            this.userAccessCode = updatedUserAccessCode
        },

        updateUserAccessCodeValidation: function(updatedUserAccessCodeValidation) {
            this.userAccessCodeValidation = updatedUserAccessCodeValidation
        },

        checkUserEmail: function() {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Выполнение проверки имени пользователя
            */

            var formdata = new FormData()

            formdata.append("email", this.userEmail)

            let config = {
                url:    `${this.showApiHost}/users/login/code/create`,
                data:   formdata,
                method: 'POST',
            }

            axios(config)
                .then((response) => {
                    switch (response.data.status) {
                        case 0:
                            this.signInStage   = 2
                            this.signInToken = response.data.accessToken
                            break
                        case 1:
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
                    this.$notify(
                        {
                            type: "danger",
                            text: "Произошла неизвестная ошибка при выполнеии запроса"
                        }
                    )
                    console.log(error)
                });

        },

        checkUserAccessCode: function() {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Выполнение проверки кода пользователя
            */

            var formdata = new FormData()

            formdata.append("code", this.userAccessCode)
            formdata.append("token", this.signInToken)

            let config = {
                url:    `${this.showApiHost}/users/login/code/check`,
                data:   formdata,
                method: 'POST',
            }

            axios(config)
                .then((response) => {
                    switch (response.data.status) {
                        case 0:
                            localStorage.setItem("userId", response.data.userId)
                            localStorage.setItem("sessionToken", response.data.sessionToken)
                            this.$router.push({name: "Chats"})
                        case 1:
                            this.$notify(
                                {
                                    type: "warn",
                                    text: response.data.reason
                                }
                            )
                    }
                })
                .catch((error) => {
                    this.$notify(
                        {
                            type: "danger",
                            text: "Произошла неизвестная ошибка при выполнеии запроса"
                        }
                    )
                    console.log(error);
                })

        },

        userSignUp: function() {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Выполнение авторизации пользователя 
            */

            if (this.signInStage == 1) {
                this.checkUserEmail()
            }

            if (this.signInStage == 2) {
                this.checkUserAccessCode()
            }

        }

    },

    computed: {

        ...mapGetters([
            "showApiHost",
            "showRegexPatterns"
        ]),

        signInButtonTitle: function() {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Генерирование текста на кнопке авторизации 
            */

            return this.signInStage == 1 ? "Получить код" : "Войти"

        },

    },

    mounted() {
        document.title = "Авторизация пользователя"
        localStorage.removeItem("userId")
        localStorage.removeItem("sessionToken")
    }
    
}

</script>
