<template>
    <div class="row">
        <div class="login col-md-4">
            <div class="row p-5" style="margin: auto;">
                <div>
                    <h1 class="mb-5"> خوش امدید </h1>
                </div>
                <div class="col-sm-6 mb-3" style="margin: auto;">
                    <label class="mb-1"> ایمیل: </label>
                    <input class="input" v-model="form.email" label="ایمیل" placeholder="email" type="email" name="emial" rule="required" />
                </div>
                <div class="w-100"></div>

                <div class="col-sm-6-w100"></div>
                <div class="col-sm-6 mb-3" style="margin: auto;">
                    <label class="mb-1"> رمز عبور:</label>
                    <input class="input" v-model="form.password" label="رمز عبور" placeholder="password" type="password" name="password" rule="required"  />
                </div>
                <div class="col-sm-6-w100 mb-3"></div>
                <div class="col-sm-6" style="margin: auto;">
                    <button class="btn" @click="handelLogin"> ورود <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status"
                            aria-hidden="true"></span></button>
                </div>
                <div class="col-sm-6-w100 mb-2"></div>
                <div class="col-sm-6" style="margin: auto;">
                    <button @click="moveToSingup" class="btn" style="background-color: aqua;">
                        ثبت نام
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import useHttp from '@/composables/useHttp'
import store from '@/store'
import { ref } from 'vue'
import { useRouter } from "vue-router";

const router = useRouter();
const httpService = useHttp();

const isLoading = ref(false)
const form = ref({
    email : '',
    password : '',
})

const moveToSingup = () => {
    router.push("/singup")
}

const handelLogin = async() =>{
    try{
        isLoading.value = true;
        const response = await httpService().post("/login", form.value);
        store.dispatch("User", response);

        router.push("/home")

    }
    catch {

    }

    isLoading.value = false
}
</script>

<style scoped lang="scss">
@import "./login.scss";
</style>