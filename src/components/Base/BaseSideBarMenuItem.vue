<template>
	 <li class="nav-item">
		<router-link class="nav-link" :to="{ name : this.propRouteName }">
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
			type: String,
			required: true
		},
		propSideBarMenuItemIcon: {
			type: String,
			required: true
		}
	},

}
	
</script>
