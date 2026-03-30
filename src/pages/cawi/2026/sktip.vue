<style scoped>
input {
    text-transform: uppercase;
}

.active-tab {
    background-color: #FFE0B2 !important;
    color: #e65100 !important;
    font-weight: bold;
    border-radius: 8px;
}
</style>

<template>
    <v-app-bar :elevation="2">
        <!--
        <template v-slot:prepend>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>
-->
        <template v-slot:prepend>
            <v-img :width="60" aspect-ratio="1/1" cover rounded src="/bps.svg"></v-img>
        </template>
        <template v-slot:append>
            <v-img :width="60" aspect-ratio="1/1" cover rounded src="/pem_bali.png"></v-img>
        </template>
        <v-app-bar-title>SURVEI KHUSUS TRIWULANAN INDIKATOR PRODUKSI 2026</v-app-bar-title>
    </v-app-bar>
    <v-sheet class="mx-auto" style="min-height:85vh">
        <v-form fast-fail @submit.prevent ref="form">
            <v-container>
                <v-card>
                    <v-tabs v-model="tab" bg-color="orange-darken-2" selected-class="active-tab">
                        <v-tab value="blok_1">Blok I</v-tab>
                        <v-tab value="blok_2">Blok II</v-tab>
                        <v-tab value="blok_3">Blok III - R.301</v-tab>
                        <v-tab value="blok_3_2">Blok III - R.302 - R.305</v-tab>
                        <v-tab value="blok_4">Blok IV</v-tab>
                    </v-tabs>
                </v-card>

                <v-card-text>
                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item value="blok_1">
                            <v-row no-gutters>
                                <v-col cols="12">
                                    <v-sheet class="pa-2" color="deep-orange-lighten-4">
                                        <p><b>Perhatian :</b></p>
                                        <ol>
                                            <li>1. Tujuan survei ini adalah untuk mengetahui produksi dan nilai produksi
                                                triwulanan perusahaan/usaha</li>
                                            <li>2. Hasil survei ini akan digunakan untuk bahan penyusunan PDRB
                                                Triwulanan
                                            </li>
                                            <li>3. Pelaksanaan kegiatan ini berdasarkan Undang-Undang Nomor 16 Tahun
                                                1997
                                                tentang Statistik.</li>
                                            <li>4. Kerahasiaan data yang diberikan dijamin oleh Undang-Undang Nomor 16
                                                Tahun
                                                1997 tentang Statistik.</li>
                                            <li>5. Survei ini <b>tidak ada hubungannya</b> dengan <b>pajak</b>, dan
                                                <b>tidak
                                                    dipungut biaya.</b>
                                            </li>

                                        </ol>
                                    </v-sheet>
                                </v-col>
                                <v-col cols="12">
                                    <v-sheet class="pa-2" color="deep-orange-lighten-2">
                                        <b>I. PENGENALAN TEMPAT</b>
                                    </v-sheet>
                                    <v-sheet class="pa-2" color="deep-orange-lighten-4">
                                        <v-select v-model="r101" label="101. Provinsi *" :items=r101_items
                                            item-title="nama" item-value="kode" variant="underlined"
                                            @update:modelValue="onChangeProv"></v-select>
                                        <v-select v-model="r102" label="102. Kabupaten/Kota *" :items=r102_items
                                            item-title="nama" item-value="kode" variant="underlined"
                                            @update:modelValue="onChangeKab"></v-select>
                                        <v-select v-model="r103" label="103. Kecamatan *" :items=r103_items
                                            item-title="nama" item-value="kode" variant="underlined"
                                            @update:modelValue="onChangeKec"></v-select>
                                        <v-select v-model="r104" label="104. Desa *" :items=r104_items item-title="nama"
                                            item-value="kode" variant="underlined"></v-select>
                                    </v-sheet>
                                </v-col>

                            </v-row>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="blok_2">
                            <v-row no-gutters>
                                <v-col cols="12">
                                    <v-sheet class="pa-2" color="deep-orange-lighten-2">
                                        <b>II. INFORMASI UMUM</b>
                                    </v-sheet>
                                    <v-sheet class="pa-2" color="deep-orange-lighten-4">
                                        <v-text-field v-model="r201" label="201. Nama Perusahaan/Pengusaha *"
                                            type="text" clearable append-inner-icon="mdi-information-outline"
                                            placeholder="Contoh : Jaya, PT atau Karya, CV"
                                            variant="underlined"></v-text-field>
                                        <v-textarea v-model="r202" label="202. Alamat *" variant="underlined"
                                            :disabled="mode == 'view'"></v-textarea>
                                        <v-text-field v-model="r203" label="203. No Telp /fax *" type="number" clearable
                                            append-inner-icon="mdi-information-outline"
                                            placeholder="Contoh : 081123123123" variant="underlined"></v-text-field>
                                        <v-select v-model="r204" label="204. Kategori Perusahaan/Usaha *"
                                            :items=r204_items item-title="nama" item-value="kode"
                                            variant="underlined"></v-select>
                                        <v-textarea v-model="r205" label="205. Tuliskan Aktivitas Perusahaan/Usaha *"
                                            variant="underlined" :disabled="mode == 'view'"></v-textarea>
                                        <v-autocomplete v-model="r205_kbli" :items="r205_kbli_items"
                                            label="205. KBLI 2020" item-title="nama" item-value="kode" clearable
                                            :loading="loading" density="comfortable" variant="underlined"
                                            :no-filter="true" @update:search="onSearch" />
                                    </v-sheet>
                                </v-col>

                            </v-row>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="blok_3">
                            <v-row no-gutters>
                                <v-col cols="12">
                                    <v-sheet class="pa-2" color="deep-orange-lighten-2">
                                        <b>III. PRODUKSI DAN NILAI PRODUKSI</b>
                                    </v-sheet>
                                    <v-sheet class="pa-2" color="deep-orange-lighten-4">
                                        <v-tabs v-model="tw" bg-color="orange-darken-2">
                                            <v-tab v-for="tw_item in tw_items" :value="tw_item.kode"
                                                selected-class="active-tab">{{
                                                    tw_item.nama_singkat
                                                }}</v-tab>
                                        </v-tabs>
                                        <v-tabs-window v-model="tw">
                                            <v-tabs-window-item :value="tw_item.kode" v-for="tw_item in tw_items">
                                                <v-row no-gutters>
                                                    <v-col cols="12">
                                                        <v-sheet class="pa-2" color="deep-orange-lighten-2">
                                                            <b>{{ tw_item.nama_lengkap }}</b>
                                                        </v-sheet>
                                                        <br>
                                                        <v-sheet class="pa-2" color="deep-orange-lighten-4">
                                                            <span>301. Produk Barang/Jasa
                                                                :*</span>
                                                            <v-row no-gutters v-for="r301_item in tw_item.r301">
                                                                <v-col cols="3">
                                                                    <v-sheet class="ma-2" color="deep-orange-lighten-4">
                                                                        <v-text-field v-model="r301_item.produksi"
                                                                            label="Jenis Barang/Jasa" type="text" clearable
                                                                            placeholder="Contoh : "
                                                                            variant="underlined"></v-text-field>
                                                                    </v-sheet>
                                                                </v-col>
                                                                <v-col cols="2">
                                                                    <v-sheet class="ma-2" color="deep-orange-lighten-4">
                                                                        <v-text-field v-model="r301_item.satuan"
                                                                            label="Satuan" type="text" clearable
                                                                            placeholder=""
                                                                            variant="underlined"></v-text-field>
                                                                    </v-sheet>
                                                                </v-col>
                                                                <v-col cols="3">
                                                                    <v-sheet class="ma-2" color="deep-orange-lighten-4">
                                                                        <v-text-field
                                                                            v-model="r301_item.nilai_produksi"
                                                                            :suffix="r301_item.satuan" label="Volume Produksi"
                                                                            type="text" clearable
                                                                            placeholder="Volume Produksi" class="text-right"
                                                                            variant="underlined"
                                                                            @input="formatNumber($event, r301_item, 'nilai_produksi')"></v-text-field>
                                                                    </v-sheet>
                                                                </v-col>
                                                                <v-col cols="3">
                                                                    <v-sheet class="ma-2" color="deep-orange-lighten-4">
                                                                        <v-text-field v-model="r301_item.nilai_pendapatan"
                                                                            prefix="Rp" class="text-right"
                                                                            label="Nilai Pendapatan" type="text" clearable
                                                                            placeholder="" variant="underlined"
                                                                            @input="formatNumber($event, r301_item, 'nilai_pendapatan')"></v-text-field>
                                                                    </v-sheet>
                                                                </v-col>
                                                                <v-col cols="1">
                                                                    <v-sheet class="pa-2 ma-2"
                                                                        color="deep-orange-lighten-4">
                                                                        <v-btn class="pd-2" type="btn" block
                                                                            rounded="lg" color="red-darken-1"
                                                                            icon="mdi-delete"
                                                                            size="small"
                                                                            @click="del_list_produksi(tw_item.kode, r301_item.id)"></v-btn>
                                                                    </v-sheet>
                                                                </v-col>
                                                            </v-row>
                                                            <v-btn class="pd-2" type="btn" block rounded="lg"
                                                                color="deep-orange-lighten-2"
                                                                prepend-icon="mdi-note-plus"
                                                                @click="tambah_produksi(tw_item.kode)">Tambah Hasil
                                                                Produksi</v-btn>
                                                            <br>
                                                        </v-sheet>
                                                        <br>
                                                    </v-col>
                                                </v-row>
                                            </v-tabs-window-item>

                                        </v-tabs-window>
                                    </v-sheet>
                                </v-col>

                            </v-row>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="blok_3_2">
                            <v-row no-gutters>
                                <v-col cols="12">
                                    <v-sheet class="pa-2" color="deep-orange-lighten-2">
                                        <b>III. PRODUKSI DAN NILAI PRODUKSI</b>
                                    </v-sheet>
                                    <v-sheet class="pa-2" color="deep-orange-lighten-4">
                                        <v-select v-model="r302" label="302. Perkembangan Produksi dibandingkan Triwulan Sebelumnya : *"
                                            :items=nilai_naik_turun item-title="nama" item-value="kode"
                                            variant="underlined"></v-select>
                                        <v-select v-model="r303" label="303. Perkembangan Pendapatan Usaha Dibandingkan Triwulan Sebelumnya : *"
                                            :items=nilai_naik_turun item-title="nama" item-value="kode"
                                            variant="underlined"></v-select>
                                        <v-text-field v-model="r304" label="304. Persentase peningkatan/penurunan *"
                                            type="number" clearable append-inner-icon="mdi-information-outline"
                                            variant="underlined"></v-text-field>

                                        <v-textarea v-model="r305" label="305. Alasan peningkatan/penurunan *"
                                            variant="underlined" :disabled="mode == 'view'"></v-textarea>
                                    </v-sheet>
                                </v-col>

                            </v-row>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="blok_4">
                            <v-row no-gutters>
                                <v-col cols="12">
                                    <v-sheet class="pa-2" color="deep-orange-lighten-2">
                                        <b>IV. CATATAN</b>
                                    </v-sheet>
                                    <v-sheet class="pa-2" color="deep-orange-lighten-4">
                                        <v-textarea v-model="r401"
                                            label="401. (Tuliskan fenomena kualitatif terkait naik turunnya produksi)"
                                            variant="underlined" :disabled="mode == 'view'"></v-textarea>
                                    </v-sheet>
                                </v-col>

                            </v-row>
                        </v-tabs-window-item>
                    </v-tabs-window>
                    <br>
                    <v-row justify="end">
                        <v-col cols="12" sm="2">
                            <v-btn class="pd-2" type="submit" block rounded="lg" color="deep-orange-lighten-2"
                                @click="prevTab" prepend-icon="mdi-skip-previous" >
                            </v-btn>
                        </v-col>
                        <v-col cols="12" sm="2">
                            <v-btn class="pd-2" type="submit" block rounded="lg" color="deep-orange-lighten-2"
                                @click="nextTab" prepend-icon="mdi-skip-next" ></v-btn>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-btn class="pd-2" type="submit" block rounded="lg" color="blue-darken-3"
                                @click="kirim_data(type = 2)" prepend-icon="mdi-content-save" >Simpan</v-btn>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-btn class="pd-2" type="submit" block rounded="lg" color="green-darken-2"
                                @click="kirim_data(type = 1)" prepend-icon="mdi-send" >Kirim</v-btn>
                        </v-col>

                    </v-row>
                </v-card-text>

            </v-container>
        </v-form>
    </v-sheet>
    <Footer></Footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRoute, useRouter } from 'vue-router';

