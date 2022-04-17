/**
    * Автор:        Макаров Алексей
    * Описание:     Файл vuex для хранения информации о профиле пользователя
*/

import axios from "axios"

const state = {

    profilePublic: {
        mail: "A",
        name: "A"
    },
    profilePublicLoads: false

}

const getters = {

    showProfilePublic: (state) => { return state.profilePublic },
    showProfilePublicLoadStatus: (state) => { return state.profilePublicLoads }

}

const actions = {

    profilePublicLoad: function({ state, rootState }, userId) {

        /**
            * Автор:        Макаров Алексей
            * Описание:     Загрузка профиля пользователя для публичного просмотра 
        */

        state.profilePublicLoads = true

        let config = {
            method: "GET",
            url: `${rootState.apiHost}/users/userPublicView/${userId}`,
        }
          
        axios(config)
            .then((response) => {
                state.profilePublicLoads = false
                state.profilePublic = response.data.userPublicView[0]
            })
            .catch((error) => {
                console.log(error);
            });

    }

}

const mutations = {

}

export default {
    state, getters, actions, mutations
}
