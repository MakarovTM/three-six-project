/**
    * Автор:        Макаров Алексей
    * Описание:     Файл vuex для списка контактов пользователя
*/

import axios from "axios"

const state = {

    contactsList: [],
    contactsModalStatus: false,
    contactSearchStatus: true,
    contactSearchMessage: "",
    contactSearchResults: [],
    contactsListLoadStatus: false,

    contactsNotFound: false,
    contactWasFound: false

}

const getters = {

    showContactsList: (state) => { return state.contactsList },
    showContactsModalStatus: (state) => { return state.contactsModalStatus },
    showContactSearchStatus: (state) => { return state.contactSearchStatus },
    showContactSearchMessage: (state) => { return state.contactSearchMessage },
    showContactSearchResults: (state) => { return state.contactSearchResults },
    showContactsListLoadStatus: (state) => { return state.contactsListLoadStatus },

    showContactsNotFound: (state) => { return state.contactsNotFound },
    showContactWasFound: (state) => { return state.contactWasFound }

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

    },

    contactExistenceCheck: function({ state, rootState }, contactEmail) {

        /**
            * Автор:        Макаров Алексей
            * Описание:     Выполнение проверки наличия аккаунта пользователя в чате
        */

        state.contactSearchStatus = false

        let data = new FormData()
        data.append("mail", contactEmail)
        data.append("userId", localStorage.userId)

        let config = {
            url:    `${rootState.apiHost}/users/userCheckAccount/`,
            data:   data,
            method: "POST",
        }

        axios(config)
            .then((response) => {
                if (response.data.userCheckResults.length === 0) {
                    state.contactSearchMessage = `Пользователи не найдены. На почту ${contactEmail} было отправлено приглашение`
                    state.contactsNotFound = true
                } else {
                    state.contactWasFound = true
                    console.log(response.data)
                    state.contactSearchResults = response.data.userCheckResults
                }
                state.contactSearchStatus  = !state.contactSearchStatus
            })
            .catch((error) => {
                console.log(error);
            })

    },

    contactsModalStatusUpdate: function({ state }) {

        /**
            * Автор:        Макаров Алексей
            * Описание:     Изменение статуса модального окна по добавлению контакта
        */

        state.contactSearchResults = []
        state.contactsNotFound = false
        state.contactSearchMessage = ""
        state.contactsModalStatus  = !state.contactsModalStatus

    }

}

const mutations = {

}

export default {
    state, getters, actions, mutations
}
