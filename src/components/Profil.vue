<style scoped>
.main {
    display: flex;
    justify-content: center;
    height: 100vh;
}
</style>
<template>
    <div class="main">
        <v-container>
            <v-row justify="center">
                <v-avatar icon="mdi-account" size="100"></v-avatar>
            </v-row>
            <v-row justify="center">
                <v-col cols="12" sm="6">
                    <v-text-field label="Nama" :model-value=nama variant="solo" readonly></v-text-field>
                    <v-text-field label="Posisi" :model-value=posisi variant="solo" readonly></v-text-field>
                    <v-btn class="mt-2" text="Keluar" type="submit" block rounded="lg" color="red-darken-3"></v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup>
//
import { ref } from 'vue'
const nama = ref('Nama Petugas')
const posisi = ref('Pencacah')

</script>
