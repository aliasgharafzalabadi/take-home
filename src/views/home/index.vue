<template>
    <div>
        <div class="create mt-2 px-3 row gap-2">
            <div class="col-sm-3">
                <label class="mb-1 mx-1"> نام کالا: </label>
                <input v-model="form.product_name" style="width:80px;" type="text"></input>
            </div>
            <div class="col-sm-2">
                <label class="mb-1 mx-1"> تعداد: </label>
                <input v-model="form.quantity" type="number"></input>
            </div>
            <div class="col-sm-3">
                <label class="mb-1 mx-1"> قیمت پایه: </label>
                <input v-model="form.price_per_unit" type="number"></input>
            </div>
            <div class="col-sm-3 mt-4">
                <button @click="createOrder"> ایجاد </button>
            </div>
        </div>
        <div v-if="show" class="update mt-2 px-3 row gap-2">
            <div class="col-sm-3">
                <label class="mb-1 mx-1"> نام کالا: </label>
                <input v-model="updateForm.product_name" style="width:80px;" type="text"></input>
            </div>
            <div class="col-sm-2">
                <label class="mb-1 mx-1"> تعداد: </label>
                <input v-model="updateForm.quantity" type="number"></input>
            </div>
            <div class="col-sm-3">
                <label class="mb-1 mx-1"> قیمت پایه: </label>
                <input v-model="updateForm.price_per_unit" type="number"></input>
            </div>
            <div class="col-sm-3 mt-4 gap-2 d-flex">
                <button @click="updateOrders"> ویرایش </button>  <button style="background-color: chocolate;" @click="close"> بستن </button>
            </div>
        </div>
        <div class="row mt-5">
            <template v-for="(order, index) in orders">
                <div class="card mt-5 col-sm-4 d-flex">
                    <div class="row">
                        <div class="col-sm-3"> نام : {{ order.productName }} </div>
                        <div class="col-sm-3"> تعداد : {{ order.quantity }} </div>
                        <div class="col-sm-4"> قیمت پایه: {{ order.pricePerUnit }} </div>
                        <div class="col-sm-2 d-flex gap-2">
                            <div @click="handelUpdate(order)"><i class="bi bi-pencil-square text-success"></i> </div>
                            <div><i @click="deleteOrder(order)" class="bi bi-trash text-danger"></i> </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useHttp from "@/composables/useHttp"

const httpService = useHttp();
const createForm = ref()
const orders = ref()
const show = ref(false)
const updateForm = ref({
    id: '',
    product_name: '',
    quantity: '',
    price_per_unit: ''
})
const form = ref({
    product_name: '',
    quantity: '',
    price_per_unit: ''
})


onMounted(() => {
    getOrders();
})

const deleteOrder = async (order) => {
    try {
        await httpService().delete(`orders/${order.id}`);
        getOrders()
    }
    catch {

    }
}

const restForm = () => {
    form.value.product_name = ''
    form.value.quantity = ''
    form.value.price_per_unit = ''
}

const restUpdateForm = () => {
    updateForm.value.product_name = ''
    updateForm.value.quantity = ''
    updateForm.value.price_per_unit = ''
}
const createOrder = async () => {
    try {
        await httpService().post("orders", form.value);
        restForm()
        getOrders()
    }
    catch {

    }
}

const handelUpdate = (order) => {
    updateForm.value.product_name = order.productName,
        updateForm.value.quantity = order.quantity,
        updateForm.value.price_per_unit = order.pricePerUnit,
        updateForm.value.id = order.id

    show.value = true
}

const updateOrders = async () => {
    console.log(updateForm )
    await httpService().patch(`orders/${updateForm.value.id}`, updateForm.value);
    close()
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

const close = ()=>{
    show.value = false
    restUpdateForm()
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

.create {
    background-color: #bd4951;
    border-radius: 25px;
    width: 500px;
    height: 100px;
    margin: auto;
    justify-content: center;
}

.update {
    background-color: #b4cd35;
    border-radius: 25px;
    width: 500px;
    height: 100px;
    margin: auto;
    justify-content: center;
}

input {
    width: 60px;
    border-radius: 20px;
    border: none;
}

input:focus {
    border: none;
    outline: none;
}

button {
    width: 70px;
    height: 40px;
    margin-top: 7px;
    border: none;
    background-color: #9d0404;
    border-radius: 20px;
    text-align: center;
    align-items: center;
}

button:hover {
    color: white;
    background-color: #011a33 !important;
}

.close {
    margin-top: 0;
}
</style>