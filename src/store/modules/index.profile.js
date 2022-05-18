/**
    * Автор:        Макаров Алексей
    * Описание:     Файл vuex для хранения информации о профиле пользователя
*/

import axios from "axios"

const state = {

    profileData: null,
    profileLoading: true,
    profileEditModalOpened: false

}

const getters = {

    showProfileData: (state) => { return state.profileData },
    showProfileLoadStatus: (state) => { return state.profileLoading },
    showProfileModalStatus: (state) => { return state.profileEditModalOpened }

}

const actions = {

    uploadProfileData: function({ state, rootState }, userId) {

        /**
            * Автор:        Макаров Алексей
            * Описание:     Загрузка профиля пользователя для публичного просмотра 
        */

        state.profileLoading = true

        let config = {
            url:     `${rootState.apiHost}/users/show/${userId}`,
            method:  "GET",
            headers: {
                "sessionToken": localStorage.getItem("sessionToken")
            }
        }
          
        axios(config)
            .then((response) => {
                switch (response.data.status) {
                    case 0:
                        state.profileData = response.data.record
                        state.profileLoading = false
                }
            })
            .catch((error) => {
                console.log(error);
            });

    },

    profileEditModalUpdateStatus: function({ state }) {

        /**
            * Автор:        Макаров Алексей
            * Описание:     Изменение статуса модального окна
            *               по редактированию профиля пользователя    
        */

        state.profileEditModalOpened = !state.profileEditModalOpened

    }

}

const mutations = {

}

export default {
    state, getters, actions, mutations
}
