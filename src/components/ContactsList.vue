<template>
    <div class="tab-content">
        <div class="tab-pane active">
            <div>
                <div class="p-4 chat-message-list chat-group-list">
                    <div>
                        <ul class="list-unstyled contact-list">
                            <ContactsListItem 
                                v-for="contactItem in this.filteredContactsList" 
                                :key="contactItem.index"
                                :propContactId="contactItem.id"
                                :propContactName="contactItem.name" 
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

import ContactsListItem from "@/components/ContactsListItem.vue"

export default {

    components: {
        ContactsListItem,
    },

    props: {
        propContactsFilterString: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            contactsList: [
                {
                    id: 2,
                    name: "Макаров Алексей"
                }
            ]
        }
    },

    computed: {

        filteredContactsList: function() {

            /**
                * Автор:    Макаров Алексей
                * Описание: Фильтрация списка контактов по ключевому слову
            */

            return this.contactsList.filter(row => {
                return row.name.toLowerCase().includes(this.propContactsFilterString.toLowerCase())
            })

        }

    }
    
}

</script>
