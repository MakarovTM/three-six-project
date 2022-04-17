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
                                @updateInputValue="this.updateUserEmail" 
                            />

                            <BaseInputWithTitle 
                                propInputTitle="Введите имя пользователя" 
                                @updateInputValue="this.updateUserName" 
                            />

                            <div class="d-grid">
                                <button 
                                    style="width: 100%;" 
                                    class="btn btn-primary waves-effect waves-light" 
                                    @click="this.signUpButtonClicked"
                                >
                                    Зарегистрироваться
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="text-center mb-4">
                    <p class="text-muted mb-4"> {{ this.signUpMessage }} </p>
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

            userName: "",
            userEmail: "",

            signUpMessage: "",

        }
    },

    methods: {

        updateUserName:   function(updatedUserName)   { this.userName       = updatedUserName   },
        updateUserEmail:  function(updatedUserEmail)  { this.userEmail      = updatedUserEmail  },

        signUpButtonClicked: function() {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Выполнение авторизации пользователя
            */

            var formdata = new FormData()

            formdata.append("name", this.userName)
            formdata.append("mail", this.userEmail)

            let config = {
                url:    `${this.showApiHost}/users/signUp/`,
                data:   formdata,
                method: 'POST',
            }

            console.log(config)

            axios(config)
                .then((response) => {
                    switch (response.data.status) {
                        case 0:
                            this.signUpMessage = response.data.message
                        case 1:
                            this.signUpMessage = response.data.message
                        case 2:
                            this.signUpMessage = response.data.message
                    }
                })
                .catch((error) => {
                    this.signInMessage = "Произошла ошибка при выполнении запроса"
                    console.log(error)
                });

        },

    },

    computed: {

        ...mapGetters([
            "showApiHost"
        ]),

    },

    mounted() {
        document.title = "Создание аккаунта пользователя"
        localStorage.removeItem("token")
    }
    
}

</script>
