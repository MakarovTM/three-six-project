<template>
    <li :class="this.messageShowClass">
        <div class="conversation-list">
            <div class="avatar-xs">
                <span class="avatar-title rounded-circle bg-soft-primary text-primary">
                    {{ this.propMessageAuthor.charAt(0) }}
                </span>
            </div>

            <div class="user-chat-content">

                <div class="ctext-wrap">
                    <div class="ctext-wrap-content">
                        <p class="mb-0">
                            {{ this.propMessageContent }}
                        </p>
                        <p class="chat-time mb-0">
                            <span class="align-middle">
                                {{ this.propMessageTimeStamp }}
                            </span>
                        </p>
                    </div>
                </div>

                <div class="conversation-name">
                    {{ this.propMessageAuthor }}
                </div>
            </div>
        </div>
    </li>
</template>


<script>

/**
    * Автор:        Макаров Алексей
    * Описание:     Представление сообщения в чате пользователя 
*/

export default {

    props: {
        
        propMessageAlign: {
            type: Boolean,
            required: true
        },

        propMessageAuthor: {
            type: String,
            required: true
        },

        propMessageContent: {
            type: String,
            required: true
        },

        propMessageTimeStamp: {
            type: String,
            required: true
        }

    },

    computed: {

        messageShowClass: function() {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Вычисление класса отображения сообщения 
            */

            return this.propMessageAlign ? "right" : ""

        }

    }
    
}
</script>

<style scoped>
    .user-chat-content {
        margin-left: 20px;
    }
</style>