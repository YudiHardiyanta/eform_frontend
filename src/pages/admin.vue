<template>
    <AppMenuBar />
    <v-card>
        <v-tabs v-model="tab" bg-color="primary">
            <v-tab value="m_alokasi">Alokasi</v-tab>
            <v-tab value="m_user">User</v-tab>
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

                        <template v-slot:no-data>
                            <v-btn prepend-icon="mdi-backup-restore" rounded="lg" text="Reset data" variant="text"
                                border @click="reset_user_tabel"></v-btn>
                        </template>
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
                <v-tabs-window-item value="m_alokasi">
                    <v-data-table :headers="headers_alokasi" :hide-default-footer="alokasi_items.length < 11"
                        :items="alokasi_items" v-model:search="search" multi-sort>
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-toolbar-title>
                                    <v-icon color="medium-emphasis" icon="mdi-account-multiple" size="x-small"
                                        start></v-icon>
                                    Alokasi Petugas
                                </v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-select v-model="kegiatan" :items=kegiatan_items item-title="Kegiatan.nama"
                                    item-value="Kegiatan.id" variant="underlined" label="Pilih Kegiatan">
                                </v-select>
                                <v-spacer></v-spacer>
                                <v-text-field v-model="search" density="compact" label="Cari"
                                    prepend-inner-icon="mdi-magnify" variant="solo-filled" flat hide-details
                                    single-line></v-text-field>
                            </v-toolbar>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <div class="d-flex ga-2 justify-end">
                                <v-btn icon="mdi-mail" size="x-small" @click="setting_email_dialog(item.id)"></v-btn>
                                <v-btn icon="mdi-pencil" size="x-small" @click="edit_alokasi_dialog(item.id)"></v-btn>
                            </div>
                        </template>

                        <template v-slot:no-data>
                            <v-btn prepend-icon="mdi-backup-restore" rounded="lg" text="Reset data" variant="text"
                                border @click=""></v-btn>
                        </template>
                    </v-data-table>
                    <v-dialog v-model="alokasi_dialog" width="auto">
                        <v-card prepend-icon="mdi-update" :title="dialog_title" min-width="400">
                            <v-card-text>

                                <v-text-field v-model="kode_wilayah" label="Kode Wilayah" type="text" clearable
                                    append-inner-icon="mdi-information-outline" variant="underlined"></v-text-field>

                                <v-text-field v-model="nama_wilayah" label="Nama Wilayah" type="text" clearable
                                    append-inner-icon="mdi-information-outline" variant="underlined"></v-text-field>

                                <v-autocomplete v-model="pencacah" label="Pencacah" :items=pencacah_items
                                    item-title="User.nama" item-value="User.email"
                                    variant="underlined"></v-autocomplete>

                                <v-autocomplete v-model="pengawas" label="Pengawas" :items=pengawas_items
                                    item-title="User.nama" item-value="User.email"
                                    variant="underlined"></v-autocomplete>

                            </v-card-text>
                            <template v-slot:actions class="justify-end">
                                <v-btn color="red" text="Batal" @click="alokasi_dialog = false"></v-btn>
                                <v-btn text="Ok" color="green" @click="edit_alokasi()"></v-btn>

                            </template>
                        </v-card>
                    </v-dialog>

                    <v-dialog v-model="email_dialog" width="auto">
                        <v-card prepend-icon="mdi-mail" :title="dialog_title" min-width="400">
                            <v-card-text>

                                <v-text-field v-model="email" label="Email" type="text" clearable
                                    append-inner-icon="mdi-information-outline" variant="underlined"></v-text-field>
                                <v-checkbox v-model="ganti_token" label="Apakah Token diganti?"></v-checkbox>
                            </v-card-text>
                            <template v-slot:actions class="justify-end">
                                <v-btn color="red" text="Batal" @click="email_dialog = false"></v-btn>
                                <v-btn text="Ok" color="green" @click="kirim_email()"></v-btn>

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
import { ref, onMounted, watch } from 'vue'
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


const kegiatan_items = ref([])

