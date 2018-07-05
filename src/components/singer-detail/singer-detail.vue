<template>
	<transition name='slide'>
		<div class="singer-detail"></div>
	</transition>
</template>
<script>
    import { mapGetters } from 'vuex'

    import { getSingerDetail } from 'api/singer'
    import { ERR_OK } from 'api/config'
	export default {
        name:'singer-detail',
        data(){
        	songs:[]
        },
        created(){
            // console.log(this.singer)
            this._getDetail()
        },
        computed:{
            ...mapGetters([
                'singer'
            ])
        },
        methods:{
        	_getDetail(){
        		if(!this.singer.id){
        			this.$router.push('/singer')
        			return 
        		}
        		getSingerDetail(this.singer.id).then(res=>{
        			if(ERR_OK == res.code){
        				console.log(res.data)
        			}
        		})
        	},
        	_normalizeSongs(){
        		
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