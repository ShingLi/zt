<template>
    <div class="slider" ref='slider'>
        <div class="slider-group" ref= 'sliderGroup'>
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot"
                v-for='item,index in dots'
                :class ="{active:index===currentIndex}"
            ></span>
        </div>
    </div>
</template>
<script>
    import { addClass } from 'common/js/dom'
    import BScroll from 'better-scroll'

    export default{
        name:'slider',
        props:{
            loop:{
                type:Boolean,
                default:true
            },
            autoPlay:{
                type:Boolean,
                default:true
            },
            interval:{
                type:Number,
                default:2000
            }
        },
        data(){
            return {
                dots:[],
                currentIndex:0
            }
        },
        mounted(){
            setTimeout(()=>{
                this._setSliderWidth()
                this._initdots()
                this._initSlider()
            },25)
        },
        methods:{
            _setSliderWidth(isResize){
                this.children = this.$refs.sliderGroup.children 
                let width = 0,
                    sliderWidth = this.$refs.slider.clientWidth;
                for(let i=0; i<this.children.length;i++){
                    let child = this.children[i]
                    addClass(child,'slider-item')
                    child.style.width = sliderWidth+'px'
                    width +=sliderWidth;
                }
                if(this.loop&&!isResize){
                    width+= 2*sliderWidth

                }
                this.$refs.sliderGroup.style.width = width+'px'
            },
            _initdots(){
                this.dots =new Array(this.children.length)
            },
            _initSlider(){
                this.slider = new BScroll(this.$refs.slider,{
                    scrollX:true,
                    snap:{
                        loop:this.loop
                    }

                })
                this.slider.on('scrollEnd',()=>{
                    let pageIndex = this.slider.getCurrentPage().pageX;
                    if (this.loop) {
                        pageIndex -= 1
                    }
                    this.currentIndex = pageIndex
                    if(this.autoPlay){
                        this._autoPlay()
                    }
                })
                
                this.slider.on('beforeScrollStart', () => {
                    if (this.autoPlay) {
                        clearTimeout(this.timer)
                    }
                })
            },
            _autoPlay(){
                let pageIndex = this.currentIndex +1
                if(this.loop){
                    pageIndex+=1
                }
                this.timer = setTimeout(()=>{
                    this.slider.goToPage(pageIndex, 0, 400)
                },this.interval) 
            }
        }
    }   
</script>
<style scoped lang='less'>
    @import '~common/less/variable.less';
    .slider{
        min-height: 1px;
        .slider-group{
            position:relative;
            overflow: hidden;
            .slider-item{
                float: left;
                a{
                    display: block;
                    img{
                        display: block;
                        width: 100%;
                    }
                }
            }
        }
        .dots{
            position: absolute;
            left:0;
            right: 0;
            bottom: 12px;
            z-index: 99;
            text-align: center;
            font-size: 0;
            // background-color:@color-text;
            .dot{
                display: inline-block;
                margin:0 4px;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: @color-text-l ;
                &.active{
                    width: 20px ;
                    border-radius: 5px ;
                    background: @color-text-ll
                }
            }
        }

    }
</style>