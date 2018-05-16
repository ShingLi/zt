<template>
    <div class="m-header">
        <div class="icon"></div>
        <h1 class="text">music</h1>
        <router-link to='/user' tag='div' class='mine'>
            <i class="icon-mine"></i>
        </router-link>
    </div>
</template>
<script>
    export default{
        name:'m-header'
    }
</script>
<style scoped lang='less'>
    @import '~common/less/variable';
    @import '~common/less/mixin';
    .m-header{
        position:relative;
        height:44px;
        text-align:center;
        color:@color-theme;
        font-size:0;
        .icon{
            display:inline-block;
            vertical-align:top;
            margin-top:6px;
            width:30px;
            height:32px;
            margin-right:9px;
            .bg-image('logo');
            background-size:30px;
        }  
        .text{
            display:inline-block;
            line-height:44px;
            vertical-align:top;
            font-size:@font-size-large;
        }
        .mine{
            position: absolute;
            top:0;
            right: 0;
            .icon-mine{
                display: block; 
                padding:12px;
                font-size: 20px;
                color:@color-theme;
            }
        }
    }
</style>

