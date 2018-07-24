<template>
	<scroll class="listview"
		:data = data
		ref='scroll'
	>
		<ul>
			<li class="list-group" 
                v-for='group in data'
                ref = "group"
            >
				<h2 class="list-group-title" v-text='group.title'></h2>
				<ul>
					<li class="list-group-item" 
						v-for='item in group.items'
						@click='selectSinger(item)'
					>
						<img :src="item.avatar" alt="" class="avatar">
						<span class="name" v-text='item.name'></span>
					</li>
				</ul>
			</li>
		</ul>
		<div 
			class="list-shortcut" 
				@touchstart.stop.prevent= 'onShortcutTouchStart($event)'
				@touchmove.stop.prevent='onShortcutTouchStartMove($event)'
			>
			<ul>
				<li class="item" 
					:data-index='index'
					v-for='(item,index) of shortcutlist'
					:class='{current:currentIndex==index}'
				>{{item}}</li>
			</ul>
		</div>
	</scroll>
</template>
<script>
	import Scroll from 'base/scroll/scroll'
	import { getData } from 'common/js/dom'
	const ANCHOR_HEIGHT = 18
    
	export default{
		data(){
			return {
               currentIndex:0
			}
		},
		props:{
			data: {
				type:Array|Object,
				default:()=>{
					return []
				}
			}
		},
        created() {
            this.touch = {}
        },
		computed: {
			shortcutlist() {
				return this.data.map(group=>{
					return group.title.substr(0,1)
				})
			}
		},
		components: {
			Scroll
		},
		methods: {
			onShortcutTouchStart(e){
				// console.log(e)
				this.touch.y1 = e.touches[0].pageY
				this.currentIndex = getData(e.target,'index')
				this.$refs.scroll.scrollToElement(this.$refs.group[this.currentIndex])
			},
			onShortcutTouchStartMove(e) {
				this.touch.y2 = e.touches[0].pageY
				let index = ~~(this.touch.y2-this.touch.y1)/ ANCHOR_HEIGHT
				this.$refs.scroll.scrollToElement(this.$refs.group[index])

			},
			selectSinger(item) {

			}
		}
	}
</script>
<style scoped lang='less'>
	@import '~common/less/variable';
	.listview{
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: @color-background;
		.list-group{
			padding-bottom: 30px;
			.list-group-title{
				height: 30px;
				line-height: 30px;
				padding-left: 20px;
				font-size: @font-size-small;
				color: @color-text-l;
				background: @color-highlight-background;
			}
			.list-group-item{
				display: flex;
				-ms-align-items: center;
				align-items: center;
				padding: 20px 0 0 30px;
				.avatar{
					width: 50px;
					height: 50px;
					border-radius: 50%;
				}
				.name{
					margin-left: 20px;
					color: @color-text-l;
          			font-size: @font-size-medium
				}
			}
		}
		.list-shortcut{
			position: absolute;
			right: 0;
			top:50%;
			transform: translateY(-50%);
			width: 20px;
			padding:20px 0;
			text-align: center;
			border-radius: 10px;
			background: @color-background-d;
			.item{
				padding:3px;
				line-height: 1;
				color:@color-text-l;
				font-size: @font-size-small;
				&.current{
					color:@color-theme;
				}
			}
		}
		.list-fixed{
			position: absolute;
			top:0;
			left: 0;
			width: 100%;
			.fixed-title{
				height:30px;
				line-height: 30px;
				padding-left: 20px;
				font-size: @font-size-small;
        		color: @color-text-l;
        		background: @color-highlight-background
			}
		}
	}
</style>