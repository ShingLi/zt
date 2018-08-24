<template>
    <div class="progress-bar">
        <div class="bar-inner" ref='progressBar' @click = progressClick($event)>
            <div class="progress" ref='progress'></div>
            <div class="progress-btn-wrapper">
                <div class="progress-btn"
                    ref='progressBtn'
                    @touchstart= 'progressTouchStart($event)'
                    @touchmove = 'progressTouchMove($event)'
                    @touchend  = 'progressTouchEnd($event)'
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
            progressTouchStart(e) {
                this.touch.inited = true
                this.touch.startX = e.touches[0].pageX
                this.touch.left = this.$refs.progress.clientWidth
            },
            progressTouchMove(e) {
                if(!this.touch.inited) return
                const deltaX = e.touches[0].pageX - this.touch.startX
                let offSetWidth = Math.min(Math.max(0,this.touch.left + deltaX),this.$refs.progressBar.clientWidth - width)
                this._offSet(offSetWidth)
            },
            progressTouchEnd() {
                this.touch.inited = false
                this._triggerPercent()
            },
            _triggerPercent() {
                let percent = this.$refs.progress.clientWidth / (this.$refs.progressBar.clientWidth - width)
                this.$emit('changecurrenttime', percent)
            },
            // 共同的偏移函数
            _offSet(offSet) {
                this.$refs.progress.style.width = `${offSet}px`
                this.$refs.progressBtn.style[transform] = `translate3d(${offSet}px,0,0)`
            },
            progressClick(e) {
                this._offSet(e.offsetX)
                this._triggerPercent()
            }
        },
        watch: {
            percent (newPercent) {
                if (newPercent >=0 && !this.touch.inited) {
                    const barWidth = this.$refs.progressBar.clientWidth -width
                    let offSet = newPercent * barWidth
                    this._offSet(offSet)
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


