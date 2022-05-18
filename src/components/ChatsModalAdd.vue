<template>
	<BaseModal 
        propsModalTitle="Создать чат" 
        @closeModal="this.closeChatAddModal"
    >
		<template v-slot:modal-body-content>

            <BaseInputWithTitle
                propInputTitle="Заголовок чата"
                :propInputRegexPattern="showRegexPatterns.regexUserAbout.pattern"
                :propInputRegexPatternInvalidMessage="showRegexPatterns.regexUserAbout.message"
                @updateInputValue="this.updateChatHeader"
                @updateInputValueValidation="this.updateChatHeaderValidation"
            />

            <select class="dropdown d-inline-block mb-1" aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
            

		</template>
		<template v-slot:modal-footer-content>
            <BaseButton
                propButtonTitle="Создать"
                :propButtonDisabled="!this.searchUserEmailValidation" 
                @buttonClicked="this.contactAddButtonClicked()" 
            />
		</template>
	</BaseModal>
</template>


<script>

/**
    * Автор:    Макаров Алексей
    * Описание: Модальное окно для создания контакта с пользователем
*/

import axios from "axios"

import { mapGetters } from "vuex"

import BaseModal from "@/components/Base/BaseModal.vue"
import BaseButton from "@/components/Base/BaseButton.vue"
import BaseInputWithTitle from "@/components/Base/BaseInputWithTitle.vue"

export default {

    components: {
        BaseModal,
        BaseButton,
        BaseInputWithTitle,
    },

    data() {
        return {

            chatHeader: "",
            chatHeaderValidation: false,

            chatMember1: localStorage.getItem("userId"),

            chatMember2: "",
            chatMember2Validation: false

        }
    },
    
    methods: {

        updateChatHeader: function(updatedChatHeader) {
            this.chatHeader = updatedChatHeader
        },

        updateChatHeaderValidation: function(updatedChatHeaderValidation) {
            this.chatHeaderValidation = updatedChatHeaderValidation
        },

        closeChatAddModal: function() {
            this.$emit("closeChatAddModal")
        },

    },

    computed: {

        ...mapGetters(
            [
                "showApiHost",
                "showRegexPatterns"
            ]
        )

    }

}
</script>
