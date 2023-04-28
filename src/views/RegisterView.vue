<template>
    <div class="container col-md-6 offset-md-3 mt-5">
        <div class="class-card p-5 shadow">
            <div v-show="error" class="alert alert-danger">
                {{ errorMsg }}
            </div>
            <div class="alert alert-success" v-show="success">
                {{ successMsg }}
            </div>
            <h1 style="text-align:center; background-color:cornflowerblue; border-radius: 10px;">Register</h1>
            <div class="form-group mb-3">
                <label for="name">Name</label>
                <input type="text" class="form-control" v-model="name">
            </div>
            <div class="form-group mb-3">
                <label for="address">Address</label>
                <input type="text" class="form-control" v-model="address">
            </div>
            <div class="form-group mb-3">
                <label for="gender">Gender</label>
                <input type="text" class="form-control" v-model="gender">
            </div>
            <div class="form-group mb-3">
                <label for="contactNumber">Contact Number</label>
                <input type="number" class="form-control" v-model="contactNumber">
            </div>
            <div v-show="error1" class="alert alert-danger">
                {{ errorMsg1 }}
            </div>
            <div class="form-group mb-3">
                <label for="email">Email</label>
                <input type="email" class="form-control" v-model="email">
            </div>
            <div class="form-group mb-3">
                <label for="password">Password</label>
                <input type="password" class="form-control" v-model="password">
        </div>
        <div class="d-flex">
           <button class="btn btn-info" @click="registerUser">Register</button>
        </div>
        <div class="d-flex">
            <div>
                <router-link to="login">Already have an account? Log In here..</router-link>
            </div>
        </div>
        </div>
        
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { auth } from '../firebase/index.js'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import {db} from '../firebase/index.js'
import {addDoc, collection, onSnapshot,deleteDoc, doc, updateDoc, getDoc, query, orderBy} from "firebase/firestore";
import { RouterLink } from 'vue-router'
import router from '../router'

const name = ref('')
const address = ref('')
const gender = ref('')
const contactNumber = ref('')
const email = ref('')
const password = ref('')

const error = ref('')
const error1 = ref('')
const errorMsg = ref('')
const errorMsg1 = ref('')
const success = ref('')
const successMsg = ref('')

const registerUser = async () => {
    if(name.value != '' && address.value != '' && gender.value != '' && email.value != '' && contactNumber.value != null && password != ''){
       await addDoc(collection(db,"midterm"),{
        name:name.value,
        address:address.value,
        gender:gender.value,
        email:email.value,
        contactNumber:contactNumber.value,

        completed:false
       })
       createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((cred) => {
                name.value = ""
                address.value = ""
                gender.value = ""
                contactNumber.value = ""
                email.value = ""
                password.value = ""
                sendEmailVerification(cred.user)
                error.value = false
                success.value = true
                successMsg.value = "Registered Successfully. A verification is sent to your email."
            })
            .catch(()=>{
                error1.value = true
                errorMsg1.value = "Email already in use"
            })
            email.value = ''
            

        }
        else{
            error.value = true
            errorMsg.value = "Please fill out all the fields"
        }

}
</script>
<style>
.card{
    width: 400px;
    length:700px;
}
</style>