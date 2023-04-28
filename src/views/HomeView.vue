<template>
   <b><h1 class="text-center">Semi-Final DC-04</h1></b>
   <div class="body">
        <div class="container">
            <div class="cards d-flex text-center">
            <div class="card m-5 bg-info text-white shadow-lg">
                <div class="card-body p-5">
                    <h1>{{ users.length }}</h1>
                    <h6>All Users</h6>
                </div>
            </div>
            <div class="card m-5 bg-info text-white shadow-lg">
                <div class="card-body p-5">
                    <h1 style="color:red">{{ femaleUsers }}</h1>
                    <h6>Female Users</h6>
                </div>
            </div>
            <div class="card m-5 bg-info text-white shadow-lg">
                <div class="card-body p-5">
                    <h1 style="color:blue">{{ maleUsers }}</h1>
                    <h6>Male Users</h6>
                </div>
            </div>
        </div>
            <h3>List Of All Users</h3>
       
                <table class="table border-secondary shadow">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Contact Number</th>
                            <th>Email Address</th>
                            <th>Delete</th>
                    

                        </tr>
                    </thead>
                  
                    <tbody v-for="user in users" :key="user.users">
                      
                        <tr class="td" :style="{ color: user.gender === 'Female' ? 'red' : 'blue' }">
                       
                                <td >{{ user.name }}</td>
                                <td >{{ user.address }}</td>
                                <td >{{ user.contactNumber }}</td>
                                <td >{{ user.email }}</td>
                                <td><button @click="removeUser(user.id)" class="btn btn-danger m-2">&cross;</button></td>
                          
                    
                            </tr>
                      
                    </tbody>
               
                </table>
        
        </div>
    
    </div>
</template>
<script setup>
   import { ref, onMounted } from 'vue'
   import {db} from '../firebase/index.js'
   import {addDoc, collection, onSnapshot,deleteDoc, doc, updateDoc, getDoc, query, orderBy} from "firebase/firestore";
   import { auth } from '../firebase/index.js'
   import { createUserWithEmailAndPassword } from 'firebase/auth'
   import { RouterLink } from 'vue-router'
   import router from '../router'

   const users = ref([])
   const id = ref(1)
   const u = (collection(db, "midterm"));

   const femaleUsers = ref(0)
   const maleUsers = ref(0)

   onMounted(async()=>{
      onSnapshot(u,(snapshot)=>{
         const Tmp = []
         let femaleCount = 0
         let maleCount = 0

         snapshot.forEach((doc)=>{
            const midterm = {
               id:doc.id,
               name:doc.data().name,
               address:doc.data().address,
               gender:doc.data().gender,
               contactNumber:doc.data().contactNumber,
               email:doc.data().email,
               completed:doc.data().completed
            }
            Tmp.push(midterm)

            if(midterm.gender == 'Female'){
               femaleCount++
            }
            if(midterm.gender == 'Male'){
               maleCount++
            }
         });
         users.value = Tmp
         femaleUsers.value = femaleCount
         maleUsers.value = maleCount
      })
   })
        const removeUser = id =>{
            deleteDoc(doc(db, "midterm", id))
   }
   
</script>
<style>
.td{
    transition: 0.5s;
}
.td:hover{
    background-color: rgba(93, 93, 93, 0.141);
    border-radius: 10px;
  
}
</style>
