<template>
    <nav class="navbar text-center  navbar-light bg-light fixed-top navbar-expand-md">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0 mx-auto navbar-nav">
            <li class="nav-item active">
                <router-link to="/" class="nav-link ">Home</router-link>
            </li>
            <li class=" nav-item">
                <router-link to="/todo" class="nav-link" v-if="isLoggedIn">To-dos</router-link>
            </li>
            <li class=" nav-item">
                <router-link to="/register" v-if="!isLoggedIn" class="nav-link nav-item">Register</router-link>
            </li>
            <li class=" nav-item">
                <router-link to="/login" v-if="!isLoggedIn" class="nav-link nav-item">Login</router-link>
            </li>
            <li class=" nav-item">
                <router-link to="/about" class="nav-link nav-item">About</router-link>
            </li>
            <li class=" nav-item">
                <button v-if="isLoggedIn" @click="handleSignOut" class="btn btn-secondary nav-item"> Sign out </button>
            </li> 
        </ul>
        </div>
    </nav>
    <router-view/>
    <footer class="bg-light text-center text-lg-start fixed-bottom">
    <!-- Copyright -->
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
      © 2023 Copyright
      <p class="text-dark">Ulises Mariano Melgarejo</p>
    </div>
    <!-- Copyright -->
    </footer>
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