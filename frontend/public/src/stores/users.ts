import { ref } from "vue";
import { defineStore } from "pinia";
import type { users } from '@/types/users';

export const useUsersStore = defineStore("usersList", () => {
    const usersList = ref([])
    const userWeatherInfo = ref(<users[]>[]);
    const loadingUsers = ref(<boolean>false);
    const loadingWeather = ref(<boolean>false);
    const dialogDetails = ref(<boolean>false);

    async function getUserWeather(userid: number, latitude: string, longitude: string) {
        try {
            loadingWeather.value = true
            let res = await fetch(`http://localhost/user-weather/${userid}/${latitude}/${longitude}`)
            let weather = await res.json()
            userWeatherInfo.value = weather
            loadingWeather.value = false
        } catch (error) {
            loadingWeather.value = false
        }
    }

    async function getUsers() {
        try {
            loadingUsers.value = true
            let res = await fetch('http://localhost/')
            let { users } = await res.json()
            usersList.value = users
            loadingUsers.value = false
        } catch (error) {
            loadingUsers.value = false
        }
    }

    return { usersList, userWeatherInfo, loadingWeather, loadingUsers, dialogDetails, getUsers, getUserWeather };
});
