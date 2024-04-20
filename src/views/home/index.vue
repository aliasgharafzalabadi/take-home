<template>
    <div>
        <div class="row mt-5">
            <template v-for="(order, index) in orders">
                <div class="card mt-5 col-sm-4 d-flex">
                    <div class="row">
                        <div class="col-sm-3"> نام : {{ order.productName }} </div>
                        <div class="col-sm-3"> تعداد : {{ order.quantity }} </div>
                        <div class="col-sm-4"> قیمت پایه: {{ order.pricePerUnit }} </div>
                        <div class="col-sm-2 d-flex gap-2">
                             <div @click="updateOrders" ><i  class="bi bi-pencil-square text-success"></i> </div>
                             <div><i @click="deleteOrder" class="bi bi-trash text-danger"></i> </div>  </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
    <form ref="createForm"></form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useHttp from "@/composables/useHttp"
import Form from "../form"

const httpService = useHttp();
const createForm = ref()
const orders = ref()

onMounted(() => {
    getOrders();
})

const deleteOrder = async () => {
    try {
        const response = await httpService().delete("orders");
        getOrders()
    }
    catch {

    }
}

const updateOrders = async() =>{
    createForm.value.init()
     const response = await httpService().patch("orders");
        getOrders()
}

const getOrders = async () => {
    try {
        const response = await httpService().get("orders");
        orders.value = response;
    }
    catch {

    }
}
</script>

<style scoped>
.card {
    background-color: #85dede;
    border-radius: 25px;
    width: 500px;
    height: 100px;
    margin: auto;
    justify-content: center;
}
</style>