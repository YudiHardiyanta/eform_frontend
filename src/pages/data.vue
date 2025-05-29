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
                  <v-text-field v-model="desaDinas" label="1. Nama Desa Dinas" type="text" clearable
                    append-inner-icon="mdi-information-outline" variant="underlined" disabled></v-text-field>
                </v-sheet>
              </v-col>
              <v-col cols="12" sm="6">
                <v-sheet class="pa-2">
                  <v-text-field v-model="jumlahDesa" :rules="jumlahDesaRules" label="2. Jumlah Desa Adat" type="number"
                    clearable append-inner-icon="mdi-information-outline" variant="underlined"
                    :disabled="mode == 'view'" :error="!!errorJumlahDesa" :error-messages="errorJumlahDesa"></v-text-field>
                  <div v-if="jumlahDesa > 0">
                    <span>Tuliskan nama desa adat</span>
                    <v-text-field v-for="(item, index) in listDesaAdat" :key="index" v-model="listDesaAdat[index]"
                      :rules="[desaAdatRules]" label="2.L. Nama Desa Adat" append-icon="mdi-delete"
                      @click:append="removeDesaAdat(index)" :disabled="mode == 'view'"></v-text-field>
                  </div>
                </v-sheet>
              </v-col>
              <v-col cols="12" sm="6">
                <v-sheet class="pa-2">
                  <v-text-field v-model="jumlahPelakuSeni" :rules="jumlahPelakuSeniRules" label="3. Jumlah Pelaku Seni"
                    type="number" clearable append-inner-icon="mdi-information-outline" variant="underlined"
                    :disabled="mode == 'view'"></v-text-field>
                </v-sheet>
              </v-col>
              <v-col cols="12" sm="6">
                <v-sheet class="pa-2">
                  <v-text-field v-model="jumlahSanggarSeni" :rules="jumlahSanggarSeniRules" label="4. Jumlah Sanggar Seni"
                    type="number" clearable append-inner-icon="mdi-information-outline" variant="underlined"
                    :disabled="mode == 'view'"></v-text-field>
                </v-sheet>
              </v-col>
              <v-col cols="12" sm="6">
                <v-sheet class="pa-2">
                  <v-text-field v-model="jumlahCagarBudaya" :rules="jumlahCagarBudayaRules" label="5. Jumlah Cagar Budaya"
                    type="number" clearable append-inner-icon="mdi-information-outline" variant="underlined"
                    :disabled="mode == 'view'" :error="!!errorJumlahCagar" :error-messages="errorJumlahCagar"></v-text-field>
                  <div v-if="jumlahCagarBudaya > 0">
                    <span>Tuliskan nama cagar budaya</span>
                    <v-text-field v-for="(item, index) in listCagarBudaya" :key="index" v-model="listCagarBudaya[index]"
                      :rules="[cagarBudayaRules]" label="5.L. Nama Cagar Budaya" append-icon="mdi-delete"
                      @click:append="removeCagarBudaya(index)" :disabled="mode == 'view'"></v-text-field>
                  </div>
                </v-sheet>
              </v-col>
              <v-col cols="12" sm="6">
                <v-sheet class="pa-2">
                  <v-text-field v-model="catatan" label="6. Catatan"
                    type="number" clearable append-inner-icon="mdi-information-outline" variant="underlined"
                    :disabled="mode == 'view'"></v-text-field>
                </v-sheet>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="4">
                <v-btn class="pd-2" type="submit" block rounded="lg" color="indigo-darken-3"
                  v-if="(mode == 'edit' && role == 'pencacah')" @click="submit">Simpan</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-container>
          <v-row ga="3">
            <v-col cols="12" sm="4">
              <v-btn class="pd-2" type="btn" block rounded="lg" color="teal-darken-3" @click="onVerify('approve')"
                v-if="(mode == 'edit' && role == 'pengawas')">Setujui</v-btn>
            </v-col>
            <v-col cols="12" sm="4">
              <v-btn class="pd-2" type="btn" block rounded="lg" color="red-darken-3" @click="onVerify('reject')"
                v-if="(mode == 'edit' && role == 'pengawas')">Tolak</v-btn>
            </v-col>
          </v-row>
        </v-container>
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
const desaDinas = ref('Desa Ubung Kaja')
const jumlahDesa = ref('')
const errorJumlahDesa = ref()
const errorJumlahCagar = ref()
const catatan = ref()
const jumlahDesaRules = [
  value => {
    if (!value) return 'Jumlah Harus diisi'
    if (value > 99 && value <= 0) return 'Masukan jumlah antara 0 - 99'
    return true
  },
]
let listDesaAdat = ref([])

watch(jumlahDesa, (newValue, oldValue) => {
  if (listDesaAdat.value.filter(item => item !== '').length < newValue) {
    listDesaAdat.value = listDesaAdat.value.filter(item => item !== '')
    for (let i = 0; i < newValue - listDesaAdat.value.filter(item => item !== '').length; i++) {
      listDesaAdat.value.push('')
    }
  }
});

