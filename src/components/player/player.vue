<template>
	<div class="player" >
		<div class="normal-player" >
			<div class="background">
				<img width="100%" height="100%">
			</div>
			<div class="top">
				<div class="back">
					<i class="icon-back"></i>
				</div>
				<h1 class="title">标题</h1>
				<h2 class="subtitle">歌曲迷你</h2>
			</div>
			<div class="middle">
				<div class="middle-l">
					<div class="cd-wrapper">
						<div class="cd">
							<img class="image">
						</div>
					</div>
				</div>
			</div>
			<div class="bottom">
				<div class="dot-wrapper"></div>
				<div class="progress-wrapper"></div>
				<div class="operators">
					<div class="icon i-left"></div>
					<div class="icon i-left">
						<i class="icon-prev"></i>
					</div>
					<div class="icon i-center">
						<i></i>
					</div>
					<div class="icon i-right">
						<i class="icon-next"></i>
					</div>
					<div class="icon i-right">
						<i class="icon"></i>
					</div>
				</div>
			</div>
		</div>
		<div class="mini-player" v-show='fullScreen'>
			<div class="icon">
				<img width="40" height="40">
			</div>
			<div class="text">
				<h2 class="name"></h2>
				<p class="desc"></p>
			</div>
			<div class="control">
				
			</div>
			<div class="control">
				<i class="icon-playlist"></i>
			</div>
		</div>
	</div>
    
</template>
<script>
	import { mapGetters } from 'vuex'
	export default {
		name:'player',
		computed: {
            ...mapGetters([
                'playlist',
                'fullScreen'
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
			.background{
				position:absolute;
				left:0;
				top:0;
				width:100%;
				height:100%;
				z-index: -1;
				filter:blur(20px)
			}
			.top{
				position:relative;
				margin-bottom: 25px;
				.back{
					position:absolute;
					top:0;
					left:6px;
					z-index: 50;
					.icon-back{
						display:block;
						padding:9px;
						font-size: @font-size-large-x;
						color: @color-theme;
						transform:rotate(-90deg)
					}
				}
				.title{
					width:70%;
					margin: 0 auto;
					line-height: 40px;
					text-align: center;
					.no-wrap();
					font-size:@font-size-large;
					color:@color-text;
				}
				.subtitle{
					line-height:20px;
					text-align:center;
					font-size: @font-size-medium;
          			color: @color-text
				}
			}
			.middle{
				position:fixed;
				width:100%;
				top:80px;
				bottom:170px;
				white-space: nowrap;
				font-size:0;
				.middle-l{
					display:inline-block;
					vertical-align: top;
					position:relative;
					width:100%;
					height:0;
					padding-top: 80%;
					.cd-wrapper{
						position:absolute;
						left:10%;
						top:0;
						width:80%;
						height:100%;
						.cd{
							width:100%;
							height:100%;
							box-sizing: border-box;
							border: 10px solid rgba(255,255,255,.1);
							border-radius: 50%;

						}
					}
				}
			}
			.bottom{
				position: absolute;
				bottom:50%;
				width:100%;
				.operators{
					display:flex;
					align-items: center;
					.icon{
						flex:1;
						color:@color-theme;
						i{
							font-size:30px;
						}

					}
					.icon-left{
						text-align:right;
					}
				}
			}
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