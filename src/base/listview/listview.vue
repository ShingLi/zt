<template>
	<scroll class="listview"
		:data = data
		:probeType = probeType
		:listenScroll= listenScroll
		@scroll = 'scroll'
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
				v-if='shortcutlist.length' 
				@touchstart.stop.prevent= 'onShortcutTouchStart($event)'
				@touchmove.stop.prevent='onShortcutTouchStartMove($event)'
			>
			<ul>
				<li class="item" 
					:data-index='index'
					v-for='(item,index) of shortcutlist'
					:class="{current:currentIndex == index}"
				>{{item}}</li>
			</ul>
		</div>
		<!--diff -->
		<div class="list-fixed" ref='fixed' v-show='fixedTitle'>
			<h1 class="fixed-title">{{fixedTitle}}</h1>
		</div>
	</scroll>
</template>
<script>
	import Scroll from 'base/scroll/scroll'
	import { getData } from 'common/js/dom'
	const ANCHOR_HEIGHT = 18
	const TITLE_HEIGHT = 30
    
	export default{
		data(){
			return {
				currentIndex:0,
				scrollY:-1,
				diff:-1
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
			this.touch ={} 

			this.listHeight = []
			this.probeType = 3
			this.listenScroll = true
		},
		computed: {
			shortcutlist() {
				return this.data.map(item=>{	
					return item.title.substr(0,1)
				})
			},
			fixedTitle() {
				if (this.scrollY>0) {
					return ''
				}
				return (this.data.length)?(this.data[this.currentIndex].title):''
			}
		},
		components:{
			Scroll
		},
		methods: {
			onShortcutTouchStart(e) {
				let anchorIndex = getData(e.target,'index')
				this.touch.y1 = e.touches[0].pageY
				this.touch.anchorIndex = parseInt(anchorIndex)
				this._scrollTo(anchorIndex)
			},
			onShortcutTouchStartMove(e) {
				this.touch.y2 = e.touches[0].pageY
				let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
				let anchorIndex = this.touch.anchorIndex + delta
				this._scrollTo(anchorIndex)

			},
			_scrollTo(index) {
				if (!index && index !==0 ) {
					return 
				}
				if (index<0) {
					index = 0
				}
				if ( index>this.listHeight.length-2 ) {
					index = this.listHeight.length-2
				}
				this.currentIndex = index
				this.$refs.scroll.scrollToElement(this.$refs.group[index],0)
			},
			_calculateHeight() {
				// 计算数据高度的区间
				let listHeight = []
				let height = 0
				let group = this.$refs.group

				listHeight.push(height)
				for (let i=0;i<group.length;i++) {

					let item = group[i]

					height += item.clientHeight

					listHeight.push(height)
				}
				this.listHeight = listHeight
				
			},
			scroll(pos) {
				this.scrollY = pos.y
			},
			selectSinger(item) {
				// console.log(item)
				this.$emit('select',item)
			}
		},
		watch:{
			data() {
				setTimeout(()=>{
					this._calculateHeight()
				},25)
			},
			scrollY(newY) {
				let listHeight = this.listHeight
				let index 
				if (newY>=0) {
					index = 0
				}
				for (let i=0;i<listHeight.length;i++) {
					let height1 = listHeight[i]
					let height2 = listHeight[i+1]
					if (-newY>height1 && -newY<height2) {

						index = i
						this.diff = height2 + newY
					}
				}
				
				this.currentIndex = index
				
			},
			diff(newY) {
				// 根据
				let offsetY = (newY>0 && newY<TITLE_HEIGHT)?(-TITLE_HEIGHT+newY):0
				this.$refs.fixed.style.transform = `translate3d(0,${offsetY}px,0)`
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