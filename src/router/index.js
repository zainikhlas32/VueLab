
import { createRouter,createWebHistory } from "vue-router"

import HomePage from '@/view/HomePage.vue'
import AboutPage from '@/view/AboutPage.vue'
import LokasiPage from '@/view/LokasiPage.vue'

const routes = [
    {
        path:'/',
        name:'home',
        component:HomePage
    },
    {
        path:'/about',
        name:'about',
        component:AboutPage
    },
    {
        path:'/lokasi',
        name:'lokasi',
        component:LokasiPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router