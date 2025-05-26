<template>
    <v-app-bar :elevation="2">
        <v-btn icon @click="goBack">
            <v-icon>mdi-arrow-left</v-icon> <!-- Ikon Kembali -->
        </v-btn>
        <v-app-bar-title>E-Form</v-app-bar-title>
        <template v-slot:append>
            <v-btn icon="mdi-bell-outline"></v-btn>

            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" icon="mdi-account">
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item>
                        <v-list-item-title>{{ user.nama }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-for="(role, index) in user.role" :key="index">
                        <v-list-item-title>{{ role }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-btn class="mt-2" text="Keluar" type="button" block rounded="lg" color="red-darken-3"
                            @click="logout()"></v-btn>
                    </v-list-item>
                </v-list>
            </v-menu>
        </template>
    </v-app-bar>
</template>

<script setup>
//
import { ref } from 'vue'
//untuk menu
import { useRouter } from 'vue-router';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const router = useRouter();
const user = JSON.parse(localStorage.getItem('user'))
const token = localStorage.getItem('token')


// Fungsi untuk navigasi kembali ke halaman sebelumnya
const goBack = () => {
    router.back(); // Menggunakan Vue Router untuk kembali ke halaman sebelumnya
};

async function logout(event) {
    try {
        await axios.post(`${apiUrl}/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.data.code == 200) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                router.push('/')
            }
        });

    } catch (error) {

    }
}


</script>
