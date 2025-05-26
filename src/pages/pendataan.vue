<style scoped>
    
</style>
<template>
    <AppMenuBar />
    <v-container>
        <v-sheet border rounded>
            <v-data-table :headers="headers" :hide-default-footer="items.length < 11" :items="items"
                v-model:search="search" multi-sort >
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
                        <v-btn icon="mdi-pencil" size="x-small" :to="'/data?id=' + item.id + '&mode=edit'"></v-btn>
                        <v-btn icon="mdi-eye" size="x-small" :to="'/data?id=' + item.id + '&mode=view'" color=""></v-btn>
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
import { useDate } from 'vuetify'
const search = ref('')
const adapter = useDate()


const items = ref([])

const isEditing = shallowRef(false)

const headers = [
    { title: 'Nama Desa', key: 'name', align: 'start' },
    { title: 'Kecamatan', key: 'name_up', align: 'start' },
    { title: 'Actions', key: 'actions', align: 'end', sortable: false },
]

onMounted(() => {
    reset()
})

function reset() {
    items.value = [
        {
            'id': '1',
            'name': 'Kelurahan Ubung Kaja (001)',
            'name_up': 'Denpasar Utara (031)',
            'status' : '1',
        },
        {
            'id': '2',
            'name': 'Kelurahan Ubung Kaja (001)',
            'name_up': 'Denpasar Utara (031)',
            'status' : '1',
        },
        {
            'id': '3',
            'name': 'Kelurahan Ubung Kaja (001)',
            'name_up': 'Denpasar Utara (031)',
            'status' : '1',
        },
        {
            'id': '4',
            'name': 'Kelurahan Ubung Kaja (001)',
            'name_up': 'Denpasar Utara (031)',
            'status' : '2',
        },
        {
            'id': '5',
            'name': 'Kelurahan Ubung Kaja (001)',
            'name_up': 'Denpasar Utara (031)',
            'status' : '2',
        },
        {
            'id': '6',
            'name': 'Kelurahan Ubung Kaja (001)',
            'name_up': 'Denpasar Utara (031)',
            'status' : '2',
        },
        {
            'id': '7',
            'name': 'Kelurahan Ubung Kaja (001)',
            'name_up': 'Denpasar Utara (031)',
            'status' : '2',
        },
        {
            'id': '8',
            'name': 'Kelurahan Ubung Kaja (001)',
            'name_up': 'Denpasar Utara (031)',
            'status' : '3',
        },
        {
            'id': '9',
            'name': 'Kelurahan Ubung Kaja (001)',
            'name_up': 'Denpasar Utara (031)',
            'status' : '3',
        },
        {
            'id': '10',
            'name': 'Kelurahan Ubung Kaja (001)',
            'name_up': 'Denpasar Utara (031)',
            'status' : '3',
        },
        {
            'id': '11',
            'name': 'Kelurahan Ubung Kaja (001)',
            'name_up': 'Denpasar Utara (031)',
            'status' : '4',
        },
        {
            'id': '12',
            'name': 'Kelurahan Ubung Kaja (001)',
            'name_up': 'Denpasar Utara (031)',
            'status' : '4',
        },
    ]
}

</script>