<template>

    <BaseLayout>
        <template v-slot:messenger-left-frame>
            <ViewsHeader
                propViewHeaderTitle="Профиль"
            />
            
            <ProfilePublic
                :propUserName="this.showProfilePublic.name"
                :propUserEmail="this.showProfilePublic.mail"       
            />

            <ProfilePrivate 
                v-if="this.userOwnProfile"
            />

        </template>
        <template v-slot:messenger-right-frame>
            <ChatView />
        </template>
    </BaseLayout>

</template>


<script>

/**
    * Автор:    Макаров Алексей
    * Описание: Представление для просмотра списка контактов пользователя
*/

import { mapActions, mapGetters } from "vuex"

import BaseLayout from "@/layouts/BaseLayout.vue"

import ViewsHeader from "@/components/Base/BaseViewsHeader.vue"

import ProfilePublic from "@/components/ProfilePublic.vue"
import ProfilePrivate from "@/components/ProfilePrivate.vue"
import ChatView from "@/components/ChatView.vue"

export default {

    components: {
        ChatView,
        BaseLayout,
        ViewsHeader,
        ProfilePublic,
        ProfilePrivate
    },

    data() {
        return {
            userId: this.$route.params.id
        }
    },

    methods: {

        ...mapActions([
            "checkUserSession",
            "profilePublicLoad",
            "updateSideBarActiveTab",
        ]),

    },

    computed: {

        ...mapGetters([
            "showProfilePublic",
            "showProfilePublicLoadStatus"
        ]),

        userOwnProfile: function() {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Проверка профиля на принадлежность активному пользователю
            */

            return localStorage.userId === this.userId ? true : false

        }
    },

    mounted() {
        this.userId = this.$route.params.id
        this.checkUserSession()
        this.updateSideBarActiveTab(4)
        this.profilePublicLoad(this.userId)
        document.title = "Профиль пользователя"
    }

}
</script>
