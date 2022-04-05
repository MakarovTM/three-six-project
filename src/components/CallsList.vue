<template>
    <div class="tab-content">
        <div class="tab-pane active">
            <div>
                <div class="p-4 chat-message-list chat-group-list">
                    <div>
                        <ul class="list-unstyled contact-list">
                            <CallsListItem

                                v-for="callsItem in this.filteredCallsList" 
                                :key="callsItem.id" 

                                :propCallType="callsItem.callType"
                                :propCallStatus="callsItem.callStatus"
                                :propCallerName="callsItem.callerName" 
                                :propCallDuration="callsItem.callDuration" 
                                :propCallTimeStamp="callsItem.callTimeStamp" 

                            />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

/**
    * Автор:    Макаров Алексей
    * Описание: Отображение списка контактов пользователя
*/

import CallsListItem from "@/components/CallsListItem.vue"

export default {

    components: {
        CallsListItem,
    },

    props: {
        propCallsFilterString: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            callsList: [
                {
                    id: 1,
                    callType: 0,
                    callStatus: 1,
                    callerName: "Макаров Алексей",
                    callDuration: "23 мин.",
                    callTimeStamp: "29 март 15:25"
                },
                {
                    id: 1,
                    callType: 1,
                    callStatus: 2,
                    callerName: "Макаров Иван",
                    callDuration: "23 мин.",
                    callTimeStamp: "29 март 15:25"
                }
            ]
        }
    },

    computed: {

        filteredCallsList: function() {

            /**
                * Автор:    Макаров Алексей
                * Описание: Фильтрация списка контактов по ключевому слову
            */

            return this.callsList.filter(row => {
                return row.callerName.toLowerCase().includes(this.propCallsFilterString.toLowerCase())
            })

        }

    }
    
}

</script>