const apiUrl = import.meta.env.VITE_API_URL;
const mwil_version = '2025_02'
const tab = ref(null)
const mode = ref('')

const route = useRoute(); // Mengakses objek route saat ini
const router = useRouter()
const token = route.query.token
const id = route.query.id
const params = ref({});
const form = ref()

//blok 1
const r101_items = ref([{ kode: '51', nama: '51 - BALI' }])
const r101 = ref()
const r102_items = ref([])
const r102 = ref()
const r103_items = ref([])
const r103 = ref()
const r104_items = ref([])
const r104 = ref()

//blok 2
const r201 = ref()
const r202 = ref()
const r203 = ref()
const r204 = ref()
const r204_items = ref([
    { kode: 'A', nama: 'A - Pertanian, Kehutanan, dan Perikanan' },
    { kode: 'B', nama: 'B - Pertambangan dan Penggalian' },
    { kode: 'C', nama: 'C - Industri Pengolahan' },
    { kode: 'D', nama: 'D - Pengadaan Listrik dan Gas' },
    { kode: 'E', nama: 'E - Pengadaan Air, Pengelolaan Sampah, Limbah dan Daur Ulang' },
    { kode: 'F', nama: 'F - Konstruksi' },
    { kode: 'G', nama: 'G - Perdagangan Besar dan Eceran; Reparasi Mobil dan Sepeda Motor' },
    { kode: 'H', nama: 'H - Transportasi dan Pergudangan' },
    { kode: 'I', nama: 'I - Penyediaan Akomodasi dan Makan Minum' },
    { kode: 'J', nama: 'J - Informasi dan Komunikasi' },
    { kode: 'K', nama: 'K - Jasa Keuangan dan Asuransi' },
    { kode: 'L', nama: 'L - Real Estat' },
    { kode: 'M,N', nama: 'M,N - Jasa Perusahaan' },
    { kode: 'O', nama: 'O - Administrasi Pemerintahan, Pertahanan dan Jaminan Sosial Wajib' },
    { kode: 'P', nama: 'P - Jasa Pendidikan' },
    { kode: 'Q', nama: 'Q - Jasa Kesehatan dan Kegiatan Sosial' },
    { kode: 'R,S,T,U', nama: 'R,S,T,U - Jasa lainnya' },

])
const r205 = ref()

