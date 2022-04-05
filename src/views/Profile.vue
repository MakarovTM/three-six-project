<template>

    <BaseLayout>
        <template v-slot:messenger-left-frame>
            <ViewsHeader
                propViewHeaderTitle="Профиль"
            />
            


        </template>
    </BaseLayout>

</template>


<script>

/**
    * Автор:    Макаров Алексей
    * Описание: Представление для просмотра списка контактов пользователя
*/

import { mapActions } from "vuex"

import BaseLayout from "@/layouts/BaseLayout.vue"

import ViewsHeader from "@/components/Base/BaseViewsHeader.vue"

export default {

    components: {
        BaseLayout,
        ViewsHeader,
    },

    methods: {

        ...mapActions([
            "checkUserSession"
        ]),

    },

    mounted() {
        this.checkUserSession()
        document.title = "Профиль пользователя"
    }

}
</script>
