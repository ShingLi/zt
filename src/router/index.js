import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes =[
        {
            path: '/',
            name: 'recommend',
            component: resolve=>require(['components/recommend/recommend'],resolve)
        }   
    ]

export default new Router({
    routes
})