const r205_kbli = ref()
const r205_kbli_items = ref([])

//blok 3
const tw = ref()
const tw_items = ref([
    { kode: '202601', nama_singkat: '2026 TW I', nama_lengkap: '2026 Triwulan I', r301: [],  r301_length: 0},
    { kode: '202504', nama_singkat: '2025 TW IV', nama_lengkap: '2025 Triwulan IV', r301: [],  r301_length: 0},
    { kode: '202501', nama_singkat: '2025 TW I', nama_lengkap: '2025 Triwulan I', r301: [],  r301_length: 0},
])

const r302 = ref()
const r303 = ref()
const r304 = ref()
const r305 = ref()
const tambah_produksi = (tw) => {
    const item = tw_items.value.find(i => i.kode === tw)
    const id = uuidv4()
    if (item) {
        item.r301.push({ id: id, produksi: null, satuan: null, nilai_produksi: null ,nilai_pendapatan: null})
        item.r301_length = item.r301.length
    }
}

const del_list_produksi = (tw, id) => {
    const item = tw_items.value.find(i => i.kode === tw)
    const index = item.r301.findIndex(item => item.id === id)
    if (index !== -1) {
        item.r301.splice(index, 1)
    }
}


const nilai_naik_turun = ref(
    [
        { kode: '1', nama: '1 - Meningkat' },
        { kode: '2', nama: '2 - Tetap' },
        { kode: '3', nama: '3 - Turun' }
    ])



