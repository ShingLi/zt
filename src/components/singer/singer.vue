<template>
    <div class="singer">
        <list-view :data='singers' @select='selectSinger'></list-view>
        <router-view></router-view>
    </div>
</template>
<script>
	import ListView from 'base/listview/listview'
    import { getSingerList } from 'api/singer'
    
    import { mapMutations} from 'vuex'

	import { ERR_OK } from 'api/config'
	import Singer from 'common/js/Singer'

	const HOT_NAME = '热门',
		HOT_SINGER_LEN =10;
    export default{
        name:'singer',
        data(){
        	return {
        		singers:[]
        	}
        },
        created(){
        	this._getSingerList()
        },
        components:{
        	ListView
        },
        methods:{
        	_getSingerList(){
        		getSingerList().then(res=>{
        			if(ERR_OK === res.code){
        				// console.log(res)
        				this.singers = this._normalizeSinger(res.data.list)
        			}
        		})
        	},
        	_normalizeSinger(list){
        		const map ={
        			hot:{
        				title:HOT_NAME,
        				items:[]
        			}
        		}
        		list.forEach((item,index)=>{
        			if(index < HOT_SINGER_LEN){
        				map.hot.items.push(new Singer({
        					name: item.Fsinger_name,
            				id: item.Fsinger_mid
        				}))
        			}

        			const key = item.Findex
        		// console.log(map)

        			if(!map[key]){
        				map[key]= {
        					title:key,
        					items:[]
        				}
        			}
        			map[key].items.push(new Singer({
            			name: item.Fsinger_name,
            			id: item.Fsinger_mid
          			}))
        		})
        		console.log(map)
        		// 为了得到有序列表需要处理map
        		let hot =[],
        			ret =[];
        		for(let key in map){
        			let val = map[key]
        			if(val.title.match(/[a-zA-Z]/)){
        				ret.push(val)
        			}else if(val.title ===HOT_NAME){
        				hot.push(val)
        			}
        		}
        		ret.sort((a,b)=>{
        			return a.title.charCodeAt(0)-b.title.charCodeAt(0)
        		})
        		console.log(hot)
        		return hot.concat(ret)
        	},
            selectSinger(singer){
                this.$router.push(`/singer/${singer.id}`)
                // 映射
                this.setSinger(singer)
            },
            ...mapMutations({
                setSinger:'SET_SINGER'
            })
        }
    }
</script>
<style scoped lang='less'>
	.singer{
		position: fixed;
		top:88px;
		bottom: 0;
		width: 100%;
	}
</style>