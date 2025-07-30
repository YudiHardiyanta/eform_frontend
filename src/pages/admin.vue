<template>
    <AppMenuBar />
    <v-card>
        <v-tabs v-model="tab" bg-color="primary">
            <v-tab value="m_user">User</v-tab>
            <v-tab value="m_wil">Wilayah</v-tab>
            <v-tab value="m_usaha">Perusahaan</v-tab>
            <v-tab value="m_kues">Kuesioner</v-tab>
        </v-tabs>
        <v-card-text>
            <v-tabs-window v-model="tab">
                <v-tabs-window-item value="m_user">
                    <v-data-table :headers="headers_user" :hide-default-footer="items_users.length < 11"
                        :items="items_users" v-model:search="search" multi-sort>
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-toolbar-title>
                                    <v-icon color="medium-emphasis" icon="mdi-account-multiple" size="x-small"
                                        start></v-icon>
                                    User
                                </v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-text-field v-model="search" density="compact" label="Cari"
                                    prepend-inner-icon="mdi-magnify" variant="solo-filled" flat hide-details
                                    single-line></v-text-field>
                            </v-toolbar>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <div class="d-flex ga-2 justify-end">
                                <v-btn icon="mdi-pencil" size="x-small" @click="edit_user_dialog(item.email)"></v-btn>
                                <v-btn icon="mdi-key" size="x-small" @click="reset_pass_dialog(item.email)"
                                    color="orange-darken-3"></v-btn>
                            </div>
                        </template>
                        <!--
                        <template v-slot:no-data>
                            <v-btn prepend-icon="mdi-backup-restore" rounded="lg" text="Reset data" variant="text"
                                border @click="reset"></v-btn>
                        </template>
                        -->
                    </v-data-table>
                    <v-dialog v-model="user_dialog" width="auto">
                        <v-card prepend-icon="mdi-update" :title="dialog_title" min-width="400">
                            <v-card-text>

                                <v-text-field v-model="nama_user" label="Nama" type="text" clearable
                                    append-inner-icon="mdi-information-outline" variant="underlined"></v-text-field>

                                <v-text-field :disabled="true" v-model="email_user" label="Email" type="text" clearable
                                    append-inner-icon="mdi-information-outline" variant="underlined"></v-text-field>

                                <v-select v-model="role_user" label="Role Utama" :items=role_user_items
                                    item-title="nama" item-value="role" variant="underlined"></v-select>

                                <v-data-table :headers="headers_role" :hide-default-footer="items_roles.length < 11"
                                    :items="items_roles" v-model:search="search" multi-sort>
                                    <template v-slot:top>
                                        <v-toolbar flat>
                                            <v-toolbar-title>
                                                <v-icon color="medium-emphasis" icon="mdi-account-multiple"
                                                    size="x-small" start></v-icon>
                                                Role Kegiatan
                                            </v-toolbar-title>
                                        </v-toolbar>
                                    </template>
                                    <template v-slot:item.actions="{ item }">
                                        <div class="d-flex ga-2 justify-end">
                                            <v-select v-model="item.role" :items=role_user_items item-title="nama"
                                                item-value="role" variant="underlined"></v-select>
                                        </div>
                                    </template>
                                </v-data-table>

                            </v-card-text>
                            <template v-slot:actions class="justify-end">
                                <v-btn color="red" text="Batal" @click="user_dialog = false"></v-btn>
                                <v-btn text="Ok" color="green" @click="edit_user()"></v-btn>
                            </template>
                        </v-card>
                    </v-dialog>

                    <v-dialog v-model="user_reset_dialog" width="auto">
                        <v-card prepend-icon="mdi-key" :title="dialog_title" min-width="400">
                            <v-card-text>
                                <v-text-field v-model="password_user" label="Password Reset" type="text" clearable
                                    append-inner-icon="mdi-information-outline" variant="underlined"></v-text-field>
                            </v-card-text>
                            <template v-slot:actions class="justify-end">
                                <v-btn color="red" text="Batal" @click="user_reset_dialog = false"></v-btn>
                                <v-btn text="Ok" @click="reset_pass()"></v-btn>
                            </template>
                        </v-card>
                    </v-dialog>
                </v-tabs-window-item>
                <v-tabs-window-item value="m_wil">
                    One
                </v-tabs-window-item>

                <v-tabs-window-item value="m_usaha">
                    Two
                </v-tabs-window-item>
                <v-tabs-window-item value="m_kues">
                    Three
                </v-tabs-window-item>
            </v-tabs-window>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