//blok 4
const r401 = ref()

//format pisah ribuan
const formatNumber = (event, obj, field) => {
    let value = event.target.value.replace(/\D/g, "")
    obj[field] = new Intl.NumberFormat("id-ID").format(value)
    console.log(obj[field])
}

//next tab
const tabs = ["blok_1", "blok_2", "blok_3","blok_3_2", "blok_4"]

const prevTab = () => {
    const index = tabs.indexOf(tab.value)
    if (index > 0) {
        tab.value = tabs[index - 1]
    }
}

const nextTab = () => {
    const index = tabs.indexOf(tab.value)
    if (index < tabs.length - 1) {
        tab.value = tabs[index + 1]
    }
}

//kirim data
const kirim_data = async (type) => {
    await form.value.validate().then(async (result) => {
        params.value.catatan = r401.value
        if(type=='2'){
            params.value.status = 'draft'
        }
        if(type=='1'){
            params.value.status = 'submit'
        }
        
        const data = {
            r101: r101.value,
            r102: r102.value,
            r103: r103.value,
            r104: r104.value,
            r201: r201.value,
            r202: r202.value,
            r203: r203.value,
            r204: r204.value,
            r205: r205.value,
            r205_kbli: r205_kbli.value,
            tw_items: tw_items.value,
            r302: r302.value,
            r303: r303.value,
            r304: r304.value,
            r305: r305.value,
            r401: r401.value,
        }
        params.id = id
        params.token = token
        params.value.data = data
        await axios.post(`${apiUrl}/data/cawi`, params.value, {

        }).then(response => {
            if (response.data.code == 200) {
                Swal.fire({
                    title: "Good job!",
                    text: response.data.message,
                    icon: "success"
                }).then(response => {
                    if (type == 1) {
                        router.push('/success?id=' + params.id + '&token=' + params.token + '&path=' + route.path)
                    }
                })
            }
        })
    })
}

