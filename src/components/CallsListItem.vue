<template>
    <li>
        <a>
            <div class="media">
                <div class="chat-user-img online align-self-center mr-3 online">
                    <div class="avatar-xs">
                        <Icon 
                            width="24" height="24"
                            :icon="this.callTypeIcon" 
                            :color="this.callStatusIconColor" 
                        />
                    </div>
                </div>
                <div class="media-body overflow-hidden">
                    <h5 class="text-truncate font-size-15 mb-1">
                        {{ this.propCallerName }}
                    </h5>
                    <p class="chat-user-message text-truncate mb-0">
                        Длительность: {{ this.propCallDuration }}
                    </p>
                </div>
                <div class="font-size-11">
                    {{ this.propCallTimeStamp }}
                </div>
            </div>
        </a>
    </li>
</template>



<script>

/**
    * Автор:    Макаров Алексей
    * Описание: Отображение строки в списке контактов пользователя
*/

import { Icon } from '@iconify/vue'

export default {

    components: {
        Icon
    },
    
    props: {

        propCallType: {
            type: Number,
            required: true
        },
        propCallStatus: {
            type: Number,
            required: true
        },
        propCallerName: {
            type: String,
            required: true
        },
        propCallDuration: {
            type: String,
            required: true
        },
        propCallTimeStamp: {
            type: String,
            required: true
        }
    },

    computed: {

        callTypeIcon: function() {

            // Автор:       Макаров Алексей
            // Описание:    Вычисление иконки для отображения типа звонка

            return this.propCallType == 1 ? "bi:camera-video-fill" : "clarity:mobile-phone-solid"

        },

        callStatusIconColor: function() {
            
            // Автор:       Макаров Алексей
            // Описание:    Вычисление цвета иконки для отображения звонка

            return this.propCallStatus === 1 ? "#DD5471" : "#62D3A3"

        }
        
    
    }

}

</script>
