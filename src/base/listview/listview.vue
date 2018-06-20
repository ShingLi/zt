<template>
	<scroll class="listview"
		:data = 'data'
        :listenScroll = this.listenScroll
        :probeType = this.probeType
        ref="scroll"
        @scroll = "scroll"
	>
		<ul>
			<li class="list-group" 
                v-for='group in data'
                ref = "group"
            >
				<h2 class="list-group-title" v-text='group.title'></h2>
				<ul>
					<li class="list-group-item" v-for='item in group.items'>
						<img :src="item.avatar" alt="" class="avatar">
						<span class="name" v-text='item.name'></span>
					</li>
				</ul>
			</li>
		</ul>
		<!-- 右侧的列表 -->
		<div class="list-shortcut" 
            @touchstart='onShortcutTouchStart($event)'
            @touchmove.stop.prevent ='onshortcutTouchMove($event)'
        >
			<ul>
				<li class="item"
					v-for='(item,index) of shortcutList'
                    :key='index'
					:class='{current:currentIndex===index}'
					:data-index= "index"
				>
					{{item}}
				</li>
				
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
                currentIndex:0,
                scrollY:-1,//默认滚动的距离
			}
		},
		props:{
			data:{
				type:Array|Object,
				default:()=>{
					return []
				}
			}
		},
        created(){
            this.touch = {},
            this.listenScroll = true
            this.probeType = 3
            this.listHeight = []
        },
		computed:{
			shortcutList(){
                // title 的数组
				return this.data.map((item)=>{
					return item.title.substr(0,1)
				})
			}
		},
		components:{
			Scroll
		},
		methods:{
			onShortcutTouchStart(e){
                let index = getData(e.target,'index')
                this._scroll(index)
                // 滑动
                let firstTouch = e.touches[0]
                this.touch.y1 = firstTouch.pageY
                this.touch.index = index

            },
            onshortcutTouchMove(e){
                let firstTouch = e.touches[0]
                this.touch.y2  = firstTouch.pageY
                let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0 ,
                    index = parseInt(this.touch.index) + delta ;
                this._scroll(index)
            },
            _scroll(index){
                // console.log(this.$refs.group)
                this.$refs.scroll.scrollToElement(this.$refs.group[index],0)
            },
            scroll(pos){
                this.scrollY = pos.y
                
            },
            _calculateHeight(){
                this.listHeight =[]
                let height = 0;
                const list = this.$refs.group
                this.listHeight.push(height)
                for(let i =0;i<list.length;i++){
                    let item= list[i]
                    console.log(item)
                }
            }

        },
        watch:{
            data(){
                setTimeout(()=>{
                    this._calculateHeight()
                },20)
            },
            scrollY(newVal){

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
			padding-top: 30px;
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
	}
</style>