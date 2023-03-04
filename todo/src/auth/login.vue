<template>
   <!-- Email input -->
   <div class="container p-4 col-xl-4">
      <div class="row justify-content-center">
 
      <h1>Log into account</h1>
         
      <div class="form-outline mb-4">
         <p><input type="text" placeholder="Email" v-model="email" class="form-control"></p>
      </div>
      <div class="form-outline mb-4">
         <p><input type="text" placeholder="Password" v-model="password" class="form-control"></p>
      </div>
      <p v-if="errMsg">{{ errMsg }}</p>
      <p><button @click="register" class="btn btn-secondary">Submit</button></p>
      <button @click="signInWithGoogle" type="button" class="btn btn-primary btn-floating mx-1">
         Sign in with Google
      </button>
   </div>
   
</div>
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

