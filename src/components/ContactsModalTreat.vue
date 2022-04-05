<template>
    <div class="modal fade show" style="display: block">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title font-size-16" id="addContact-exampleModalLabel">Add Contact</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="this.closeTreatContactModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body p-4">
                    <form>
                        <div class="form-group mb-4">
                            <label for="addcontactemail-input">Email</label>
                            <input type="email" class="form-control" id="addcontactemail-input" placeholder="Enter Email" />
                        </div>
                        <div class="form-group">
                            <label for="addcontact-invitemessage-input">Invatation Message</label>
                            <textarea class="form-control" id="addcontact-invitemessage-input" rows="3" placeholder="Enter Message"></textarea>
                        </div>
                    </form>
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
