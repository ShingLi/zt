<template>
    <div class="progress-bar">
        <div class="bar-inner">
            <div class="progress" ref='progress'></div>
            <div class="progress-btn-wrapper">
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'progress-bar',
        props: {
            percent: Number,
            default: 0
        },
        watch: {
            percent (newPercent) {
               this.$refs.progress.style.width = `${newPercent}%`
               this.$refs.progress.style.height = `100%`

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


