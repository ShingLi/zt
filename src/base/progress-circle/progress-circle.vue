<template>
    <div class="progress-circle">
        <svg :width='radius' :height='radius'  viewBox = '0 0 100 100' version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle cx='50' cy='50' r='50' fill='transparent' class="progress-background"></circle>
            <circle
                cx='50'
                cy='50'
                r='50'
                fill='transparent'
                :stroke-dasharray='strokeDashArray'
                :stroke-dashoffset='strokeDashOffset'
                class="progress-circle-bar"
              >
            </circle>
        </svg>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props:{
        radius:{
            type:Number,
            default:100
        },
        percent:{
            type:Number,
            default:0
        }
    },
    computed:{
        strokeDashArray() {
            return Math.PI * 100
        },
        strokeDashOffset() {
            return (1-this.percent) * this.strokeDashArray
        }
    }
}
</script>

<style lang="less" scoped>
    @import '~common/less/variable.less';
    .progress-circle{
        position: relative;
        circle{
            stroke-width: 8px;
            transform-origin: center;
            &.progress-background{
                stroke: @color-theme-d;
                transform: scale(.9)
            }
            &.progress-circle-bar{
                stroke: @color-theme;
                transform: scale(.9) rotate(-90deg)

            }
        }
    }

</style>
