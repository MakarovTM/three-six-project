<template>
    <div class="media">
        <div class="chat-user-img mr-3">
            <div class="avatar-xs">
                <span class="avatar-title rounded-circle bg-soft-primary text-primary">
                   {{ this.propFoundUserProfile.full_name.charAt(0) }}
                </span>
            </div>
        </div>
        <div class="media-body overflow-hidden">
            <h5 class="text-truncate font-size-15 mb-0">
                {{ this.propFoundUserProfile.full_name }}
            </h5>
            <p class="chat-user-message text-truncate mb-0">
               {{ this.propFoundUserProfile.email }}
            </p>
        </div>
    </div>
</template>


<script>

/**
    * Автор:        Макаров Алексей
    * Описание:     Карточка найденного профиля 
*/

export default {

    props: {

        propFoundUserProfile: {
            type: Object,
            required: true
        }

    }

}

</script>
