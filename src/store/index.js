import { createStore } from 'vuex'

import configRegex from "./config/config.regex"

import indexChat from "./modules/index.chat"
import indexChats from "./modules/index.chats"
import indexProfile from "./modules/index.profile"
import indexContacts from "./modules/index.contacts"

export default createStore({

    state: {

        apiHost: "http://127.0.0.1:8000",

        sideBarMenuIcons: [

            {
                id: 1,
                name: "ic:baseline-people-alt",
                isActive: false,
                routerPath: { name : "Contats" },
            },

            {
                id: 2,
                name: "entypo:chat",
                isActive: false,
                routerPath: { name : "Chats" },
            },

            {
                id: 3,
                name: "healthicons:ui-user-profile",
                isActive: false,
                routerPath: { name : "Profile", params: { id: localStorage.userId } },
            },

            {
                id: 4,
                name: "bx:exit",
                isActive: false,
                routerPath: { name : "SignIn" },
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

        updateSideBarActiveTab: function({ state }, activeSideBarId) {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Обновление активной вкладки мессенджера
            */

            state.sideBarMenuIcons.forEach(function(item, i, arr) {
                if (item.id === activeSideBarId) {
                    item.isActive = true
                } else {
                    item.isActive = false
                }
            })

        }

    },

    modules: {
        indexChat,
        indexChats,
        indexProfile,
        indexContacts,

        configRegex,

    }

})
