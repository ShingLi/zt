<template>
	<transition name='slide'>
		<div class="singer-detail"></div>
	</transition>
</template>
<script>
    import { mapGetters } from 'vuex'
	export default {
        name:'singer-detail',
        created(){
            console.log(this.singer)
        },
        computed:{
            ...mapGetters([
                'singer'
            ])
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