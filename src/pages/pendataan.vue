<style scoped></style>
<template>
    <AppMenuBar />
    <v-container>
        <v-sheet border rounded>
            <v-container>
                <v-chip-group selected-class="text-primary" mandatory column>
                    <v-chip :text="'Semua ('+agg.total+')'" @click="refresh_data('all')"></v-chip>
                    <v-chip :text="'Draf ('+agg.draft+')'" @click="refresh_data('draft')"></v-chip>
                    <v-chip :text="'Submit ('+agg.submit+')'" @click="refresh_data('submit')"></v-chip>
                    <v-chip :text="'Reject ('+agg.reject+')'" @click="refresh_data('reject')"></v-chip>
                    <v-chip :text="'Approve ('+agg.approve+')'" @click="refresh_data('approve')"></v-chip>
                </v-chip-group>
            </v-container>
            <v-data-table :headers="headers" :hide-default-footer="items.length < 11" :items="items"
                v-model:search="search" multi-sort>
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>
                            <v-icon color="medium-emphasis" icon="mdi-file" size="x-small" start></v-icon>
                            Data
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" density="compact" label="Cari" prepend-inner-icon="mdi-magnify"
                            variant="solo-filled" flat hide-details single-line></v-text-field>

                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                    <div class="d-flex ga-2 justify-end">
                        <v-btn
                            v-if="(item.status == 'approve' && role == 'pengawas') || (item.status == 'reject' && role == 'pencacah') || (item.status == 'submit' && role == 'pengawas') || (item.status == 'draft' && role == 'pencacah')"
                            icon="mdi-pencil" size="x-small" :to="'/data?id=' + item.id + '&mode=edit'"></v-btn>
                        <v-btn icon="mdi-eye" size="x-small" :to="'/data?id=' + item.id + '&mode=view'"
                            :color="item.status == 'approve' ? 'teal-lighten-3' : item.status == 'reject' ? 'pink-lighten-3' : item.status == 'submit' ? 'blue-lighten-3' : ''"></v-btn>
                    </div>
                </template>

                <template v-slot:no-data>
                    <v-btn prepend-icon="mdi-backup-restore" rounded="lg" text="Reset data" variant="text" border
                        @click="reset"></v-btn>
                </template>
            </v-data-table>
        </v-sheet>

    </v-container>
</template>

<script setup>
//


import { onMounted, ref, shallowRef, computed } from 'vue'
import { useRoute } from 'vue-router';
import { useDate } from 'vuetify'
const search = ref('')
const adapter = useDate()

import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user'))


const route = useRoute(); // Mengakses objek route saat ini
const id = route.query.id
const role = ref('')
const items = ref([])
const agg = ref(
    { 'total': 0 ,
     'draft': 0 ,
     'submit': 0 ,
     'reject': 0 ,
     'approve': 0 })

const isEditing = shallowRef(false)

const headers = [
    { title: 'Nama Desa', key: 'MDesa.nama', align: 'start' },
    { title: 'Kecamatan', key: 'MKec.nama', align: 'start' },
    { title: 'Aksi', key: 'actions', align: 'end', sortable: false },
]

const params = ref({
    id: id
})

const refresh_data = async (status) => {
    params.value.status = status
    try {
        await axios.get(`${apiUrl}/sampel`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: params.value
        }).then(response => {
            items.value = response.data.data
            role.value = response.data.role
        })
    } catch (error) {
        console.log(error)
    }
}

const agg_data = async () => {
    try {
        await axios.get(`${apiUrl}/sampel/agg`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: params.value
        }).then(response => {
            let totAgg = 0;
            response.data.data.forEach(element => {
                if(element.status=='draft'){
                    agg.value.draft = element._count._all 
                }
                if(element.status=='submit'){
                    agg.value.submit=element._count._all 
                }
                if(element.status=='reject'){
                    agg.value.reject=element._count._all 
                }
                if(element.status=='approve'){
                    agg.value.approve=element._count._all 
                }
                totAgg = totAgg+element._count._all
                
            });
            agg.value.total=totAgg
            console.log(agg.value)
        })
    } catch (error) {
        console.log(error)
    }
}

onMounted(async () => {
    refresh_data('all')
    agg_data()
})

async function reset() {
    refresh_data('all')
}

</script>