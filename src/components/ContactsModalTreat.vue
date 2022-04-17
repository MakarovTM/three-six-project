<template>
	<BaseModal propsModalTitle="Добавить контакт" @closeModal="this.closeTreatContactModal">
		<template v-slot:modal-body-content>
			<div class="mb-3">
				<label class="form-label">
					Эл. почта пользователя
				</label>
				<input class="form-control" v-model="this.newContactEmail" />
				<div class="text-center p-4" v-if="this.showContactsNotFound">
					<p class="text-muted mb-0">
						{{ this.showContactSearchMessage }}
					</p>
				</div>
				<div class="text-center p-4" v-if="this.showContactWasFound">
					<h5 class="font-size-16 mb-1 text-truncate">Найден пользователь</h5>
                    <p class="text-muted mb-0">
						Имя пользователя: {{ this.showContactSearchResults[0].name }}
					</p>
                    <p class="text-muted mb-0">
						Эл. почта пользователя: {{ this.showContactSearchResults[0].mail }}
					</p>
				</div>
			</div>
		</template>
		<template v-slot:modal-footer-content>
			<BaseButton v-if="!this.showContactWasFound"
                propButtonTitle="Поиск" 
                :propButtonDisabled="!this.showContactSearchStatus" 
                @buttonClicked="this.contactExistenceCheck(this.newContactEmail)" 
            />
            <BaseButton v-if="this.showContactWasFound"
                propButtonTitle="Добавить контакт" 
                :propButtonDisabled="false" 
                @buttonClicked="this.contactExistenceCheck(this.newContactEmail)" 
            />
		</template>
	</BaseModal>
</template>




<script>

/**
    * Автор:    Макаров Алексей
    * Описание: Модальное окно для приглашения пользователя в чат 
*/

import { mapActions, mapGetters } from "vuex"

import BaseModal from "@/components/Base/BaseModal.vue"
import BaseButton from "@/components/Base/BaseButton.vue"

export default {

    components: {
        BaseModal,
        BaseButton
    },

    data() {
        return {
            newContactEmail: "",
        }
    },
    
    computed: {
        ...mapGetters([
            "showContactSearchStatus",
            "showContactSearchMessage",
            "showContactSearchResults",
            "showContactsNotFound",
            "showContactWasFound"
        ])
    },

    methods: {

        ...mapActions([
            "contactExistenceCheck"
        ]),

        closeTreatContactModal: function() {

            /**
                * Автор:    Макаров Алексей
                * Описание: Отправляем в родитель событие для свертывания модального окна
            */

            this.$emit("closeTreatContactModal")

        }

    }

}
</script>
