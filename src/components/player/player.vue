<template>
    <div class="player" v-show = "playList.length">
        <div class="nomal-player" v-show="fullScreen">
            <div class="background">
                <img :src="currentSong.image" width="100%" height="100%">
            </div>
            <div class="top">
                <div class="back" @click='minimum'>
                    <i class="icon-back"></i>
                </div>
                <h1 class="title" v-text="currentSong.name"></h1>
                <h2 class="name" v-text="currentSong.singer"></h2>
            </div>
            <div class="middle">
                <div class="middle-l">
                    <div class="cd-wrapper">
                        <img :src="currentSong.image" class="image">
                    </div>
                </div>
                <div class="middle-r"></div>
            </div>
            <div class="bottom">
                <div class="icon i-left">
                    <i class="icon-sequence"></i>
                </div>
                <div class="icon i-left">
                    <i class="icon-prev"></i>
                </div>
                <div class="icon i-center">
                    <i class="icon-pause"></i>
                </div>
                <div class="icon i-right">
                    <i class="icon-next"></i>
                </div>
                <div class="icon i-right">
                    <i class="icon-not-favorite"></i>
                </div>
            </div>
        </div>
        <div class="mini-player"  v-show="!fullScreen">
            
        </div>
    </div>
</template>
<script>
    import { mapGetters , mapMutations , mapActions } from 'vuex'
    export default {
        name:'player',
        computed: {
            ...mapGetters([
                'playList',
                'fullScreen',
                'currentSong'
            ])
        },
        methods: {
            minimum() {
                this._minimum(false)
            },
            ...mapMutations({
                _minimum:'SET_FULLSCREEN'
            })
        }
    }
</script>
<style lang='less' scoped>
    @import '~common/less/mixin.less';
    @import '~common/less/variable.less';
    .player{
        .nomal-player{
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            background: @color-background;
            .background{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                bottom: 0;
                z-index: -1;
                filter:blur(20px)
            }
            .top{
                .back{
                    position: absolute;
                    left: 6px;
                    .icon-back{
                        display: inline-block;
                        padding: 9px;
                        font-size: @font-size-large-x;
                        color: @color-theme;
                        transform: rotate(-90deg)
                    }
                }
                .title{
                    width: 70%;
                    line-height: 40px;
                    margin: 0 auto;
                    text-align:center;
                    .no-wrap();
                    font-size: @font-size-large;
                    color: @color-text
                }
                .name{
                    line-height: 25px;
                    text-align: center;
                    font-size: @font-size-medium;
                    color: @color-text
                }
            }
            .middle{
                position: fixed;
                width: 100%;
                top: 80px;
                bottom: 170px;
                font-size: 0;
                .middle-l{
                    position: relative;
                    display: inline-block;
                    width: 100%;
                    padding-top: 80%;
                    height: 0;
                    .cd-wrapper{
                        position: absolute;
                        top: 0;
                        left: 10%;
                        width: 80%;
                        height: 100%;
                        border: 10px solid rgba(255,255,255,.1);
                        border-radius: 50%;
                        .image{
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;

                        }
                    }
                }   
            }
            .bottom{
                position: fixed;
                left: 0;
                width: 100%;
                bottom: 50px;
                display: flex;
                align-items: center;
                .icon{
                    flex: 1;
                    color: @color-theme;   
                    i{
                        font-size: 30px;
                    }
                }
                .i-left{
                    text-align: right
                }
                .i-right{
                    text-align: left
                }
                .i-center{
                    padding: 0 20px;
                    text-align: center;
                    i{
                        font-size: 40px;
                    }
                }
                
            }
        }
        .mini-player{
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 60px;
            background: @color-highlight-background;
        }
    }
</style>


