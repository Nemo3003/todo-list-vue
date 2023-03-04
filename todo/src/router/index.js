import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", component: () => import("../views/home.vue")},
        {path: "/todo", component: () => import("../views/todoAdd.vue"),
        meta:{
            requiresAuth : true,
        },
    },
        {path: "/register", component: () => import("../auth/register.vue")},
        {path: "/login", component: () => import("../auth/login.vue")},
        {path: "/about", component: () => import("../views/about.vue")},
    ],
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user)=>{
                removeListener();
                resolve(user);
            },
            reject
        );
    })
}

router.beforeEach(async(to,from,next)=>{
    if(to.matched.some((record)=> record.meta.requiresAuth)){
        if(await getCurrentUser()){
            next();
        }else{
            alert("You do not have access to this site, sign up in order to get access");
            next("/register")
        }
    }
    else{next();}
})

export default router;