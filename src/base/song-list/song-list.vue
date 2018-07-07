<template>
	<ul class="song-list">
		<li class="item" v-for='(song ,index) of songs'>
			<div class="content">
				<h2 class="name">{{song.name}}</h2>
				<p class="desc">{{getDesc(song)}}</p>
			</div>
		</li>
	</ul>
</template>
<script>
	export default {
		props:{
			songs:{
				type:Array,
				default:[]
			}
		},
		methods:{
			getDesc(song){
				return `${song.singer}·${song.album}`
			}
		}
	}
</script>
<style lang='less' scoped>
	@import '~common/less/variable';
	.song-list{
		.item{
			display: flex;
			-ms-align-items: center;
			align-items: center;
			box-sizing:border-box;
			height: 64px;
			font-size: @font-size-medium;
			.content{
				flex: 1;
				line-height: 20px;
				overflow: hidden;
				.name{
					color: @color-text
				}
				.desc{
					margin-top: 4px;
					color: @color-text-d
				}
			}
		}
	}
</style>