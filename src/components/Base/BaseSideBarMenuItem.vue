<template>
	 <li class="nav-item">
		<router-link 
			class="nav-link" 
			:class="{ active: this.propSideBarMenuItemActive }" 
			:to="this.propRouteName"
		>
			<Icon :icon="this.propSideBarMenuItemIcon" />
		</router-link>
	</li>
</template>


<script>

/**
	* Автор:	Макаров Алексей
	* Описание: Компонент главного меню мессенджера
*/

import { Icon } from '@iconify/vue'

export default {

	components: {
		Icon
	},

	props: {

		propRouteName: {
			type: Object,
			required: true
		},

		propSideBarMenuItemIcon: {
			type: String,
			required: true
		},

		propSideBarMenuItemActive: {
			type: Boolean,
			required: true
		}

	},

}
	
</script>
