<template>
    <div class="progress-bar">
        <div class="bar-inner" ref='progressBar'>
            <div class="progress" ref='progress'></div>
            <div class="progress-btn-wrapper">
                <div class="progress-btn"
                    ref='progressBtn'
                    @touchstart= 'progressTouchStart($event)'
                    @touchmove = 'progressTouchMove($event)'
                    @touchend  = 'progress.TouchEnd($event)'
                ></div>
            </div>
        </div>
    </div>
</template>
<script>
    import { prefixStyle } from 'common/js/dom'
    const transform = prefixStyle('transform')
    const width = 16
    export default {
        name: 'progress-bar',
        props: {
            percent:{
                type: Number,
                default:0
            }
        },
        created() {
            this.touch = {}
        },
        methods:{

        },
        watch: {
            percent (newPercent) {
                if (newPercent >0) {
                    const barWidth = this.$refs.progressBar.clientWidth -16
                    let offSet = newPercent * barWidth
                    this.$refs.progress.style.width = `${offSet}px`
                    this.$refs.progressBtn.style[transform] = `translate3d(${offSet}px,0,0)`
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '~common/less/variable' ;
    .progress-bar{
        height: 30px;
        .bar-inner{
            position: relative;
            height: 4px;
            top:13px;
            background: rgba(0,0,0,.3);
            .progress{
                position: absolute;
                height: 100%;
                background: @color-theme;
            }
            .progress-btn-wrapper{
                position: absolute;
                width: 30px;
                height: 30px;
                top:-13px;
                left: -7px;
               .progress-btn{
                    position: relative;
                    width: 16px;
                    height: 16px;
                    left: 7px;
                    top:7px;
                    border-radius: 50%;
                    box-sizing: border-box;
                    border: 3px solid #fff;
                    background: @color-theme;
               }
            }
        }
    }
</style>