//proses controller kues
//filter wilayah
const onChangeProv = async () => {
    await axios.get(`${apiUrl}/mwil?version=${mwil_version}&level=2`, {
    }).then(response => {
        const result = response.data.data.map(item => ({
            ...item,
            nama: `${item.kode} - ${item.nama}`
        }))
        r102_items.value = result
    })
}
const onChangeKab = async () => {
    await axios.get(`${apiUrl}/mwil?version=${mwil_version}&level=3&filter=${r102.value}`, {
    }).then(response => {
        const result = response.data.data.map(item => ({
            ...item,
            nama: `${item.kode} - ${item.nama}`
        }))
        r103_items.value = result
    })
}
const onChangeKec = async () => {
    await axios.get(`${apiUrl}/mwil?version=${mwil_version}&level=4&filter=${r103.value}`, {
    }).then(response => {
        const result = response.data.data.map(item => ({
            ...item,
            nama: `${item.kode} - ${item.nama}`
        }))
        r104_items.value = result
    })
}
//filter KBLI
const loading = ref(false)
const search = ref("")

const onSearch = async (val) => {
    search.value = val
    if (!val || val.length < 2) {
        r205_kbli_items.value = []
        return
    }

    loading.value = true
    try {
        await axios.get(`${apiUrl}/klasifikasi/kbli`, {
            params: {
                search: val,
                page: 1,
                limit: 10,
                version: "2020"
            }
        }).then(response => {
            const result = response.data.data.map(item => ({
                kode: item.kbli_kode,
                nama: `${item.kbli_kode} - ${item.kbli_deskripsi}`
            }))
            r205_kbli_items.value = result;
        })

    } catch (err) {
        console.error(err)
    } finally {
        loading.value = false
    }
}

