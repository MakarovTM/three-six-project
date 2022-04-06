<template>
    <div class="modal fade show" style="display: block">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title font-size-16"> {{ this.propsModalTitle }} </h5>
                    <button type="button" class="close" @click="this.closeTreatContactModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body p-4">
                    <slot name="messenger-centered-card"></slot>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-link" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Invite Contact</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

/**
    * Автор:    Макаров Алексей
    * Описание: Модальное окно для приглашения пользователя в чат 
*/

export default {


    props: {

        propsModalTitle: {
            type: String,
            required: true
        },

    },
    
    methods: {

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


<style>

.modal {
    background: black;
	z-index: 99999;
	opacity: 0.85;	
}

</style>
