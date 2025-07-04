<style scoped>
input {
    text-transform: uppercase;
}
</style>
<template>
    <div>
        <AppMenuBar />
        <v-container>
            <v-sheet class="mx-auto">
                <v-form fast-fail @submit.prevent ref="form">
                    <v-container>
                        <v-row no-gutters>
                            <v-col cols="12" sm="6">
                                <v-sheet class="pa-2">
                                    <v-text-field v-model="slsNama" label="1. Nama SLS" type="text" clearable
                                        append-inner-icon="mdi-information-outline" variant="underlined"
                                        disabled></v-text-field>
                                </v-sheet>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-sheet class="pa-2">
                                    <v-text-field v-model="slsKode" label="2. Kode SLS" type="text" clearable
                                        append-inner-icon="mdi-information-outline" variant="underlined"
                                        disabled></v-text-field>
                                </v-sheet>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-sheet class="pa-2">
                                    <v-text-field v-model="jumlahSegmen" :rules="jumlahSegmenRules"
                                        label="3. Jumlah Segmen" type="number" clearable
                                        append-inner-icon="mdi-information-outline" variant="underlined"
                                        :disabled="mode == 'view'" :error="!!errorJumlahSegmen"
                                        :error-messages="errorJumlahSegmen"></v-text-field>
                                    <div v-if="jumlahSegmen > 0">
                                        <span>4. Tuliskan detail segmen.</span>
                                        <p></p>
                                        <span>Muatan Segmen adalah muatan yang ada di <b><i>LKM Blok 3 Kolom
                                                    11</i></b></span>
                                        <div v-for="(item, index) in listSegmen" :key="index" class="mt-2">
                                            <v-sheet border class="pa-2">
                                                <span>{{ 'Segmen ke-' + (parseInt(index) + 1).toString() }}</span>
                                                <v-text-field v-model="listSegmen[index].nomor"
                                                    :rules="[nomorSegmenRules]"
                                                    :label="'4.' + (parseInt(index) + 1).toString() + '. Nomor Segmen'"
                                                    append-icon="mdi-delete" @click:append="removeSegmen(index)"
                                                    :disabled="mode == 'view'" placeholder="01"></v-text-field>
                                                <v-text-field v-model="listSegmen[index].muatan"
                                                    :rules="[muatanSegmenRules]" type="number"
                                                    :label="'4.' + (parseInt(index) + 1).toString() + '. Muatan Segmen'"
                                                    :disabled="mode == 'view'"></v-text-field>
                                                <v-checkbox v-model="listSegmen[index].is_done"
                                                    :label="'4.' + (parseInt(index) + 1).toString() + '. Tandai segmen ke-' + (parseInt(index) + 1).toString() + ' selesai.'"
                                                    :disabled="mode == 'view'"></v-checkbox>
                                            </v-sheet>
                                        </div>
                                    </div>
                                </v-sheet>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-sheet>
                                    <v-checkbox v-model="isDone"
                                        label="Tandai seluruh segmen pada SLS ini selesai didata."
                                        :disabled="mode == 'view'"></v-checkbox>
                                </v-sheet>
                                <v-sheet class="pa-2">
                                    <v-textarea v-model="catatan" label="5. Catatan" variant="underlined"
                                        :disabled="mode == 'view'"></v-textarea>
                                </v-sheet>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="4">
                                <v-btn class="pd-2" type="submit" block rounded="lg" color="indigo-darken-3"
                                    v-if="(mode == 'edit')" @click="submit">Simpan</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-sheet>
        </v-container>
    </div>
</template>

<script setup>
//
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2'
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user'))


const route = useRoute(); // Mengakses objek route saat ini
const router = useRouter()
const mode = route.query.mode
const id = route.query.id
const form = ref()
const slsNama = ref('Nama SLS')
const slsKode = ref('Kode SLS')
const isDone = ref(false)

const jumlahSegmen = ref()

const errorJumlahSegmen = ref()
const catatan = ref('')
const jumlahSegmenRules = [
    value => {
        if (!value) return 'Jumlah Harus diisi';
        if (value > 99 || value <= 0) return 'Masukan jumlah antara 1 - 99';
        return true;
    },
]
//let listSegmen = ref([{'nomor' : '01','muatan' : 1}])
let listSegmen = ref([])