const kegiatan = ref()

const alokasi_items = ref([])

const headers_alokasi = ref([
    { "title": "Wilayah Id", "key": "wilayah_id", "align": 'start' },
    { "title": "Nama Wilayah", "key": "nama", "align": 'start' },
    { "title": "Email Pencacah", "key": "pencacah_email", "align": 'start' },
    { "title": "Email Pengawas", "key": "pengawas_email", "align": 'start' },
    { "title": "Aksi", "key": "actions", "value": "Aksi" }
])

const alokasi_dialog = ref(false)

const kode_wilayah = ref()
const nama_wilayah = ref()

const pencacah_items = ref([])
const pengawas_items = ref([])

const pencacah = ref()
const pengawas = ref()

const id_alokasi = ref()

const email_dialog = ref(false)
const email = ref()
const ganti_token = ref()

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
        await axios.post(`${apiUrl}/user/reset_admin`, params.value, {
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
        await axios.get(`${apiUrl}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(response => {
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

const get_daftar_kegiatan = async () => {
    try {
        await axios.get(`${apiUrl}/kegiatan`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(response => {

            kegiatan_items.value = response.data.data
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

const get_daftar_alokasi = async (kegiatan_id) => {
    try {
        await axios.get(`${apiUrl}/sampel?id=${kegiatan_id}&status=all`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(response => {
            alokasi_items.value = response.data.data
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

const get_user_kegiatan = async (kegiatan_id, role) => {
    try {
        await axios.get(`${apiUrl}/user?kegiatan_id=${kegiatan_id}&role=${role}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(response => {
            if (role == 'pencacah') {
                pencacah_items.value = response.data.data
            }
            if (role == 'pengawas') {
                pengawas_items.value = response.data.data
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

const edit_alokasi_dialog = async (id) => {
    try {
        alokasi_dialog.value = true
        dialog_title.value = 'Edit Alokasi'
        await axios.get(`${apiUrl}/data?id=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(response => {
            kode_wilayah.value = response.data.data.wilayah_id
            nama_wilayah.value = response.data.data.nama
            pencacah.value = response.data.data.pencacah_email
            pengawas.value = response.data.data.pengawas_email
            id_alokasi.value = response.data.data.id
            //console.log(response.data.data)
        })
    } catch (error) {

    }
}

const edit_alokasi = async () => {
    try {
        params.value = {}
        params.value.kode_wilayah = kode_wilayah.value
        params.value.nama_wilayah = nama_wilayah.value
        params.value.pencacah = pencacah.value
        params.value.pengawas = pengawas.value
        params.value.id = id_alokasi.value
        await axios.put(`${apiUrl}/sampel`, params.value, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(response => {
            alokasi_dialog.value = false
            get_daftar_alokasi(kegiatan.value)
            Swal.fire({
                title: "Good job!",
                text: response.data.message,
                icon: "success"
            }).then((result) => {

            });
        })
    } catch (error) {

    }
}

onMounted(async () => {
    reset_user_tabel()
    get_daftar_kegiatan()

})

const setting_email_dialog = async (id) => {
    email_dialog.value = true
    dialog_title.value = "Atur Email Pengiriman CAWI"
    id_alokasi.value = id
}

const kirim_email = async () => {
    try {
        params.value = {}
        params.value.id = id_alokasi.value
        params.value.email = email.value
        params.value.ganti_token = ganti_token.value
        await axios.post(`${apiUrl}/sampel/email`, params.value, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(response => {
            email_dialog.value = false
            get_daftar_alokasi(kegiatan.value)
            Swal.fire({
                title: "Good job!",
                text: response.data.message,
                icon: "success"
            }).then((result) => {

            });
        })
    } catch (error) {

    }


}

watch(kegiatan, async (newVal, oldVal) => {
    get_daftar_alokasi(newVal)
    get_user_kegiatan(newVal, 'pencacah')
    get_user_kegiatan(newVal, 'pengawas')
    //console.log(`Dipilih: ${newVal}, sebelumnya: ${oldVal}`)
})

</script>