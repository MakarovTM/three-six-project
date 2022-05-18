/**
    * Автор:        Макаров Алексей
    * Описание:     Файл vuex для масок регулярных
    *               выражений для проверки данных формы
*/

const state = {

    regexPatterns: {
        regexEmail: {
            pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
            message: "Введеный адрес электронной почты задан некорректно"
        },
        regexUserFullName: {
            pattern: /^[\u0400-\u04FF\s]+$/,
            message: "Строка должна содержать только символы кириллицы"
        },
        regexUserAbout: {
            pattern: /^$|\s+/,
            message: "Строка должна содержать несколько слов"
        },
        regexDigitsOnly: {
            pattern: /^\d+$/,
            message: "Строка должна содержать только цифры"
        }
    }

}

const getters = {

    showRegexPatterns: (state) => { return state.regexPatterns },

}

const actions = {

}

const mutations = {

}

export default {
    state, getters, actions, mutations
}
