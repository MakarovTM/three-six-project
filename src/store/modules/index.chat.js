/**
    * Автор:        Макаров Алексей
    * Описание:     Файл vuex для хранения информации об открытом чате
*/

import axios from "axios"

const state = {

    chatViewMode: 1,
    chatViewOpened: false,
    chatViewClosed: false

}

const getters = {

    showChatViewMode: (state) => { return state.chatViewMode },
    showChatViewOpened: (state) => { return state.chatViewOpened },
    showChatViewClosed: (state) => { return state.chatViewClosed },

}

const actions = {

    chatViewModeUpdate: function({ state }) {

        /**
            * Автор:        Макаров Алексей
            * Описание:     Обновление параметров отображения окна с последним открытым чатом
        */

        state.chatViewMode = (window.innerWidth <= 992) ? 1 : 2

    },

    chatViewOpenedUpdate: function({ state }) {

        /**
            * Автор:        Макаров Алексей
            * Описание:     Обновление статуса просмотра чата (чат открыт) 
        */

        state.chatViewOpened = true
        state.chatViewClosed = false

    },
    
    chatViewClosedUpdate: function({ state }) {

        /**
            * Автор:        Макаров Алексей
            * Описание:     Обновление статуса просмотра чата (чат закрыт) 
        */

        state.chatViewOpened = false
        state.chatViewClosed = true

    }

}

const mutations = {

}

export default {
    state, getters, actions, mutations
}