onMounted(async () => {
    //master prov
    if (!id && !token) {
        Swal.fire({
            title: "Opps!",
            text: "Anda mengakses halaman yang salah, silakan tekan OK!",
            icon: "error"
        }).then((result) => {
            router.push('/')
        });
    } else {
        await axios.get(`${apiUrl}/mwil?version=${mwil_version}&level=1`, {
        }).then(response => {
            const result = response.data.data.map(item => ({
                ...item,
                nama: `${item.kode} - ${item.nama}`
            }))
            r101_items.value = result
        })
        params.value.id = id
        params.value.token = token
        await axios.get(`${apiUrl}/data/cawi?id=${id}&token=${token}`, {
        }).then(response => {
            if (response.data.code == 200) {
                onChangeProv()
                r101.value = response.data.data.MProv.kode
                r102.value = response.data.data.MKab.kode
                onChangeKab()
                r201.value = response.data.data.nama
                //ketika mode sudah ada jawaban
                if (response.data.data.answerKegiatan[0].answer.r101) {
                    r101.value = response.data.data.answerKegiatan[0].answer.r101
                    onChangeProv()
                }
                if (response.data.data.answerKegiatan[0].answer.r102) {
                    r102.value = response.data.data.answerKegiatan[0].answer.r102
                    onChangeKab()
                }
                if (response.data.data.answerKegiatan[0].answer.r103) {
                    r103.value = response.data.data.answerKegiatan[0].answer.r103
                    onChangeKec()
                }
                if (response.data.data.answerKegiatan[0].answer.r104) {
                    r104.value = response.data.data.answerKegiatan[0].answer.r104
                }
                if (response.data.data.answerKegiatan[0].answer.r201) {
                    r201.value = response.data.data.answerKegiatan[0].answer.r201
                }
                if (response.data.data.answerKegiatan[0].answer.r202) {
                    r202.value = response.data.data.answerKegiatan[0].answer.r202
                }
                if (response.data.data.answerKegiatan[0].answer.r203) {
                    r203.value = response.data.data.answerKegiatan[0].answer.r203
                }
                if (response.data.data.answerKegiatan[0].answer.r204) {
                    r204.value = response.data.data.answerKegiatan[0].answer.r204
                }
                if (response.data.data.answerKegiatan[0].answer.r205) {
                    r205.value = response.data.data.answerKegiatan[0].answer.r205
                }
                if (response.data.data.answerKegiatan[0].answer.r205_kbli) {
                    r205_kbli.value = response.data.data.answerKegiatan[0].answer.r205_kbli
                }
                if (response.data.data.answerKegiatan[0].answer.tw_items) {
                    tw_items.value = response.data.data.answerKegiatan[0].answer.tw_items
                }
                if (response.data.data.answerKegiatan[0].answer.r302) {
                    r302.value = response.data.data.answerKegiatan[0].answer.r302
                }
                if (response.data.data.answerKegiatan[0].answer.r303) {
                    r303.value = response.data.data.answerKegiatan[0].answer.r303
                }
                if (response.data.data.answerKegiatan[0].answer.r304) {
                    r304.value = response.data.data.answerKegiatan[0].answer.r304
                }
                if (response.data.data.answerKegiatan[0].answer.r305) {
                    r305.value = response.data.data.answerKegiatan[0].answer.r305
                }
                if (response.data.data.answerKegiatan[0].answer.r401) {
                    r401.value = response.data.data.answerKegiatan[0].answer.r401
                }
            }

        })
    }


});



</script>