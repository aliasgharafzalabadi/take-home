import { createApp } from 'vue'
import router from "./router";
import 'bootstrap/dist/css/bootstrap.css'
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";
import App from './App.vue'


  
  

createApp(App).use(router).use(Toast, {
    rtl: true,
    transition: "Vue-Toastification__bounce",
    maxToasts: 5,
    newestOnTop: true,
    timeout: 2000,
    position: "top-left",
  }).mount('#app')
