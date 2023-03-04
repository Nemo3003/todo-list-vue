import { createApp } from "vue";
import App from "./App.vue";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import { VueFire } from "vuefire";
import router from "./router"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCy0yoWkZmVDW1Vy7asIDvsGh5k8gKElIY",
  authDomain: "todoapp-9bad3.firebaseapp.com",
  projectId: "todoapp-9bad3",
  storageBucket: "todoapp-9bad3.appspot.com",
  messagingSenderId: "98611827500",
  appId: "1:98611827500:web:ad67f90b41339257fa1289"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Create a new Vue instance
const app = createApp(App);

// Use the router instance
app.use(router);

// Mount the app on the '#app' element
app.mount('#app');