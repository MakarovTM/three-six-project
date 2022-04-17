import { createRouter, createWebHistory } from 'vue-router'

const routes = [

    {
        path: "/chats",
        name: "Chats",
        component: () => import("../views/Chats.vue")
    },

    {
        path: "/contacts",
        name: "Contats",
        component: () => import("../views/Contacts.vue")
    },

    {
        path: "/calls",
        name: "Calls",
        component: () => import("../views/Calls.vue")
    },

    {
        path: "/profile/:id",
        name: "Profile",
        component: () => import("../views/Profile.vue")
    },
    
    {
        path: "/signIn",
        name: "SignIn",
        component: () => import("@/pages/SignIn.vue")
    },

    {
        path: "/signUp",
        name: "SignUp",
        component: () => import("@/pages/SignUp.vue")
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


export default router
