<template>
    <div class="row">
        <div class="login col-md-4" style="height: 620px !important;">
            <div class="row p-5" style="margin: auto;">
                <div>
                    <h1 class="mb-4"> خوش امدید </h1>
                </div>
                <div class="col-sm-6 mb-3" style="margin: auto;">
                    <label class="mb-1"> نام : </label>
                    <input class="input" v-model="form.firs_name" label="نام" placeholder="name" type="text" />
                </div>
                <div class="w-100"></div>
                <div class="col-sm-6 mb-3" style="margin: auto;">
                    <label class="mb-1"> نام خانودگی: </label>
                    <input class="input" v-model="form.last_name" label="نام خانودگی" placeholder="last_name" type="text" />
                </div>
                <div class="w-100"></div>
                <div class="col-sm-6 mb-3" style="margin: auto;">
                    <label class="mb-1"> ایمیل: </label>
                    <input class="input" v-model="form.email" label="ایمیل" placeholder="email" type="email" />
                </div>
                <div class="w-100"></div>
                <div class="w-100"></div>
                <div class="col-sm-6 mb-3" style="margin: auto;">
                    <label class="mb-1"> ادرس:</label>
                    <textarea class="input" v-model="form.address" label="ادرس" placeholder="address" type="text"></textarea>
                </div>
                <div class="w-100"></div>
                <div class="col-sm-6 mb-3" style="margin: auto;">
                    <label class="mb-1"> رمز عبور:</label>
                    <input class="input" v-model="form.password" label="رمز عبور" placeholder="password" type="password" />
                </div>
                <div class="col-sm-6-w100 mb-3"></div>
                <div class="col-sm-6" style="margin: auto;">
                    <button class="btn" @click="handelsingup" style="background-color: aqua;"> ثبت نام
                        <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status"
                            aria-hidden="true"></span> </button>
                </div>
                <div class="col-sm-6-w100 mb-2"></div>
                <div class="col-sm-6" style="margin: auto;">
                    <button class="btn" @click="moveToLogin"> ورود </button>
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
    email: '',
    password: '',
    first_name: ' ',
    last_name: ' ',
    address: ' ',
})

const handelsingup = async () => {
    try {
        isLoading.value = true;
        const response = await httpService().post("/singup", form.value);
        store.dispatch("User", response);
        router.push("/home")

    }
    catch {

    }

    isLoading.value = false
}


const moveToLogin = () => {
    router.push("/login")
}
</script>

<style scoped lang="scss">
@import "../login/login.scss";

textarea {
    width: 300px;
    height: 50px;
    resize: none;
}
</style>