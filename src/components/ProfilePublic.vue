<template>
    <div class="text-center p-4 border-bottom">
        <div class="mb-4 profile-user">
            <img src="/img/avatar-1.67e2b9d7.jpg" alt="" class="rounded-circle avatar-lg img-thumbnail" /><button type="button" class="btn bg-light avatar-xs p-0 rounded-circle profile-photo-edit"><i class="ri-pencil-fill"></i></button>
        </div>
        <!---->
        <h5 class="font-size-16 mb-1 text-truncate">Patricia Smith</h5>
        <p class="text-muted text-truncate mb-1"><i class="ri-record-circle-fill font-size-10 text-success mr-1 d-inline-block"></i> Active</p>
    </div>
</template>


<script>

/**
    * Автор:    Макаров Алексей
    * Описание: Информация о пользователе для публичного просмотра
*/

export default {

    props: {

        propUserId: {
            type: Number,
            reqired: true
        }

    }
    
}
</script>