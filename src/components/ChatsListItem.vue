<template>
    <li>
        <a>
            <div class="media">
                <div class="chat-user-img online align-self-center mr-3 online">
                    <div class="avatar-xs">
                        <span class="avatar-title rounded-circle bg-soft-primary text-primary">
                            {{ this.propContactName.charAt(0) }}
                        </span>
                    </div>
                </div>
                <div class="media-body overflow-hidden">
                    <h5 class="text-truncate font-size-15 mb-1">
                        {{ this.propContactName }}
                    </h5>
                    <p class="chat-user-message text-truncate mb-0">
                        {{ this.propChatLastMessage }}
                    </p>
                </div>
                <div class="font-size-11">
                    {{ this.propChatLastMessageTs }}
                </div>
            </div>
        </a>
    </li>
</template>


<script>

/**
    * Автор:    Макаров Алексей
    * Описание: Отображение чата пользователя
*/

export default {
    
    props: {

        propChatId: {
            type: Number,
            required: true
        },

        propContactName: {
            type: String,
            required: true
        },

        propChatLastMessage: {
            type: String,
            required: true
        },

        propChatLastMessageTs: {
            type: String,
            required: true
        }
    }

}

</script>
