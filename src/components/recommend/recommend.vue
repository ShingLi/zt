<template>
    <div class="recommend">
        <scroll class='recommend-content'
            :data='discList'
        >
            <div>
                <!-- 轮播图组件 -->
                <slider>
                    <!-- 插槽 -->
                    <div>
                        <a href="">
                            <img src="http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/278347.jpg">
                        </a>
                    </div>
                     <div>
                        <a href="">
                            <img src="https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/279936.jpg?max_age=2592000">
                        </a>
                    </div>
                </slider>
            </div>
        </scroll> 
    </div>
</template>
<script>
    import Scroll from 'base/scroll/scroll'
    import Slider from 'base/slider/slider'
    export default{
        name:'recommend',
        data(){
            return {
                discList:[]
            }
        },
        components:{
            Scroll,
            Slider
        }
    }
</script>

<style scoped lang='less'>
    @import '~common/less/variable.less';
    .recommend{
        position:fixed;
        top:88px;
        bottom:0;
        width:100%;

    }
</style>