import axios from 'axios';
import Swal from 'sweetalert2'

const apiUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem('token')
const tab = ref()
const items_users = ref([])
const headers_user = ref([
    { "title": "Nama", "key": "nama", "align": 'start' },
    { "title": "Email", "key": "email", "align": 'start' },
    { "title": "Role Utama", "key": "role", "align": 'start' },
    { "title": "Aksi", "key": "actions", "value": "Aksi" }
])
const search = ref()
const user_dialog = ref(false)
const params = ref({})
const dialog_title = ref('Edit User')
const email_user = ref()
const nama_user = ref()
const password_user = ref()
const role_user = ref()
const role_user_items = ref([
    { 'nama': 'Admin', 'role': 'admin' },
    { 'nama': 'Pencacah', 'role': 'pencacah' },
    { 'nama': 'Pengawas', 'role': 'pengawas' },
    { 'nama': 'User', 'role': 'user' },

])

const headers_role = ref([
    { "title": "Kegiatan", "key": "Kegiatan.nama", "align": 'start' },
    { "title": "Role", "key": "actions", "value": "Aksi" }
])

const items_roles = ref([])

const user_reset_dialog = ref(false)

const edit_user_dialog = async (email) => {

    try {
        dialog_title.value = 'Edit User'
        user_dialog.value = true
        params.value.username = email
        await axios.get(`${apiUrl}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: params.value
        }).then(response => {
            if (response.status === 200) {
                email_user.value = response.data.data.email
                nama_user.value = response.data.data.nama
                role_user.value = response.data.data.role
                items_roles.value = response.data.data.userRoles
            } else {

            }
        })
    } catch (error) {

    }
}

const edit_user = async () => {
    try {
        params.value = {}
        params.value.email_user = email_user.value
        params.value.nama_user = nama_user.value
        params.value.role_user = role_user.value
        params.value.item_roles = items_roles.value
        await axios.put(`${apiUrl}/user`, params.value, {
            headers: {
                Authorization: `Bearer ${token}`,
            },

        }).then(response => {
            user_dialog.value = false
            reset_user_tabel()
            Swal.fire({
                title: "Good job!",
                text: response.data.message,
                icon: "success"
            }).then((result) => {

            });

        })
    } catch (error) {
        Swal.fire({
            title: "Oops!",
            text: error,
            icon: "error"
        })
    }
}

const reset_pass_dialog = (email) => {
    user_reset_dialog.value = true
    email_user.value = email
}

const reset_pass = async () => {
    try {
        params.value = {}
        params.value.email = email_user.value
        params.value.reset_pass = password_user.value
        await axios.post(`${apiUrl}/user/reset_admin`,params.value, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(response => {
            user_reset_dialog.value = false
            params.value.reset_pass = ''
            Swal.fire({
                title: "Good job!",
                text: response.data.message,
                icon: "success"
            }).then((result) => {

            });
        })
    } catch (error) {
        Swal.fire({
            title: "Oops!",
            text: error,
            icon: "error"
        })
    }
}

const reset_user_tabel = async () => {
    try {
        //get daftar user
        await axios.get(`${apiUrl}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(response => {
            reset_user_tabel()
            if (response.status === 200) {
                items_users.value = response.data.data
            } else {

            }
        })
    } catch (error) {
        Swal.fire({
            title: "Oops!",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "OK"
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                router.push('/')
            }
        });
    }
}

onMounted(async()=>{
    reset_user_tabel()
})
</script>