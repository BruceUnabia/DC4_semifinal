<script setup>
import { onAuthStateChanged, signOut } from '@firebase/auth';
import { onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { auth } from './firebase/index.js'
import router from './router';

const isSignedIn = ref(false)
onMounted(() =>{
  onAuthStateChanged(auth, function (user){
    if(user){
      isSignedIn.value = true
    }else{
      router.push('/register')
    }
  })
})
const logout = () =>{
  signOut(auth).then(() =>{
    isSignedIn.value = false
   })
}
</script>

<template>
 <nav class="navbar navbar-expand-lg bg-info" style="font-weight: bold;">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Authentication and Log-In</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div style="margin-left:950px" class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-1 mb-lg-0" v-show="!isSignedIn">
        <li class="nav-item">
          <router-link to="login" class="nav-link">LogIn</router-link>
        </li>
        <li class="nav-item">
          <router-link to="register" class="nav-link">Register</router-link>
        </li>
        
      </ul>
      <ul class="navbar-nav me-auto mb-1 mb-lg-0" v-show="isSignedIn">
        <li class="nav-item">
          <router-link to="home" class="nav-link">Dashboard</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link" @click="logout">Logout</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>


  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
.nav-item{
  background-color:cornflowerblue;
  padding:10px 20px;
  text-align:center;
  display:inline-block;
  border-radius: 10px;
}
.nav-item:hover{
  background-color: #0056b3;
}
</style>
