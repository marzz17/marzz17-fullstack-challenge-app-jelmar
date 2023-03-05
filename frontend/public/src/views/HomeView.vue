
<script lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import { useUsersStore } from "@/stores/users"
import type { users } from '@/types/users';

import UserDetails from '@/components/UserDetails.vue'

export default {
  components: {
    UserDetails
  },
  setup() {
    const store = useUsersStore()
    const { usersList, userWeatherInfo, loadingWeather, loadingUsers, dialogDetails } = storeToRefs(store)
    const { getUsers, getUserWeather } = store

    async function getUserWeatherDetails(userid: number, latitude: string, longitude: string) {
      await getUserWeather(userid, latitude, longitude)
      dialogDetails.value = true
    }

    onMounted(async () => {
      await getUsers()
    })

    return { usersList, userWeatherInfo, loadingWeather, loadingUsers, dialogDetails, getUserWeatherDetails }
  }
}
</script>   
<template>
  <main>
    <div class="mb-6 font-medium">User List</div>
    <div>
      <ProgressSpinner v-if="loadingWeather" aria-label="Loading weather info" style="width:32px;height:32px" />
    </div>
    <ProgressSpinner v-if="loadingUsers" style="width:32;height:32px" strokeWidth="8" fill="var(--surface-ground)"
      animationDuration=".5s" aria-label="Custom ProgressSpinner" />
    <div v-else>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div v-for="(user, index) in usersList" :key="index"
          class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
          <UserDetails :user="user" :loading="loadingWeather" />
        </div>
      </div>
    </div>
    <Dialog header="User Weather Details" v-model:visible="dialogDetails" :style="{ width: '70vw' }">
      Content
      {{ JSON.stringify(userWeatherInfo) }}
    </Dialog>
  </main>
</template>

      
