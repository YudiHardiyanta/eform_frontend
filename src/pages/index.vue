<template>
  <div>
    <AppMenuBar />
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="6">
          <v-card v-for="item in kegiatan" :key="item.id" append-icon="mdi-open-in-new" :href="'/pendataan?id=' + item.kegiatan_id"
            prepend-icon="mdi-note-edit" rel="noopener" :subtitle="item.role + ' - 1 Juni - 30 Juni 2025'"
            :title="item.Kegiatan.nama" style="width: 100%;" color="indigo-darken-3"></v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user'))

const kegiatan = ref([])

onMounted(async () => {
  try {
    console.log(apiUrl)
    await axios.get(`${apiUrl}/kegiatan`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).then(response => {
      kegiatan.value = response.data.data
    })
  } catch (err) {
    console.log(err.res)
  }
})


</script>
