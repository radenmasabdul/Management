import { createRouter, createWebHistory } from 'vue-router';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import Api from "../utils/index.js"

import Login from "../views/auth/Login.vue";
import ForgotPassword from '../views/auth/ForgotPassword.vue';
import Home from '../views/Home.vue';
import Users from '../views/users/Users.vue';

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
        //menu
        {
            path: "/home",
            name: "home",
            component: Home,
            meta: {
                title: "Home",
            },
        },
        {
            path: "/users",
            name: "users",
            component: Users,
            meta: {
                title: "Users",
            },
        },
    ]
})

router.beforeEach((to, from, next) => {
    document.title = `AL Company || ${to.meta.title}`;

    const token = Cookies.get('token');
    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Skip token check if navigating to login or forgot password
    if (to.name === 'login' || to.name === 'forgot') {
        next();
    } else if (!token) {
        Swal.fire({
            icon: 'warning',
            title: 'Session Expired',
            text: 'Your session has expired. Please log in again.',
            confirmButtonText: 'OK'
        }).then(() => {
            next({ name: 'login' });
        });
    } else {
        next();
    }
});

export default router;