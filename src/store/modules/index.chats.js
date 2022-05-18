/**
    * Автор:        Макаров Алексей
    * Описание:     Файл vuex для хранения информации о
    *               состоянии представления просмотра чатов пользователя
*/

const state = {

    chatsAddModalOpened: false

}

const getters = {

    showChatsAddModalStatus: (state) => { return state.chatsAddModalOpened }

}

const actions = {

    updateChatsAddModalStatus({ state }) {

        /**
            * Автор:        Макаров Алексей
            * Описание:     Изменение статуса модального
            *               окна по созданию нового чата пользователя
        */

        state.chatsAddModalOpened = !state.chatsAddModalOpened

    },

}

const mutations = {

}

export default {
    state, getters, actions, mutations
}
