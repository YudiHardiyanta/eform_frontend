<style scoped>
.center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>
<template>
    <div class="center">
        <v-card rounded="lg" prepend-icon="$vuetify" subtitle="Masuk ke sistem" width="300" color="indigo-darken-3"
            label="indigo-darken-3" value="indigo-darken-3">
            <template v-slot:title>
                <span class="font-weight-black">E-Form</span>
            </template>
            <v-card-text class="bg-blue-grey-lighten-5 pt-4">
                <v-form validate-on="submit lazy" @submit.prevent="submit">
                    <v-text-field clearable label="Username atau Email" variant="outlined" v-model="userName"
                        :rules="userNameRules" rounded="lg" autocomplete="username"></v-text-field>
                    <v-text-field clearable label="Password" variant="outlined" v-model="password"
                        :rules="passwordRules" rounded="lg" autocomplete="current-password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1"
                        ></v-text-field>
                    <v-btn :loading="loading" class="mt-2" text="Masuk" type="submit" block rounded="lg"
                        color="indigo-darken-3"></v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup>
//
import { ref } from 'vue'
import axios from 'axios';

const show1 = ref(false)
const loading = ref(false)
const userName = ref('')
const userNameRules = [
    value => {
        if (value) return true
        return 'Username belum terisi'
    },
]
const password = ref('')
const passwordRules = [
    value => {
        if (value) return true
        return 'Password belum terisi'
    },
]
const token = ref('');

async function submit(event) {
    loading.value = true
    setTimeout(async () => {
        const results = await event
        loading.value = false
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username: userName.value,
                password: password.value
            });
            console.log(token.value)
            token.value = response.data.token;
            localStorage.setItem('jwt', token.value);  // Menyimpan token di localStorage
            alert('Login successful');
        } catch (error) {
            console.error('Login failed:', error.response.data);
        }
        //alert(JSON.stringify(results, null, 2))
    }, 1000);


}

let timeout = -1


</script>
