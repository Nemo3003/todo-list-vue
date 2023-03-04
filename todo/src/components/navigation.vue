<template>
    <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/todo">To-dos</router-link>
        <router-link to="/register">Register</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/about">About</router-link>
        <button v-if="isLoggedIn" @click="handleSignOut"> Sign out </button>
    </nav>
    <router-view/>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import router from '@/router';

const isLoggedIn = ref(false)

let auth;
onMounted(()=> {
    auth = getAuth();
    onAuthStateChanged(auth, (user)=>{
    if(user){isLoggedIn.value = true;}
    else {isLoggedIn.value = false;}
    });
});

const handleSignOut = () => {
    signOut(auth).then(()=>{
        router.push("/");
    });
}
</script>