<template>
	<div class="player" v-show="playList.length">
		<div class="normal-player" v-show='fullScreen'>
			播放器
		</div>
		<div class="mini-player" v-show='!fullScreen'>
			
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	export default {
		name:'player',
		computed: {
			...mapGetters([
				'fullScreen',
				'playList'
			])
		}
	}
</script>
<style lang="less" scoped>
	@import "~common/less/variable";
	@import "~common/less/mixin";
	.player{
		.normal-player{
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			bottom: 0;
			background-color: @color-background;
		}
		.mini-player{
			display: flex;
			position:fixed;
			left:0;
			width:100%;
			bottom:0;
			height: 60px;
			background: @color-highlight-background
		}
	}
</style>