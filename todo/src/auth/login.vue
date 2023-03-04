<template>
   <h1>Log into account</h1>
   <p><input type="text" placeholder="Email" v-model="email"></p>
   <p><input type="text" placeholder="Password" v-model="password"></p>
   <p v-if="errMsg">{{ errMsg }}</p>
   <p><button @click="register">Submit</button></p>
   <p><button @click="signInWithGoogle">Sign in with Google</button></p>
</template>

<script setup>
   import {ref} from 'vue';
   import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from '@firebase/auth';
   import { useRouter } from 'vue-router';
   
   const router = useRouter()
   const email = ref("");
   const password = ref("");
   const errMsg = ref("")
   const register = ()=>{
       signInWithEmailAndPassword(getAuth(), email.value, password.value)
       .then((data) =>{
           console.log("Successfully registered!");
           router.push('/todo')
       })
       .catch((error) =>{
           console.log(error.code);
           switch(error.code) {
            case "auth/invalid-email":
               errMsg.value = "Invalid email";
               break;
            case "auth/user-not-found":
               errMsg.value = "No account with this email has been found";
               break;
            case "auth/wrong-password":
               errMsg.value = "Incorrect password";
               break;
            default:
               errMsg.value = "Email or password is incorrect";
               break;
           }
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

