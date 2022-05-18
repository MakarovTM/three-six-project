/**
    * Автор:        Макаров Алексей
    * Описание:     Файл vuex для списка контактов пользователя
*/

const state = {

    contactsAddModalOpened: false

}

const getters = {

    showContactsAddModalStatus: (state) => { return state.contactsAddModalOpened }

}

const actions = {

    updateContactsAddModalStatus({ state }) {

        /**
            * Автор:        Макаров Алексей
            * Описание:     Изменение статуса модального
            *               окна по добавлению контакта пользователя 
        */

        state.contactsAddModalOpened = !state.contactsAddModalOpened

    },

}

const mutations = {

}

export default {
    state, getters, actions, mutations
}
