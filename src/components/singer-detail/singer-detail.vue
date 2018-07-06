<template>
	<transition name='slide'>
		<music-list :songs='songs' :title ='title' :bg-image='bgImage'></music-list>
	</transition>
</template>
<script>
    import { mapGetters } from 'vuex'

    import { getSingerDetail } from 'api/singer'
    import { ERR_OK } from 'api/config'
    import { createSong }from 'common/js/song'

    import MusicList from 'components/music-list/music-list'
	export default {
        name:'singer-detail',
        data(){
        	return {
                songs:[]
            }
        },
        created(){
            console.log(this.singer)
            this._getDetail()
        },
        computed:{
            title(){
                return this.singer.name
            },
            bgImage(){
                return this.singer.avatar
            },
            ...mapGetters([
                'singer'
            ])
        },
        components:{
            MusicList
        },
        methods:{
        	_getDetail(){
        		if(!this.singer.id){
        			this.$router.push('/singer')
        			return 
        		}
        		getSingerDetail(this.singer.id).then(res=>{
        			if(ERR_OK == res.code){
        				// console.log(res.data)
                        this.songs = this._normalizeSongs(res.data.list)
        			}
        		})
        	},
        	_normalizeSongs(list){
                let ret = []
        		list.forEach(item=>{
                    let { musicData }= item
                    if (musicData.songid && musicData.albummid) {
                        ret.push(createSong(musicData))
                    }
                })
                return ret
        	}
        }
	}
</script>
<style lang='less'>
	@import '~common/less/variable.less';
	.singer-detail{
		position: fixed;
		top:0;
		left: 0;
		width: 100%;
		bottom: 0;
		background:@color-background;
	}
	.slide-enter-active, .slide-leave-active{
		transition: all 0.3s
	}

  	.slide-enter, .slide-leave-to{
		transform: translate3d(100%, 0, 0)
  	}
</style>