<template>
    <div class="tab-content">
        <div class="tab-pane active">
            <div>
                <div class="p-4 chat-message-list chat-group-list">
                    <div>
                        <ul class="list-unstyled contact-list">
                            <ContactsListItem 
                                v-for="contactItem in this.filteredContactsList" 
                                :key="contactItem.id"
                                :propContactId="contactItem.id"
                                :propContactName="contactItem.contact_two.name"
                                :propContactEmail="contactItem.contact_two.mail"
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

import { mapGetters }   from "vuex"

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

    computed: {

        ...mapGetters([
            "showContactsList"
        ]),

        filteredContactsList: function() {

            /**
                * Автор:    Макаров Алексей
                * Описание: Фильтрация списка контактов по ключевому слову
            */

            return this.showContactsList.filter(row => {
                return row.contact_two.name.toLowerCase().includes(this.propContactsFilterString.toLowerCase())
            })

        }

    },
    
}

</script>
