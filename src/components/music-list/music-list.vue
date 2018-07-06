<template>
	<div class="music-list">
		<div class="back">
			<i class="icon-back"></i>
		</div>
		<h1 class="title" v-text='title'></h1>
		<div class="bg-image" :style='bgStyle'>
			<div class="play-wrapper">
				<div class="play">
					<i class="icon-play"></i>
					<span class="text">随机播放全部</span>
				</div>
			</div>
		</div>
		<scroll :data='songs' class='list'>
			<div class="song-list-wrapper">

			</div>
		</scroll>
	</div>
</template>
<script>
	import scroll from 'base/scroll/scroll'
	export default {
		name:'music-list',
		props:{
			title:{
				type:String,
				default:''
			},
			bgImage:{
				type:String,
				default:''
			},	
			songs:{
				type:Array,
				default:[]
			}
		},
		computed:{
			bgStyle(){
				return `background-image:url(${this.bgImage})`
			}
		},
		components:{
			scroll
		}
	}
</script>
<style lang='less' scoped>
	@import '~common/less/variable.less';
	@import '~common/less/mixin.less';
	.music-list{
		position: fixed;
		top:0;
		left: 0;
		width: 100%;
		bottom: 0;
		background:@color-background;
		.back{
			position: absolute;
			top:0;
			left: 6px;
			z-index: 50;
			.icon-back{
				display: inline-block;
				padding: 10px;
				font-size: @font-size-large-x;
        		color: @color-theme
			}
		}
		.title{
			position: absolute;
			top: 0;
			left: 10%;
			width: 80%;
			z-index: 40;
			.no-wrap();
			text-align: center;
			line-height: 40px;
			font-size: @font-size-large;
			color: @color-text
		}
		.bg-image{
			position: relative;
			width: 100%;
			height: 0;
			padding-top: 70%;
			background-size: cover;
			.play-wrapper{
				position: absolute;
				bottom: 20px;
				z-index: 50;
				width: 100%;
          		.play{
          			box-sizing: border-box;
          			width: 135px;
					padding:7px 0;
					margin: 0 auto;
	          		text-align: center;
	          		border: 1px solid @color-theme;
	          		color: @color-theme;
	          		border-radius: 100px;
	          		font-size: 0;
	          		.icon-play{
	          			display: inline-block;
			            vertical-align: middle;
			            margin-right: 6px;
			            font-size: @font-size-medium-x;
	          		}
          			.text{
          				display: inline-block;
			            vertical-align: middle;
			            font-size: @font-size-small
          			}
          		}
			}
		}
		.list{
			position: fixed;
			top:0;
			left: 0;
			width: 100%;
			bottom:0;
			// background: #222;
			.song-list-wrapper{
				padding: 20px 30px;
			}
		}
		
	}
</style>