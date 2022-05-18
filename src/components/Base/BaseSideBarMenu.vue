<template>
    <div class="side-menu flex-lg-column mr-lg-1">
        <div class="flex-lg-column my-auto">
            <ul class="nav nav-pills side-menu-nav justify-content-center">
                <SideBarMenuItem 
					v-for="sideBarMenuItem in this.showSideBarMenuIcons" 
					:key="sideBarMenuItem.id" 
					
					:propRouteName="sideBarMenuItem.routerPath" 
					:propSideBarMenuItemIcon="sideBarMenuItem.name"
					:propSideBarMenuItemActive="sideBarMenuItem.isActive"
				/>
            </ul>
        </div>
    </div>
</template>




<script>
	
/**
	* Автор:	Макаров Алексей
	* Описание:	Главное меню мессенджера
*/

import { mapGetters } from "vuex"

import { Icon } from '@iconify/vue'

import SideBarMenuItem from "@/components/Base/BaseSideBarMenuItem.vue"

export default {

	components: {
		Icon,
		SideBarMenuItem
	},

	computed: {
		...mapGetters([
			"showSideBarMenuIcons"
		])
	}

}

</script>
