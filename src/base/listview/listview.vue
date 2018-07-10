<template>
	<scroll class="listview"
		:data = 'data'
        :listenScroll = listenScroll
        :probeType = probeType
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
		<!-- 顶部的固定 -->
		<div class="list-fixed"
			v-show='fixedTitle'
			ref='fixedTitle'
		>
			<h1 class="fixed-title">{{fixedTitle}}</h1>
		</div>
	</scroll>
</template>
<script>
	import Scroll from 'base/scroll/scroll'
	import { getData } from 'common/js/dom'
    const ANCHOR_HEIGHT = 18,
    		TITLE_HEIGHT=30;
	export default{
		data(){
			return {
                currentIndex:0,
                scrollY:-1,//默认滚动的距离
                diff:0,//默认的偏移量
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
			},
			// 列表顶部固定的标题
			fixedTitle(){
				if(this.scrollY>0){
					return ''
				}
				return this.data[this.currentIndex]?this.data[this.currentIndex].title:''
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
                console.log(index)
                if(!index&&index!==0){
                	// 防止点击在首位丢失Index
                	return 
                }
                if(index<0){
                	index = 0
                }else if(index>this.listHeight.length-2){
                	index = this.listHeight.length-2
                }
                this.scrollY = -this.listHeight[index]
                this.$refs.scroll.scrollToElement(this.$refs.group[index],0)
            },
            scroll(pos){
                this.scrollY = pos.y
                
            },
            _calculateHeight(){
                this.listHeight =[]
                let height = 0
                const list = this.$refs.group
                this.listHeight.push(height)

                for(let i=0;i<list.length;i++){
                    let item = list[i]
                    height+= item.clientHeight
                    this.listHeight.push(height)
                }
                console.log(this.listHeight)
            },
             selectSinger(singer){
        		this.$emit("select",singer)
        	},

        },
        watch:{
            data(){
               setTimeout(()=>{
                   this._calculateHeight()
               })
            },
            scrollY(newY){
                let listHeight = this.listHeight
                if(newY>0){
                    this.currentIndex = 0
                    return 
                }

                for(let i = 0; i< listHeight.length - 1;i++){
                    let [height1,height2] = [listHeight[i],listHeight[i+1]]
                    if(-newY>=height1&&-newY<height2){
                        this.currentIndex = i
                        this.diff  = height2 + newY
                        return 
                    }
                }
                this.currentIndex = listHeight.length-2
            },
            diff(newY){
            	// 偏移量
            	// 思路是先计算出每一个区间的高度 放到一个数组里面 然后
            	// 高度和scrollY进行计算 得出一个变化的区间值
            	// diff
            	// watch之歌diff值，这里- 是因为transform 上移动是复制
            	let fixedTop = (newY>0&&newY<TITLE_HEIGHT)?newY - TITLE_HEIGHT:0
            	if (this.fixedTop === fixedTop) {
          			return
        		}
        		console.log(fixedTop)
            	this.fixedTop = fixedTop //减少操作DOM的次数
            	this.$refs.fixedTitle.style.transform = `translate3d(0,${fixedTop}px,0)`
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