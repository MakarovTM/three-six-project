<template>
    <div class="text-center p-4 border-bottom">
        <div class="mb-4 profile-user">
            <div class="avatar-lg">
                <span class="avatar-title rounded-circle bg-soft-primary text-primary">
                    {{ this.propUserName.charAt(0) }}
                </span>
            </div>
        </div>
        <h5 class="font-size-16 mb-1 text-truncate">
            {{ this.propUserName }}
        </h5>
        <p class="text-muted text-truncate mb-1">
            {{ this.propUserEmail }}
        </p>
        <div class="p-4 user-profile-desc" data-simplebar="init">
            <div class="simplebar-wrapper" style="margin: -24px;">
                <div class="simplebar-mask">
                    <div class="simplebar-offset" style="right: 0px; bottom: 0px;">
                        <div class="simplebar-content-wrapper" style="height: 100%; padding-right: 0px; padding-bottom: 0px; overflow: hidden;">
                            <div class="simplebar-content" style="padding: 24px;">
                                <div class="text-muted">
                                    <p class="mb-4">
                                        {{ this.propUserAbout }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="simplebar-placeholder" style="width: auto; height: 138px;"></div>
            </div>
        </div>
    </div>
</template>


<script>

/**
    * Автор:    Макаров Алексей
    * Описание: Информация о пользователе
*/

export default {

    props: {

        propUserName: {
            type: String,
            reqired: true
        },

        propUserEmail: {
            type: String,
            reqired: true
        },

        propUserAbout: {
            type: String,
            reqired: true
        }

    }
    
}
</script>
