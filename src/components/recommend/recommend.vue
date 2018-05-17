<template>
    <div class="recommend">
        <scroll class='recommend-content'
            :data='descList'
        >
            <div></div>
        </scroll> 
    </div>
</template>
<script>
    import Scroll from 'base/scroll/scroll'
    export default{
        name:'recommend',
        data(){
            return {
                discList:[]
            }
        },
        components:{
            Scroll
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