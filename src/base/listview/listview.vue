<template>
	<scroll class="listview"
		:data = 'data'
        ref="scroll"
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
		<div class="list-shortcut" @touchstart='onShortcutTouchStart($event)'>
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
	export default{
		data(){
			return {
				currentIndex:0
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
                console.log(index)
                this.$refs.scroll.scrollToElement(this.$refs.group[index],0)
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