const desaAdatRules = (value) => {
  if (!value) {
    return 'Nama Desa Adat tidak boleh kosong';
  }
  if (containsNumber(value)) {
    return 'Nama Desa Adat tidak boleh mengandung angka';
  }
  if (value.length<3){
    return 'Nama Desa Adat minimal 3 karakter';
  }
  return true; // Validasi berhasil jika nilai tidak kosong dan lebih dari 3 karakter
};

function containsNumber(text) {
  // Memeriksa setiap karakter dalam teks untuk melihat apakah itu angka
  return [...text].some(char => char >= '0' && char <= '9');
}

const removeDesaAdat = (index) => {
  listDesaAdat.value.splice(index, 1); // Menghapus item pada indeks tertentu
};

const jumlahPelakuSeni = ref('')

const jumlahPelakuSeniRules = [
  value => {
    if (!value) return 'Jumlah harus diisi'
    if (value > 999 || value < 0) return 'Masukan jumlah antara 0 - 999'
    return true
  },
]
const jumlahSanggarSeni = ref('')
const jumlahSanggarSeniRules = [
  value => {
    if (!value) return 'Jumlah harus diisi'
    if (value > 999 || value < 0) return 'Masukan jumlah antara 0 - 999'
    return true
  },
]

const jumlahCagarBudaya = ref('')
const jumlahCagarBudayaRules = [
  value => {
    if (!value) return 'Jumlah harus diisi'
    if (value > 999 || value < 0) return 'Masukan jumlah antara 0 - 999'
    return true
  },
]

let listCagarBudaya = ref([])

const cagarBudayaRules = (value) => {
  if (!value) {
    return 'Nama Cagar Budaya tidak boleh kosong';
  }
  if (containsNumber(value)) {
    return 'Nama Cagar Budaya tidak boleh mengandung angka';
  }
  return true; // Validasi berhasil jika nilai tidak kosong dan lebih dari 3 karakter
};

const removeCagarBudaya = (index) => {
  listCagarBudaya.value.splice(index, 1); // Menghapus item pada indeks tertentu
};

watch(jumlahCagarBudaya, (newValue, oldValue) => {
  if (listCagarBudaya.value.filter(item => item !== '').length < newValue) {
    listCagarBudaya.value = listCagarBudaya.value.filter(item => item !== '')
    for (let i = 0; i < newValue - listCagarBudaya.value.filter(item => item !== '').length; i++) {
      listCagarBudaya.value.push('')
    }
  }
});

// trigger data
const params = ref({ id: id })
const role = ref()

const submit = async () => {
  await form.value.validate().then(async (result) => {
    if(jumlahDesa.value!=listDesaAdat.value.length){
      errorJumlahDesa.value='Jumlah Desa Adat tidak sesuai dengan Daftar Desa Adat'
    }
    if(jumlahCagarBudaya.value!=listCagarBudaya.value.length){
      errorJumlahDesa.value='Jumlah Cagar Budaya tidak sesuai dengan Daftar Cagar Budaya'
    }
    if (result.valid && (jumlahDesa.value==listDesaAdat.value.length) && (jumlahCagarBudaya.value==listCagarBudaya.value.length)) {
      params.value.status = 'submit'
      const data = {
        jml_da: jumlahDesa.value,
        li_da: listDesaAdat.value,
        jml_ps: jumlahPelakuSeni.value,
        jml_ss: jumlahSanggarSeni.value,
        jml_cb: jumlahCagarBudaya.value,
        li_cb: listCagarBudaya.value,
        catatan : catatan.value
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
const onVerify = async (status) => {
  try {
    params.value.status = status;
    await axios.post(`${apiUrl}/data/verify`, params.value, {
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
  } catch (error) {
    Swal.fire({
      title: "Oops!",
      text: error,
      icon: "error"
    })
  }
}

onMounted(async () => {
  try {
    await axios.get(`${apiUrl}/data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params.value
    }).then(response => {
      desaDinas.value = response.data.data.MDesa.nama
      if (response.data.data.answerKegiatan.length > 0) {
        jumlahDesa.value = response.data.data.answerKegiatan[0].answer.jml_da
        listDesaAdat.value = response.data.data.answerKegiatan[0].answer.li_da
        jumlahPelakuSeni.value = response.data.data.answerKegiatan[0].answer.jml_ps
        jumlahSanggarSeni.value = response.data.data.answerKegiatan[0].answer.jml_ss
        jumlahCagarBudaya.value = response.data.data.answerKegiatan[0].answer.jml_cb
        listCagarBudaya.value = response.data.data.answerKegiatan[0].answer.li_cb
        catatan.value = response.data.data.answerKegiatan[0].answer.catatan
      }
      role.value = response.data.role
    })
  } catch (error) {
    console.log(error)
  }
})






</script>
