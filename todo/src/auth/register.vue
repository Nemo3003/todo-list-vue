<template>
     <div class="container p-4 col-xl-4">
        <h1>Create account</h1>
        <div class="form-outline mb-4">
        <p><input type="text" placeholder="Email" v-model="email" class="form-control"></p>
        </div>
        <div class="form-outline mb-4">
        <p><input type="text" placeholder="Password" v-model="password" class="form-control"></p>
        </div>
        <p><button @click="register" class="btn btn-secondary">Submit</button></p>
        <button @click="signInWithGoogle" type="button" class="btn btn-primary btn-floating mx-1">
         Sign in with Google
      </button>
    </div>
</template>

<script setup>
    import {ref} from 'vue';
    import { 
        getAuth, 
        createUserWithEmailAndPassword,
        GoogleAuthProvider,
        signInWithPopup }
    from '@firebase/auth';
    import { useRouter } from 'vue-router';
    const router = useRouter()


    const email = ref("");
    const password = ref("");
    const register = ()=>{
        createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) =>{
            console.log("Successfully registered!");
            router.push('/todo')
        })
        .catch((error) =>{
            console.log(error.code);
        })
    }
    const signInWithGoogle = ()=>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(getAuth(), provider)
        .then((result) => {
            console.log(result.user);
            router.push("/todo")
        })
        .catch((e)=>{
            console.error(e)
        })
    }
</script>

