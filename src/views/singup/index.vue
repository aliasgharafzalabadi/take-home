<template>
    <div class="row">
        <div class="login col-md-4" style="height: 620px !important;">
            <div class="row p-5" style="margin: auto;">
                <div>
                    <h1 class="mb-4"> خوش امدید </h1>
                </div>
                <div class="col-sm-6 mb-3" style="margin: auto;">
                    <label class="mb-1"> نام : </label>
                    <input class="input" label="نام" placeholder="name" type="text" />
                </div>
                <div class="w-100"></div>
                <div class="col-sm-6 mb-3" style="margin: auto;">
                    <label class="mb-1"> نام خانودگی: </label>
                    <input class="input" label="نام خانودگی" placeholder="last_name" type="text" />
                </div>
                <div class="w-100"></div>
                <div class="col-sm-6 mb-3" style="margin: auto;">
                    <label class="mb-1"> ایمیل: </label>
                    <input class="input" label="ایمیل" placeholder="email" type="email" />
                </div>
                <div class="w-100"></div>
                <div class="w-100"></div>
                <div class="col-sm-6 mb-3" style="margin: auto;">
                    <label class="mb-1">  ادرس:</label>
                    <textarea class="input" label="ادرس" placeholder="address" type="text"></textarea>
                </div>
                <div class="w-100"></div>
                <div class="col-sm-6 mb-3" style="margin: auto;">
                    <label class="mb-1"> رمز عبور:</label>
                    <input class="input" label="رمز عبور" placeholder="password" type="password" />
                </div>
                <div class="col-sm-6-w100 mb-3"></div>
                <div class="col-sm-6" style="margin: auto;">
                    <button class="btn" style="background-color: aqua;"> ثبت نام </button>
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
import { useRouter } from "vue-router";

const router = useRouter();

const moveToLogin = ()=>{
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