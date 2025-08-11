<style scoped>
.center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

}

body {
    background-image: '/success.jpeg';
}
</style>
<template>
    <div class="center">

        <v-container fluid class="fill-height" style="background-image: url('success.jpeg');
           background-size: cover;
           background-position: center;
           
           ">
            <v-card rounded="lg" width="400" color="indigo-darken-3" label="indigo-darken-3" value="indigo-darken-3"
                class="ma-3">
                <template v-slot:title>
                    <span class="font-weight-black">E-Form</span>
                </template>
                <template v-slot:prepend>
                    <v-img :width="60" color="indigo-lighten-4" aspect-ratio="1/1" cover rounded
                        src="/logo.png"></v-img>
                </template>
                <v-card-text class="bg-blue-grey-lighten-4 pt-4">
                    Terima Kasih Telah Mengisi Survei BPS Provinsi Bali.
                    <v-btn :loading="loading" class="mt-2" text="Edit Survei" type="submit" block rounded="lg"
                        color="indigo-darken-3" :href="path + '?id=' + id + '&token=' + token"></v-btn>
                </v-card-text>
                <Footer></Footer>
            </v-card>
        </v-container>

    </div>
</template>

<script setup>
//
import { ref } from 'vue'
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

//untuk API
const apiUrl = import.meta.env.VITE_API_URL;
const show1 = ref(false)
const loading = ref(false)

const route = useRoute(); // Mengakses objek route saat ini
const router = useRouter()
const id = route.query.id
const token = route.query.token
const path = route.query.path



</script>
