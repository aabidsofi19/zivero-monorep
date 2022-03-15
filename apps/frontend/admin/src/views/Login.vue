<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useLogin } from '../composables/useUser'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'
import { useRoute, useRouter } from 'vue-router'

const { loginWithEmail, error, loading, login_message, login_success } = useLogin()
const router = useRouter()
const route = useRoute()

const redirect = computed(() => route.query.redirect ?? '/')

const input = ref({
  email: '',
  password: '',
})

const login = () => {
  loginWithEmail(input.value)
}

watchEffect(() => {
  if (login_success.value) {
    router.push(redirect.value)
  }
})
</script>
<template>
  <div class="w-screen h-screen flex">
    <div class="z-20 md:z-0 w-full md:w-1/2 h-full py-4 px-10 flex flex-col backdrop-blur-md md:backdrop-filter-none">
      <div class="text-3xl font-montserrat font-medium text-forest">Zivero</div>
      <div class="text-4xl font-medium font-montserrat text-gray-700 py-24">Login to Zivero Admin</div>

      <form @submit.prevent="login" class="flex flex-col w-full md:w-3/4 gap-4">
        {{ error }}
        {{ login_message }}
        <base-input v-model="input.email" placeholder="Enter Your Email" type="email" required class="p-3"></base-input>

        <base-input v-model="input.password" placeholder="password" type="password" required class="p-3"></base-input>

        <base-button type="submit" :loading="loading">LOGIN</base-button>
      </form>
    </div>
    <div
      class="absolute backdrop-blur-md backdrop-brightness-150 md:backdrop-filter-none md:relative md:w-1/2 bg-mint h-full"
    >
      <img
        src="https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        alt=""
        class="h-full object-cover"
      />
    </div>
  </div>
</template>
