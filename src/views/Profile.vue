<template>

    <ProfileModalEdit 
        v-if="this.showProfileModalStatus && !this.showProfileLoadStatus"
        :propUserFullName="showProfileData.full_name"
        :propUserAbout="showProfileData.about"
        @closeProfileEditModal="this.profileEditModalAction(2)"
    />

    <BaseLayout>

        <template v-slot:messenger-left-frame>

            <ViewsHeader
                v-if="this.userOwnProfile"
                propViewHeaderTitle="Профиль"
                propViewHeaderModalIcon="akar-icons:chat-edit"
                @modalOpenButtonClicked="this.profileEditModalAction(1)"
            />

            <ViewsHeader
                v-if="!this.userOwnProfile"
                propViewHeaderTitle="Профиль"
            />

            <LoadingPage v-if="this.showProfileLoadStatus" />

            <ProfileDetails
                v-if="!this.showProfileLoadStatus"
                :propUserName="showProfileData.full_name"
                :propUserEmail="showProfileData.email"
                :propUserAbout="showProfileData.about"
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
    * Описание: Представление для просмотра профиля пользователя
*/

import { mapActions, mapGetters } from "vuex"

import ChatView from "@/components/ChatView.vue"
import LoadingPage from "@/plugs/LoadingPage.vue"
import BaseLayout from "@/layouts/BaseLayout.vue"
import BaseButton from "@/components/Base/BaseButton.vue"
import ProfileDetails from "@/components/ProfileDetails.vue"
import ViewsHeader from "@/components/Base/BaseViewsHeader.vue"
import ProfileModalEdit from "@/components/ProfileModalEdit.vue"


export default {

    components: {
        ChatView,
        BaseButton,
        BaseLayout,
        LoadingPage,
        ViewsHeader,
        ProfileDetails,
        ProfileModalEdit,
    },

    data() {
        return {
            userId: this.$route.params.id
        }
    },

    methods: {

        ...mapActions([
            "checkUserSession",
            "uploadProfileData",
            "updateSideBarActiveTab",
            "profileEditModalUpdateStatus"
        ]),

        profileEditModalAction: function(mode) {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Выполнение взаимодействия с окном
                *               редактирования профиля пользователя 
            */

            if (mode === 1) {
                this.profileEditModalUpdateStatus()
            }
            else {
                this.uploadProfileData(this.userId)
                this.profileEditModalUpdateStatus()
            }

        }

    },

    computed: {

        ...mapGetters([
            "showProfileData",
            "showProfileLoadStatus",
            "showProfileModalStatus"
        ]),

        userOwnProfile: function() {

            /**
                * Автор:        Макаров Алексей
                * Описание:     Проверка профиля на
                *               принадл. активному пользователю
            */

            return localStorage.userId === this.userId ? true : false

        }
    },

    mounted() {
        this.updateSideBarActiveTab(3)
        this.uploadProfileData(this.userId)
        document.title = "Профиль пользователя"
    }

}
</script>
