import { createRouter, createWebHistory } from 'vue-router';

import Login from "../views/auth/Login.vue";
import ForgotPassword from '../views/auth/ForgotPassword.vue';
import Home from '../views/Home.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        //auth
        {
            path: "/",
            name: "login",
            component: Login,
            meta: {
                title: "Welcome",
            },
        },
        {
            path: "/forgot",
            name: "forgot",
            component: ForgotPassword,
            meta: {
                title: "Forgot Password",
            },
        },
        //home
        {
            path: "/home",
            name: "home",
            component: Home,
            meta: {
                title: "Home",
            },
        },
    ]
})

router.beforeEach((to, from, next) => {
    document.title = `AL Company || ${to.meta.title}`;
    next();
});

export default router;