watch(jumlahSegmen, (newValue, oldValue) => {
    console.log('eee')
    if (listSegmen.value.filter(item => item.nomor !== '').length != newValue) {
        listSegmen.value = listSegmen.value.filter(item => item.nomor !== '')
        for (let i = 0; i < newValue - listSegmen.value.filter(item => item.nomor !== '').length; i++) {
            listSegmen.value.push({ 'nomor': '', 'muatan': '0', 'is_done': false })
        }
    }
});

const nomorSegmenRules = (value) => {
    if (!value) {
        return 'Nomor Segmen tidak boleh kosong';
    }
    if (!onlyNumber(value)) {
        return 'Nomor Segmen tidak boleh mengandung huruf';
    }
    if (value.length > 2) {
        return 'Nomor segmen tidak boleh melebihi 3 karakter';
    }
    return true; // Validasi berhasil jika nilai tidak kosong dan lebih dari 3 karakter
};

const muatanSegmenRules = (value) => {
    if (value === '') {
        return 'Muatan Segmen tidak boleh kosong';
    }
    if (value > 180) {
        return 'Muatan Segmen tidak boleh lebih dari 180';
    }
    if (value < 0) {
        return 'Muatan Segmen tidak boleh negatif';
    }
    return true;
}

function containsNumber(text) {
    // Memeriksa setiap karakter dalam teks untuk melihat apakah itu angka
    return [...text].some(char => char >= '0' && char <= '9');
}

function onlyNumber(text) {
    // Memeriksa setiap karakter dalam teks untuk melihat apakah itu angka
    return /^[0-9]+$/.test(text);
}

const removeSegmen = (index) => {
    if (listSegmen.value.length != jumlahSegmen.value) {
        listSegmen.value.splice(index, 1); // Menghapus item pada indeks tertentu
    } else {
        Swal.fire({
            title: "Oops!",
            text: "Jumlah Segmen sama dengan jumlah daftar segmen, jika ingin menghapus, dapat menyesuaikan jumlah segmen terlebih dahulu.",
            icon: "error"
        })
    }
};

// trigger data
const params = ref({ id: id })
const role = ref()

const submit = async () => {
    await form.value.validate().then(async (result) => {
        if (jumlahSegmen.value != listSegmen.value.length) {
            errorJumlahSegmen.value = 'Jumlah Segmen tidak sesuai dengan daftar segmen'
        }
        if (result.valid && (jumlahSegmen.value == listSegmen.value.length)) {
            params.value.catatan = catatan.value
            params.value.status = 'draft'
            if (role.value == 'pencacah' && isDone.value) {
                params.value.status = 'submit'
            }
            if (role.value == 'pengawas' && isDone.value) {
                params.value.status = 'approve'
            }
            const data = {
                nm_sls: slsNama.value,
                kd_sls: slsKode.value,
                jml_segmen: jumlahSegmen.value,
                seg: listSegmen.value,
                is_done: isDone.value,
                catatan: catatan.value
            }
            params.value.data = data
            await axios.post(`${apiUrl}/data`, params.value, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(response => {
                if (response.data.code == 200) {

                    Swal.fire({
                        title: "Good job!",
                        text: response.data.message,
                        icon: "success"
                    }).then((result) => {
                        router.back()
                    });
                } else {
                    Swal.fire({
                        title: "Oops!",
                        text: response.data.message,
                        icon: "error"
                    })
                }

            })
        }
    })
}

onMounted(async () => {
    try {
        await axios.get(`${apiUrl}/data`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: params.value
        }).then(response => {
            slsNama.value = response.data.data.MSLS.nama
            slsKode.value = response.data.data.MSLS.kode
            if (response.data.data.answerKegiatan.length > 0) {
                jumlahSegmen.value = response.data.data.answerKegiatan[0].answer.jml_segmen
                listSegmen.value = response.data.data.answerKegiatan[0].answer.seg
                isDone.value = response.data.data.answerKegiatan[0].answer.is_done
            }
            catatan.value = response.data.data.catatan
            role.value = response.data.role
        })
    } catch (error) {
        console.log(error)
    }
})

</script>
