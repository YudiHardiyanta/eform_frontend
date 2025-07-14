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
                    <v-list-item>


                        <v-dialog max-width="500">
                            <template v-slot:activator="{ props: activatorProps }">
                                <v-btn v-bind="activatorProps" class="mt-2" text="Reset Password" type="button" block
                                    rounded="lg" color="orange-darken-3"></v-btn>
                            </template>

                            <template v-slot:default="{ isActive }">

                                <v-card title="Reset Password">

                                    <v-row class="pl-3 pr-3">
                                        <v-col cols="12" sm="6">
                                            <v-text-field clearable label="Password Lama" variant="outlined"
                                                v-model="password_lama" rounded="lg" autocomplete="current-password"
                                                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                :type="show1 ? 'text' : 'password'"
                                                @click:append-inner="show1 = !show1"></v-text-field>

                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-text-field clearable label="Password Baru" variant="outlined"
                                                v-model="password_baru" rounded="lg" autocomplete="current-password"
                                                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                :type="show1 ? 'text' : 'password'"
                                                @click:append-inner="show1 = !show1"></v-text-field>

                                        </v-col>
                                    </v-row>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn text="Ganti Password" type="submit" rounded="lg" color="indigo-darken-3"
                                            @click="reset_password();isActive.value = false;"></v-btn>
                                        <v-btn text="Batal" @click="isActive.value = false"></v-btn>
                                    </v-card-actions>

                                </v-card>
                            </template>
                        </v-dialog>
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
import Swal from 'sweetalert2'

const apiUrl = import.meta.env.VITE_API_URL;

const router = useRouter();
const user = JSON.parse(localStorage.getItem('user'))
const token = localStorage.getItem('token')
const password_lama = ref('')
const password_baru = ref('')
const show1 = ref()
const params = ref({})

// Rules reset password
const passwordRules = [
    value => {
        if (value) return true
        return 'Password belum terisi'
    },
]

// Fungsi untuk navigasi kembali ke halaman sebelumnya
const goBack = () => {
    router.back(); // Menggunakan Vue Router untuk kembali ke halaman sebelumnya
};

async function logout(event) {
    try {
        await axios.post(`${apiUrl}/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then(response => {
            if (response.data.code == 200) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                router.push('/login')
            }
        });

    } catch (error) {

    }
}

async function reset_password(event) {
    console.log(password_baru.value)
    console.log(password_lama.value)
    try {
        params.value.password_baru = password_baru.value
        params.value.password_lama = password_lama.value
        console.log(params.value)
        await axios.post(`${apiUrl}/user/reset_password`, params.value, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then(response => {
            console.log(11)
            if (response.data.code == 200) {
                Swal.fire({
                    title: "Good job!",
                    text: response.data.message,
                    icon: "success"
                }).then((result) => {
                    router.back()
                });
            }
            else {

            }
        });

    } catch (error) {
        Swal.fire({
            title: "Oops!",
            text: error.response.data.message,
            icon: "error"
        })
    }
}


</script>
