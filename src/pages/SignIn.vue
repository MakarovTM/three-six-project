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
                                @updateInputValue="this.updateUserEmail" 
                            />

                            <BaseInputWithTitle 
                                v-if="this.signInStage == 2" 
                                propInputTitle="Введите полученный код" 
                                @updateInputValue="this.updateAccessCode" 
                            />

                            <div class="d-grid">
                                <button 
                                    style="width: 100%;" 
                                    class="btn btn-primary waves-effect waves-light" 
                                    @click="this.signInButtonClicked"
                                >
                                    {{ this.signInButtonTitle }}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="text-center mb-4">
                    <p class="text-muted mb-4"> {{ this.signInMessage }} </p>
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

import BaseInputWithTitle from "@/components/Base/BaseInputWithTitle.vue"


export default {

    components: {

        BareLayout,
        BaseInputWithTitle,

    },
    
    data() {
        return {

            signInStage: 1,
            signInMessage: "",

            userEmail: "",
            userAccessCode: "",

        }
    },

    methods: {

        updateUserEmail:  function(updatedUserEmail)  { this.userEmail      = updatedUserEmail  },
        updateAccessCode: function(updatedAccessCode) { this.userAccessCode = updatedAccessCode },

        checkUserEmail: function() {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Выполнение проверки имени пользователя
            */

            var formdata = new FormData()

            formdata.append("mail", this.userEmail)

            let config = {
                url:    `${this.showApiHost}users/signIn/`,
                data:   formdata,
                method: 'POST',
            }

            axios(config)
                .then((response) => {
                    switch (response.data.status) {
                        case 0:
                            this.signInStage   = 2
                            this.signInMessage = response.data.message
                        case 1:
                            this.signInMessage = response.data.message
                        case 2:
                            this.signInMessage = response.data.message
                            
                            response.data.message
                    }
                })
                .catch((error) => {
                    this.signInMessage = "Произошла ошибка при выполнении запроса"
                    console.log(error);
                });

        },

        checkUserAccessCode: function() {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Выполнение проверки кода пользователя
            */

            var formdata = new FormData()

            formdata.append("code", this.userAccessCode)

            let config = {
                url:    `${this.showApiHost}users/checkAccessCode/`,
                data:   formdata,
                method: 'POST',
            }

            axios(config)
                .then((response) => {
                    switch (response.data.status) {
                        case 0:
                            this.$router.push({ name: "Chats" })
                            localStorage.setItem("userId", response.data.user)
                            localStorage.setItem("token", response.data.token)
                        case 1:
                            this.signInMessage = response.data.message
                        case 2:
                            this.signInMessage = response.data.message
                    }
                })
                .catch((error) => {
                    this.signInMessage = "Произошла ошибка при выполнении запроса"
                    console.log(error);
                });

        },

        signInButtonClicked: function() {

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
            "showApiHost"
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
        localStorage.removeItem("token")
    }
    
}

</script>
