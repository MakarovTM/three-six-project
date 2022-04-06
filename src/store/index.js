import axios from "axios"
import router from '@/router/index.js'

import { createStore } from 'vuex'


export default createStore({

    state: {

        apiHost: "http://127.0.0.1:8000/",

        sideBarMenuIcons: [

            {
                id: 1,
                name: "ic:baseline-people-alt",
                routerPath: "Contats"
            },

            {
                id: 2,
                name: "ic:baseline-phone-forwarded",
                routerPath: "Calls"
            },

            {
                id: 3,
                name: "entypo:chat",
                routerPath: "Chats"
            },

            {
                id: 4,
                name: "healthicons:ui-user-profile",
                routerPath: "Profile"
            }

        ]

    },

    getters: {

        showApiHost: (state) => { return state.apiHost },

        showSideBarMenuIcons: (state) => { return state.sideBarMenuIcons },

    },

    mutations: {

    },

    actions: {

        checkUserSession: function({ state }) {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Выполнение проверки сессии пользователя 
            */

            let token = localStorage.getItem("token")
            let user  = localStorage.getItem("userId")
            
            if (token === null || user === null) {
                router.push({name: "SignIn"})
            } else {

                let data = new FormData()
                data.append("token", token)

                let config = {
                    url:    `${state.apiHost}users/checkUserSession/`,
                    data :  data,
                    method: "post",
                }

                axios(config)
                    .then((response) => {
                        switch (response.data.status) {
                            case 1: {
                                router.push({name: "SignIn"})
                            }
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        router.push({name: "SignIn"})
                    })

            }


        }

    },

    modules: {
        
    }

})
