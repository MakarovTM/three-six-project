<template>
    <div class="layout-wrapper d-lg-flex">

        <!-- Главное меню мессенджера -->
        <SideBarMenu />
        <!-- -->

        <!-- Левая вкладка мессенджера -->
        <div class="chat-leftsidebar mr-lg-1">
            <div class="tab-content">
                <div class="tab-pane active">
                    <slot name="messenger-left-frame"></slot>
                </div>
            </div>
        </div>
        <!-- -->

        <!-- Окно с последним открытым чатом пользователя -->

        <!-- -->

    </div>
</template>


<script>

/**
    * Автор:    Макаров Алексей
    * Описание: Главный шаблон окна мессенджера
*/

import SideBarMenu from "@/components/Base/BaseSideBarMenu.vue"

export default {
    
    components: {
        SideBarMenu
    }

}
</script>
