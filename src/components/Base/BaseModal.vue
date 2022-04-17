<template>
    <div class="modal fade show" style="display: block">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title font-size-16"> {{ this.propsModalTitle }} </h5>
                    <button type="button" class="close" @click="this.closeModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body p-4">
                    <slot name="modal-body-content"></slot>
                </div>
                <div class="modal-footer">
                    <slot name="modal-footer-content"></slot>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

/**
    * Автор:        Макаров Алексей
    * Описание:     Модальное окно в UI мессенджера
*/

export default {


    props: {

        propsModalTitle: {
            type: String,
            required: true
        },

    },
    
    methods: {

        closeModal: function() {

            /**
                * Автор:    Макаров Алексей
                * Описание: Отправляем в родитель событие для свертывания модального окна
            */

           this.$emit("closeModal")

        }

    }

}
</script>


<style>

.modal {
    background: black;
	z-index: 99999;
	opacity: 0.95;	
}

</style>
