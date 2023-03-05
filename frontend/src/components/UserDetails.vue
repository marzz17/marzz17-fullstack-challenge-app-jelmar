<script lang="ts">
import { storeToRefs } from 'pinia'
// import type { users } from '@/types/users';
import { useUsersStore } from "@/stores/users"

export default {
    props: {
        user: {
            type: Object,
            required: true
        },
        loading: {
            type: Boolean,
            required: true
        }
    },
    setup(props) {
        // We can use destrucring here using toRefs to maintain reactivity of the props!!
        const user = props.user
        const loading = props.loading

        const store = useUsersStore()
        const { loadingWeather, dialogDetails } = storeToRefs(store)
        const { getUserWeather } = store

        async function getUserWeatherDetails(userid: number, latitude: string, longitude: string) {
            await getUserWeather(userid, latitude, longitude)
            dialogDetails.value = true
        }

        return { user, getUserWeatherDetails, loadingWeather }
    }
}
</script>
<template>
    <div class="flex-shrink-0">
        <img class="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="" />
    </div>
    <div class="min-w-0 flex-1">
        <a href="#" class="focus:outline-none">
            <span class="absolute inset-0" aria-hidden="true" />
            <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
            <p class="truncate text-sm text-gray-500">{{ user.email }}</p>
        </a>
    </div>
    <Button label="View weather" class="p-button-outlined p-button-raised p-button-rounded p-button-sm"
        @click.prevent="getUserWeatherDetails(user.id, user.latitude, user.longitude)" :loading="loading"
        :disabled="loadingWeather" />
</template>