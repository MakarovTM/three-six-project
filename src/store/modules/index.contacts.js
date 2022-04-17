/**
    * Автор:        Макаров Алексей
    * Описание:     Файл vuex для списка контактов пользователя
*/

import axios from "axios"

const state = {

    contactsList: [],
    contactsListLoadStatus: false

}

const getters = {

    showContactsList: (state) => { return state.contactsList },
    showContactsListLoadStatus: (state) => { return state.contactsListLoadStatus }

}

const actions = {

    contactsListUpdate: function({ state, rootState }) {

        /**
            * Автор:        Макаров Алексей
            * Описание:     Выполнение обновления списка контактов пользователя
        */

        state.contactsListLoadStatus = !state.contactsListLoadStatus

        let config = {
            url: `${rootState.apiHost}/contacts/showUserContacts/${localStorage.userId}`,
            method: "GET",
        }

        axios(config)
            .then((response) => {
                state.contactsList = response.data.contactsList
                state.contactsListLoadStatus = !state.contactsListLoadStatus
            })
            .catch((error) => {
                console.log(error)
                console.log("Произошла ошибка при обновлении списка контактов пользователя")
            });

    }

}

const mutations = {

}

export default {
    state, getters, actions, mutations
}
