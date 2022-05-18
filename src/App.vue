<template>
 	<router-view/>
	<notifications position="bottom right" />
</template>


<script>

/**
	* Автор:		Макаров Алексей
	* Описание:		Основные скрипты при запуске приложения
*/

import { mapActions } from "vuex"

export default {

	methods: {
		...mapActions([
			"chatViewModeUpdate"
		])
	},
	
	created() {
		window.addEventListener('resize', this.chatViewModeUpdate)
        this.chatViewModeUpdate()
	},

}

</script>
