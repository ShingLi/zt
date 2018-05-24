<template>
    <div class="recommend">
        <scroll class='recommend-content'
            :data='discList'
            ref='scroll'
        >
            <div>
                <!-- 轮播图组件 -->
                <div v-if='recommends.length' style="position: relative;width: 100%;overflow: hidden;">
                    <slider>
                        <!-- 插槽 -->
                        <div v-for='item in recommends'>
                            <a :href="item.linkUrl">
                                <img :src="item.picUrl" @load='loadImage'>
                            </a>
                        </div>
                    </slider>
                </div>
                <!-- 推荐的列表 -->
                <div class="recommend-list">
                    <h1 class="list-title">热门歌曲推荐</h1>
                    <ul>
                        <li class="item">
                            <div class="icon">
                                <img src="http://p.qpic.cn/music_cover/5Olm9QQMvPcH2ZbO9nA2zP7vxwk5uRA7euu5klvg0gGQ3HqgC7GIyQ/600?n=1" width="60" height="60">
                            </div>
                            <div class="text">
                                <h2 class="name">我的歌单就是这么好</h2>
                                <p class="desc">2018公告牌音乐奖获奖&提名List</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </scroll> 
    </div>
</template>
<script>
    import Scroll from 'base/scroll/scroll'
    import Slider from 'base/slider/slider'
    import { getRecommend ,getDiscList } from 'api/recommend'
    export default{
        name:'recommend',
        data(){
            return {
                discList:[],
                recommends: [],
            }
        },
        created(){
            this._getRecommend()
            this._getDiscList()

        },
        mounted(){
           
        },
        components:{
            Scroll,
            Slider
        },
        methods:{
            _getRecommend(){
                getRecommend().then(res=>{
                    this.recommends = res.data.slider
                }).catch(err=>{
                    console.log(err)
                })
            },
            _getDiscList(){
                getDiscList().then(res=>{
                    console.log(res)
                })
            },
            loadImage(){
                if(!this.checkloaded){
                    this.checkloaded = true
                    this.$refs.scroll.refresh()
                }
            }
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
        .recommend-list{
            .list-title{
                height: 65px;
                line-height: 65px;
                text-align: center;
                font-size: @font-size-medium;
                color: @color-theme ;
            }
            .item{
                display: flex;
                align-items: center;
                box-sizing: border-box;
                padding:0 20px 20px 20px;
                .icon{
                    flex: 0 0 60px;
                    width: 60px;
                    padding-right: 20px;
                }
                .text{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    flex: 1;
                    line-height: 20px;
                    overflow: hidden;
                    font-size: @font-size-medium;
                    .name{
                        margin-bottom: 10px;
                        color: @color-text;
                    }
                    .desc{
                        color: @color-text-d;
                    }
                }
            }
        }
    }
</style>