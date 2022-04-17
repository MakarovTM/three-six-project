<template>
    <div class="text-center p-4 border-bottom">
        <div class="mb-4 profile-user">
            <div class="avatar-lg">
                <span class="avatar-title rounded-circle bg-soft-primary text-primary">
                    {{ this.propUserName.charAt(0) }}
                </span>
            </div>
        </div>
        <h5 class="font-size-16 mb-1 text-truncate">
            {{ this.propUserName }}
        </h5>
        <p class="text-muted text-truncate mb-1">
            {{ this.propUserEmail }}
        </p>
    </div>
</template>


<script>

/**
    * Автор:    Макаров Алексей
    * Описание: Информация о пользователе для публичного просмотра
*/

export default {

    props: {

        propUserName: {
            type: String,
            reqired: true
        },

        propUserEmail: {
            type: String,
            reqired: true
        }

    }
    
}
</script>