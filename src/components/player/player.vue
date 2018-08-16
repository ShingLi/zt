<template>
    <div class="player" v-show = "playList.length">
        <transition name='normal'
            @enter = 'enter'
            @after-enter='afterEnter'
            @leave = 'leave'
            @after-leave= 'afterLeave'
        >
        	<div class="normal-player" v-show="fullScreen">
	            <div class="background">
	                <img :src="currentSong.image" width="100%" height="100%">
	            </div>
	            <div class="top">
	                <div class="back" @click='minimum'>
	                    <i class="icon-back"></i>
	                </div>
	                <h1 class="title" v-html="currentSong.name"></h1>
	                <h2 class="name" v-text="currentSong.singer"></h2>
	            </div>
	            <div class="middle">
	                <div class="middle-l">
	                    <div class="cd-wrapper" ref="cdWrapper">
	                        <img :src="currentSong.image" class="image" :class="isRotate">
	                    </div>
                        <!-- 时间进度条 -->
                        <div class="playing-lyric-wrapper">
                            <div class="playing-lyric"></div>
                        </div>
	                </div>
	                <div class="middle-r">
                        <!-- 右边歌词部分 -->
                    </div>
	            </div>
	            <div class="bottom">
                    <!-- progress -->
                    <div class="progress-wrapper">
                        <span class="time time-l">{{format(currentTime)}}</span>
                        <div class="progress-bar-wrapper">
                            <progress-bar></progress-bar>
                        </div>
                        <span class="time time-r">{{format(currentSong.duration)}}</span>
                    </div>
                    <!--featuers -->
	                <div class="operators">
	                	<div class="icon i-left">
	                    	<i class="icon-sequence"></i>
		                </div>
		                <div class="icon i-left" :class='disabledCls'>
		                    <i class="icon-prev" @click="prev"></i>
		                </div>
		                <div class="icon i-center" :class='disabledCls'>
		                    <i @click="togglePlaying" :class="playIcon"></i>
		                </div>
		                <div class="icon i-right">
		                    <i class="icon-next" @click="next" :class='disabledCls'></i>
		                </div>
		                <div class="icon i-right">
		                    <i class="icon-not-favorite"></i>
		                </div>
	                </div>
	            </div>
        	</div>
        </transition>
        <transition name="mini">
        	<div class="mini-player"  v-show="!fullScreen" @click='open'>
	            <div class="icon">
	            	<img :src="currentSong.image" width="40" height="40" :class="isRotate">
	            </div>
	            <div class="text">
	            	<h2 class="name" v-html='currentSong.name'></h2>
	            	<p class="singer" v-html='currentSong.singer'></p>
	            </div>
	            <div class="control">
                    <i :class="playMini" @click.stop="togglePlaying"></i>
                </div>
	            <div class="control">
	            	<i class="icon-playlist"></i>
	            </div>
        	</div>
        </transition>
        <audio :src="currentSong.url" 
            ref='audio' 
            @canplay="ready" 
            @error="error"
            @timeupdate = 'timeUpdate($event)'
                        
        ></audio>
    </div>
