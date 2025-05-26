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
                    <v-list-item v-for="(item, index) in items" :key="index" :value="index">
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-btn class="mt-2" text="Keluar" type="submit" block rounded="lg" color="red-darken-3"></v-btn>
                    </v-list-item>
                </v-list>
            </v-menu>
        </template>
    </v-app-bar>
</template>

<script setup>
//
import { ref } from 'vue'
const tab = ref(null)

//untuk menu
const items = [
    { title: 'I Komang Yudi Hardiyanta' },
    { title: 'Pencacah' },
]

import { useRouter } from 'vue-router';

const router = useRouter();

// Fungsi untuk navigasi kembali ke halaman sebelumnya
const goBack = () => {
  router.back(); // Menggunakan Vue Router untuk kembali ke halaman sebelumnya
};
</script>
