<template>
    <div class="tab-content">
        <div class="tab-pane active">
            <div>
                <div class="p-4 chat-message-list chat-group-list">
                    <div>
                        <ul class="list-unstyled contact-list">
                            <ContactsListItem 
                                v-for="contactItem in this.filteredUserContactsList" 
                                :key="contactItem.contact_to.id"
                                :propContactId="contactItem.contact_to.id"
                                :propContactName="contactItem.contact_to.full_name"
                                :propContactEmail="contactItem.contact_to.email"
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
        propUserContactsList: {
            type: Array,
            required: true
        },
        propUserContactsListFilterString: {
            type: String,
            required: true
        }
    },

    computed: {

        filteredUserContactsList: function() {

            /**
                * Автор:    Макаров Алексей
                * Описание: Фильтрация списка контактов по ключевому слову
            */

            return this.propUserContactsList.filter(
                row => {
                    return row.contact_to.full_name.toLowerCase().includes(this.propUserContactsListFilterString.toLowerCase()) || row.contact_to.email.toLowerCase().includes(this.propUserContactsListFilterString.toLowerCase()) 
                }
            )

        }

    },
    
}

</script>