</template>
<script>
    import { mapGetters , mapMutations , mapActions } from 'vuex'
    import animations from 'create-keyframe-animation'
    import ProgressBar from 'base/progress-bar/progress-bar'
    export default {
        name:'player',
        data() {
            return {
                songReady: false,
                currentTime:0
            }
        },
        computed: {
            playIcon() {
                return this.playing ?'icon-pause' :'icon-play'
            },
            playMini() {
                return this.playing ?'icon-pause-mini' :'icon-play-mini'
            },
            isRotate() {
                return this.playing ?'rotate' :'rotate pause'
            },
            disabledCls() {
                return this.songReady ? "":'disable'
            },
            ...mapGetters([
                'playList',
                'fullScreen',
                'currentSong',
                'playing',
                'currentIndex'
            ])
        },
        components: {
            ProgressBar
        },
        methods: {
            minimum() {
                this.setFullScreen(false)
            },
            open() {
            	this.setFullScreen(true)
            },
            enter(el,done) {
                let { x, y, scale } = this._getPosAndScale()
                const animation ={
                    0:{
                        transform:`translate3d(${x}px,${y}px,0) scale(${scale})`
                    },
                    60:{
                        transform:`translate3d(0,0,0) scale(1.1)`
                    },
                    100:{
                        transform:`translate3d(0,0,0) scale(1)`

                    }
                }
                animations.registerAnimation({
                    name:'move',
                    animation,
                    presets: {
                        duration: 600,
                        easing: 'linear'
                    }
                })
                animations.runAnimation(this.$refs.cdWrapper,'move',done)
            },
            afterEnter() {
                this.$refs.cdWrapper.style.animation = ''
            },
            leave(el,done) {
                const {x, y, scale } = this._getPosAndScale()
                this.$refs.cdWrapper.style.transition = 'all .6s'
                this.$refs.cdWrapper.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`
                this.$refs.cdWrapper.addEventListener('transitionend',done)
            },
            afterLeave() {
                this.$refs.cdWrapper.style.transition = ''
                this.$refs.cdWrapper.style.transform = ''
            },
            _getPosAndScale() {
                // 获取坐标的初始位置
                const targetWidth = 40
                const paddingLeft = 40
                const paddingBottom = 30
                const paddingTop = 80
                const width = window.innerWidth *.8
                const x = -(window.innerWidth / 2 - paddingLeft)
                const y = window.innerHeight - paddingTop - width - paddingBottom
                const scale = targetWidth / width
                return {
                    x,
                    y,
                    scale
                }
            },
            togglePlaying() {
                this.setPlaying(!this.playing)
            },
            ready() {
                this.songReady = true
            },
            error() {
                // 网络错误
                this.songReady = true
            },
            timeUpdate(e) {
                console.log(e)
                this.currentTime = e.target.currentTime
                
                // this.format(this.currentTime)
            },
            // 格式化时间
            format(interval) {
                interval = interval | 0
                let minute = interval / 60 | 0
                let secode = this._pad(interval % 60)
               
                return `${minute}:${secode}`
            },
            _pad(num, n=2) {
                // 零位补全
                let len = num.toString().length 
                while (len < n ) {
                    num = `0${num}`
                    len ++
                }
                return num
            },
            prev() {
                if (!this.songReady) return
                if(!this.playing) {
                    this.togglePlaying()
                }
                let index = this.currentIndex -1
                if(index == -1) {
                    index = this.playList.length -1
                }
                this.songReady = false
                this.setCurrentIndex(index)
            },
            next() {
                if (!this.songReady) return
                if(!this.playing) {
                    this.togglePlaying()
                }
                let index = this.currentIndex +1
                if( index == this.playList.length ) {
                    index = 0
                }
                this.songReady = false
                this.setCurrentIndex(index)
            },
            ...mapMutations({
                setFullScreen:'SET_FULLSCREEN',
                setPlaying:'SET_PLAYING',
                setCurrentIndex:'SET_CURRENTINDEX'
            })
        },
        watch: {
            currentSong() {
                this.$nextTick(() => {
                    this.$refs.audio.play()
                })
            },
            playing(newPalying) {
                let audio = this.$refs.audio
                this.$nextTick(() => {
                    newPalying ?audio.play():audio.pause()
                })
            }
        }

    }
</script>
<style lang='less' scoped>
    @import '~common/less/mixin.less';
    @import '~common/less/variable.less';
    .player{
        .normal-player{
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
                        //旋转
                        .rotate{
                            animation: rotate 15s linear infinite;
                        }
                        .pause{
                            animation-play-state: paused
                        }
                    }
                }
            }
            .bottom{
                position: fixed;
                left: 0;
                width: 100%;
                bottom: 50px;
                .progress-wrapper{
                    display: flex;
                    align-items: center;
                    width: 80%;
                    margin: 0 auto;
                    padding: 10px 0;
                    .time{
                        flex: 0 0 30px;
                        width: 30px;
                        line-height: 30px;
                        font-size: @font-size-small;
                        color:@color-text;
                        &.time-l{
                            text-align: left
                        }
                        &.time-r{
                            text-align: right
                        }
                    }
                    .progress-bar-wrapper{
                        flex: 1;
                    }
                }
                .operators{
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

        }
        .mini-player{
            position: fixed;
			display: flex;
			-ms-align-items: center;
			align-items: center;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 60px;
            background: @color-highlight-background;
			.icon{
				flex: 0 0 40px;
				width: 40px;
				padding:0 10px 0 20px;
				img{
					border-radius: 50%;
                }
                //旋转
                .rotate{
                     animation: rotate 10s linear infinite;

                }
                .pause{
                    animation-play-state: paused
                }
			}
			.text{
				flex: 1;
				line-height: 20px;
				overflow: hidden;
				.name{
					.no-wrap();
					font-size: @font-size-medium
				}
				.singer{
					.no-wrap();
					font-size: @font-size-small
				}
			}
			.control{
				flex: 0 0 30px;
				width: 30px;
                padding:  0 10px;
                .icon-play-mini,.icon-pause-mini{
                    font-size: 30px;
					color: @color-theme-d
                }
				.icon-playlist{
					font-size: 30px;
					color: @color-theme-d
				}
			}
        }

    }
    // 动画部分
    .normal-enter-active,.normal-leave-active{
        transition:all .4s ;
        .top,.bottom{
            transition:all .4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
        }
    }
    .normal-enter,.normal-leave-to{
        opacity: 0;
        .top{
            transform: translate3d(0,-100px,0)
        }
        .bottom{
            transform: translate3d(0,100px,0)
        }
    }
    .mini-enter-active,.mini-leave-active{
        transition: all .4s
    }
    .mini-enter,.mini-leave-to{
        opacity: 0;
    }
    @keyframes rotate {
        form{
            transform: rotate(0deg)
        }
        to{
            transform: rotate(360deg)
        }
    }
</style>