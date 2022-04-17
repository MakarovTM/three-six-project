/**
    * Автор:        Макаров Алексей
    * Описание:     Файл vuex для списка чатов пользователя
*/

import axios from "axios"

const state = {

    chatsList: [],
    chatsListLoadStatus: false

}

const getters = {

    showChatsList: (state) => { return state.chatsList },
    showChatsListLoadStatus: (state) => { return state.chatsListLoadStatus }

}

const actions = {

    chatsListUpdate: function( {state, rootState} ) {

        /**
            * Автор:        Макаров Алексей
            * Описание:     Выполнение обновления списка чатов пользователя 
        */

        let config = {
            url:    `${rootState.apiHost}/chats/showUserChats/${localStorage.userId}`,
            method: "GET",
        }

        axios(config)
            .then((response) => {
                state.chatsList = response.data.chatsList
            })
            .catch((error) => {
                console.log(error);
            })

    }

}

const mutations = {

}

export default {
    state, getters, actions, mutations
}
