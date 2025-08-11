<style scoped>
input {
    text-transform: uppercase;
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
        <v-app-bar-title>Survei Ekonomi Kerti Bali</v-app-bar-title>
    </v-app-bar>

    <v-sheet class="mx-auto">
        <v-form fast-fail @submit.prevent ref="form">
            <v-container>

                <v-card>
                    <v-tabs v-model="tab" bg-color="deep-orange-accent-2">
                        <v-tab value="about">Tentang</v-tab>
                        <v-tab value="blok_1">Blok I</v-tab>
                        <v-tab value="blok_2">Blok II</v-tab>
                        <v-tab value="blok_3">Blok III</v-tab>
                        <v-tab value="blok_4">Blok IV</v-tab>
                        <v-tab value="blok_5">Blok V</v-tab>
                    </v-tabs>

                    <v-card-text>
                        <v-tabs-window v-model="tab">
                            <v-tabs-window-item value="about">
                                <v-row no-gutters>
                                    <v-col cols="12">
                                        <v-sheet class="pa-2" color="deep-orange-lighten-4">
                                            <p><b>I. Tujuan survei:</b></p>
                                            <p>Survei ini bertujuan mengumpulkan data-data yang digunakan untuk:
                                            </p>
                                            <li>Menghasilkan indikator kunci kinerja perekonomian Indonesia
                                                seperti Produk
                                                Domestik Bruto (PDB)</li>
                                            <li>Menghasilkan indikator ekonomi jangka pendek utamanya untuk
                                                sektor
                                                manufaktur</li>
                                            <li>Mendukung perencanaan dan pengambilan kebijakan pemerintah</li>
                                            <br>
                                            <p><b>II. Dasar Hukum</b></p>

                                            <li>Undang-Undang No. 16 Tahun 1997 tentang Statistik.</li>
                                            <li>Peraturan Pemerintah RI No. 51 Tahun 1999 tentang
                                                Penyelenggaraan Statistik.
                                            </li>
                                            <li>Surat Edaran Gubernur Bali No. 14 Tahun 2025 Dukungan Kegiatan Statistik
                                                Pada Perusahaan/Non Perusahaan yang Beroperasi/Berdomisili di Provinsi
                                                Bali
                                            </li>
                                            <br>

                                            <h3>III. Kerahasiaan</h3>
                                            <p>Kerahasiaan data yang diberikan dijamin oleh Undang-Undang No. 16
                                                Tahun 1997
                                                tentang Statistik.</p>
                                            <br>
                                            <h4>Layanan Informasi:</h4>
                                            <p>
                                                Untuk bantuan pengisian daftar isian, dapat menghubungi:<br>
                                                <strong>Badan Pusat Statistik Provinsi Bali</strong><br>
                                                Telp. (0361) 238159 243696<br>
                                                WA. 081-810-5100<br>
                                                Email: kasieipd5100@bps.go.id
                                            </p>
                                            <br>
                                            <p><b><i>
                                                        Survei ini tidak ada hubungannya dengan pajak dan tidak
                                                        dipungut biaya
                                                        apapun</i>
                                                </b>
                                            </p>
                                        </v-sheet>
                                    </v-col>

                                </v-row>
                            </v-tabs-window-item>

                            <v-tabs-window-item value="blok_1">
                                <v-row no-gutters>
                                    <v-col cols="12">
                                        <v-sheet class="pa-2" color="deep-orange-lighten-2">
                                            <b>I. PENGENALAN TEMPAT</b>
                                        </v-sheet>
                                        <v-sheet class="pa-2" color="deep-orange-lighten-4">
                                            <v-select v-model="r101" label="101. Provinsi *" :items=r101_items
                                                item-title="nama" item-value="kode" variant="underlined"></v-select>
                                            <v-select v-model="r102" label="102. Kabupaten/Kota *" :items=r102_items
                                                item-title="nama" item-value="kode" variant="underlined"></v-select>
                                            <span>103. Nama Perusahaan</span>


                                            <v-text-field v-model="r103_a" label="103.a. Nama Legal *" type="text"
                                                clearable append-inner-icon="mdi-information-outline"
                                                placeholder="Contoh : Jaya, PT atau Karya, CV"
                                                variant="underlined"></v-text-field>

                                            <v-text-field v-model="r103_b" label="103.b. Nama Operational *" type="text"
                                                placeholder="Jika Ada" clearable
                                                append-inner-icon="mdi-information-outline"
                                                variant="underlined"></v-text-field>

                                            <v-text-field v-model="r103_sbr" label="103.sbr. Kode SBR" type="text"
                                                clearable append-inner-icon="mdi-information-outline"
                                                variant="underlined"></v-text-field>

                                            <v-textarea v-model="r104" label="104. Alamat Lengkap Perusahaan *"
                                                variant="underlined" :disabled="mode == 'view'"></v-textarea>

                                            <v-text-field v-model="r105" label="105. Nomor Telepon/Fax *" type="text"
                                                clearable append-inner-icon="mdi-information-outline"
                                                variant="underlined"></v-text-field>

                                            <v-text-field v-model="r106" label="106. Email *" type="text" clearable
                                                append-inner-icon="mdi-information-outline"
                                                variant="underlined"></v-text-field>
                                        </v-sheet>
                                    </v-col></v-row>
                            </v-tabs-window-item>

                            <v-tabs-window-item value="blok_2">
                                <v-row no-gutters>
                                    <v-col cols="12">
                                        <v-sheet class="pa-2" color="deep-orange-lighten-2">
                                            <b>II. KETERANGAN UMUM PERUSAHAAN</b>
                                        </v-sheet>
                                        <v-sheet class="pa-2" color="deep-orange-lighten-4">
                                            <span>201. Lapangan Usaha dari kegiatan utama *</span>
                                            <v-row>
                                                <v-col cols="12" sm="6">
                                                    <v-textarea v-model="r201_long"
                                                        label="Tuliskan kegiatan utama perusahaan saat ini"
                                                        variant="underlined" :disabled="mode == 'view'"></v-textarea>
                                                </v-col>
                                                <v-col cols="12" sm="6">
                                                    <v-text-field v-model="r201_kbli" label="5 Digit Kode KBLI"
                                                        type="number" clearable
                                                        append-inner-icon="mdi-information-outline"
                                                        variant="underlined"></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <span>202. Produk (barang/jasa) utama *</span>
                                            <v-row>
                                                <v-col cols="12" sm="6">
                                                    <v-textarea v-model="r202_long"
                                                        label="Uraian Produk (barang/jasa) utama" variant="underlined"
                                                        :disabled="mode == 'view'"></v-textarea>
                                                </v-col>
                                                <v-col cols="12" sm="6">
                                                    <v-text-field v-model="r202_kbki" label="5 Digit Kode KBKI"
                                                        type="number" clearable
                                                        append-inner-icon="mdi-information-outline"
                                                        variant="underlined"></v-text-field>
                                                </v-col>
                                            </v-row>


                                        </v-sheet>
                                    </v-col>
                                </v-row>
                            </v-tabs-window-item>

                            <v-tabs-window-item value="blok_3">
                                <v-row no-gutters>
                                    <v-col cols="12">
                                        <v-sheet class="pa-2" color="deep-orange-lighten-2">
                                            <b>III. Data Tahun 2024</b>
                                        </v-sheet>
                                        <v-sheet class="pa-2" color="deep-orange-lighten-4">
                                            <v-data-table :headers="headers"
                                                :hide-default-footer="data_items.length < 11" :items="data_items"
                                                v-model:search="search" multi-sort>
                                                <template v-slot:top>
                                                    <v-toolbar flat>
                                                        <v-toolbar-title>
                                                            <v-icon color="medium-emphasis" icon="mdi-file"
                                                                size="x-small" start></v-icon>
                                                            Data
                                                        </v-toolbar-title>
                                                        <v-spacer></v-spacer>
                                                        <v-text-field v-model="search" density="compact" label="Cari"
                                                            prepend-inner-icon="mdi-magnify" variant="solo-filled" flat
                                                            hide-details single-line></v-text-field>

                                                    </v-toolbar>
                                                </template>
                                                <template v-slot:item.actions="{ item }">
                                                    <div class="d-flex ga-2 justify-end">
                                                        <v-btn icon="mdi-pencil" size="x-small"
                                                            @click="edit_data_dialog(item)"></v-btn>
                                                    </div>
                                                </template>

                                                <template v-slot:no-data>
                                                    <v-btn prepend-icon="mdi-backup-restore" rounded="lg"
                                                        text="Reset data" variant="text" border @click="reset"></v-btn>
                                                </template>
                                            </v-data-table>
                                        </v-sheet>
                                    </v-col>
                                </v-row>


                            </v-tabs-window-item>

                            <v-tabs-window-item value="blok_4">
                                <v-row no-gutters>
                                    <v-col cols="12">
                                        <v-sheet class="pa-2" color="deep-orange-lighten-2">
                                            <b>IV. CATATAN, KOMENTAR, DAN WAKTU PENGISIAN KUESIONER</b>
                                        </v-sheet>
                                        <v-sheet class="pa-2" color="deep-orange-lighten-4">
                                            <span>401. Catatan</span>
                                            <li>Tuliskan keterangan tambahan yang perlu disampaikan untuk
                                                memperjelas isian jawaban atau catatan
                                                jika ada pertanyaan yang tidak bisa diisi.</li>
                                            <v-textarea v-model="r401" variant="underlined"
                                                :disabled="mode == 'view'"></v-textarea>
                                            <span>402. Komentar dan Saran</span>
                                            <li>Tuliskan segala informasi terkait dengan isian kuesioner ini
                                                seperti faktor yang menyebabkan
                                                perubahan signifikan pada perusahaan (inflasi, kompetisi,
                                                kebijakan pajak), kesulitan dalam
                                                pengisian, serta informasi lain yang tidak bisa dituliskan pada
                                                pertanyaan sebelumnya</li>
                                            <v-textarea v-model="r402_a" variant="underlined"
                                                :disabled="mode == 'view'"></v-textarea>
                                            <li>Tuliskan saran untuk perbaikan kuesioner ini</li>
                                            <v-textarea v-model="r402_b" variant="underlined"
                                                :disabled="mode == 'view'"></v-textarea>
                                        </v-sheet>
                                    </v-col>
                                </v-row>
                            </v-tabs-window-item>

                            <v-tabs-window-item value="blok_5">
                                <v-row no-gutters>
                                    <v-col cols="12">
                                        <v-sheet class="pa-2" color="deep-orange-lighten-2">
                                            <b>V. NARAHUBUNG</b>
                                        </v-sheet>
                                        <v-sheet class="pa-2" color="deep-orange-lighten-4">
                                            <span>501. Narahubung</span>
                                            <li>Tuliskan informasi narahubung yang bertanggung jawab dalam
                                                pengisian kuesioner, jika terdapat
                                                beberapa pertanyaan yang akan ditanyakan terkait informasi yang
                                                telah diberikan </li>
                                            <v-text-field v-model="r501_a" label="a. Nama" type="text" clearable
                                                append-inner-icon="mdi-information-outline"
                                                variant="underlined"></v-text-field>
                                            <v-text-field v-model="r501_b" label="b. Jabatan" type="text" clearable
                                                append-inner-icon="mdi-information-outline"
                                                variant="underlined"></v-text-field>
                                            <v-row>
                                                <v-col cols="12" md="6">
                                                    <v-text-field v-model="r501_c1" label="c. Telepon" type="text"
                                                        clearable append-inner-icon="mdi-information-outline"
                                                        variant="underlined"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="6">
                                                    <v-text-field v-model="r501_c2" label="c. Fax" type="text" clearable
                                                        append-inner-icon="mdi-information-outline"
                                                        variant="underlined"></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-text-field v-model="r501_d" label="d. Email" type="text" clearable
                                                append-inner-icon="mdi-information-outline"
                                                variant="underlined"></v-text-field>



                                        </v-sheet>
                                    </v-col>
                                </v-row>
                            </v-tabs-window-item>

                            <v-dialog v-model="data_dialog" width="auto">
                                <v-card prepend-icon="mdi-update" :title="dialog_title" min-width="400">
                                    <v-card-text>
                                        <span>301. Jumlah Nilai Produksi atau Pendapatan dari penjualan barang dan jasa
                                            perusahaan</span>
                                        <li>Mencatat semua pendapatan setelah dikurangi diskon dan retur
                                            penjualan</li>
                                        <li>Mencatat semua penjualan barang dan jasa dari seluruh provinsi
                                            tempat perusahaan beroperasi</li>
                                        <v-text-field v-model="r301" label="Nilai Produksi atau Pendapatan"
                                            type="number" clearable append-inner-icon="mdi-information-outline"
                                            hint="Dalam Ribu (000) Rupiah" variant="underlined"></v-text-field>
                                        <v-expansion-panels color="deep-orange-lighten-2">
                                            <v-expansion-panel>
                                                <v-expansion-panel-title>
                                                    <template v-slot:default="{ expanded }">
                                                        <v-row no-gutters>
                                                            <v-col class="d-flex justify-start" cols="12">
                                                                Petunjuk 301
                                                            </v-col>
                                                        </v-row>
                                                    </template>
                                                </v-expansion-panel-title>
                                                <v-expansion-panel-text>
                                                    <v-row>
                                                        <v-col cols="12" md="6">
                                                            <strong>Termasuk</strong>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Penjualan atau pemberian ke rekan bisnis
                                                                atau ke cabang luar negeri dari
                                                                perusahaan
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Penjualan ekspor (FOB-Free On Board)
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Pendapatan dari jasa konsultasi
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Pendapatan jasa perbaikan dan layanan
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Pendapatan dari kontrak, subkontrak, dan
                                                                komisi
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Pendapatan dari jasa manajemen
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Pendapatan sponsor
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Pendapatan dari sewa operasi
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Pendapatan dari biaya pengiriman dengan
                                                                invoiced (bukti) terpisah pada barang
                                                                yang dijual perusahaan ke pelanggan
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Komisi yang diperoleh dari penyediaan
                                                                layanan
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Pendapatan royalti (hak cipta, hak paten,
                                                                franchise, dll)
                                                            </p>
                                                        </v-col>
                                                        <v-col cols="12" md="6">
                                                            <strong>Tidak Termasuk</strong>
                                                            <p><v-icon color="red">mdi-close-circle
                                                                </v-icon>
                                                                Penjualan aset
                                                            </p>
                                                            <p><v-icon color="red">mdi-close-circle
                                                                </v-icon>
                                                                Pendapatan bunga (termasuk dalam rincian
                                                                302)
                                                            </p>
                                                            <p><v-icon color="red">mdi-close-circle
                                                                </v-icon>
                                                                Pendapatan dari sewa pembiayaan
                                                            </p>
                                                            <p><v-icon color="red">mdi-close-circle
                                                                </v-icon>
                                                                Pendapatan sewa/royalti Sumber Daya Alam
                                                                (termasuk dalam rincian 304)
                                                            </p>
                                                        </v-col>
                                                    </v-row>
                                                </v-expansion-panel-text>
                                            </v-expansion-panel>
                                        </v-expansion-panels>

                                        <br>
                                        <span>302. Pendapatan lainnya</span>
                                        <v-text-field v-model="r302" label="Nilai Pendapatan Lainnya" type="number"
                                            clearable hint="Dalam Ribu (000) Rupiah"
                                            append-inner-icon="mdi-information-outline"
                                            variant="underlined"></v-text-field>

                                        <v-expansion-panels color="deep-orange-lighten-2">
                                            <v-expansion-panel>
                                                <v-expansion-panel-title>
                                                    <template v-slot:default="{ expanded }">
                                                        <v-row no-gutters>
                                                            <v-col class="d-flex justify-start" cols="12">
                                                                Petunjuk 302
                                                            </v-col>
                                                        </v-row>
                                                    </template>
                                                </v-expansion-panel-title>
                                                <v-expansion-panel-text>
                                                    <v-row>
                                                        <v-col cols="12" md="6">
                                                            <strong>Termasuk</strong>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Laba/rugi bersih dari hasil revaluasi aset
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Laba/rugi dari penjualan aset tetap
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Keuntungan dari akuisisi
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Dana dari pemerintah (seperti subsidi,
                                                                hibah, dan lainnya)
                                                            </p>
                                                        </v-col>
                                                        <v-col cols="12" md="6">
                                                            <strong>Tidak Termasuk</strong>
                                                            <p><v-icon color="red">mdi-close-circle
                                                                </v-icon>
                                                                Pendapatan bunga
                                                            </p>
                                                            <p><v-icon color="red">mdi-close-circle
                                                                </v-icon>
                                                                Pendapatan dividen
                                                            </p>
                                                            <p><v-icon color="red">mdi-close-circle
                                                                </v-icon>
                                                                Pendapatan sewa/royalti sumber daya alam
                                                            </p>
                                                        </v-col>
                                                    </v-row>
                                                </v-expansion-panel-text>
                                            </v-expansion-panel>
                                        </v-expansion-panels>

                                        <br>
                                        <span>303. Total Pendapatan</span>
                                        <v-text-field v-model="r303" label="Nilai Total Pendapatan" type="number"
                                            clearable hint="Dalam Ribu (000) Rupiah"
                                            append-inner-icon="mdi-information-outline"
                                            variant="underlined"></v-text-field>

                                        <br>
                                        <span>304. Rata-Rata Banyaknya Pekerja</span>
                                        <v-text-field v-model="r304" label="Rata-Rata Banyaknya Pekerja" type="number"
                                            clearable append-inner-icon="mdi-information-outline"
                                            variant="underlined"></v-text-field>
                                        <v-expansion-panels color="deep-orange-lighten-2">
                                            <v-expansion-panel>
                                                <v-expansion-panel-title>
                                                    <template v-slot:default="{ expanded }">
                                                        <v-row no-gutters>
                                                            <v-col class="d-flex justify-start" cols="12">
                                                                Petunjuk 304
                                                            </v-col>
                                                        </v-row>
                                                    </template>
                                                </v-expansion-panel-title>
                                                <v-expansion-panel-text>
                                                    <v-row>
                                                        <v-col cols="12" md="6">
                                                            <strong>Termasuk</strong>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Orang yang dibayar dengan upah atau
                                                                gaji, serta dengan perjanjian retainer
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Pegawai/karyawan penuh dan paruh waktu
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Pegawai/karyawan permanen, dan kontrak
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Pegawai/karyawan yang absen dengan cuti
                                                                yang dibayar</p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Pemilik dan mitra kerja jika ini adalah
                                                                bisnis yang tidak berbadan hukum</p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Pegawai/karyawan magang</p>
                                                        </v-col>
                                                        <v-col cols="12" md="6">
                                                            <strong>Tidak Termasuk</strong>
                                                            <p><v-icon color="red">mdi-close-circle</v-icon>
                                                                Orang yang dibayar dengan sistem komisi
                                                            </p>
                                                            <p><v-icon color="red">mdi-close-circle</v-icon>
                                                                Pekerja yang bukan pegawai perusahaan
                                                                seperti konsultan dan subkontraktor yang
                                                                bukan karyawan pada
                                                                perusahaan ini
                                                            </p>
                                                            <p><v-icon color="red">mdi-close-circle</v-icon>
                                                                Sukarelawan
                                                            </p>
                                                        </v-col>
                                                    </v-row>
                                                </v-expansion-panel-text>
                                            </v-expansion-panel>
                                        </v-expansion-panels>

                                        <br>
                                        <span>305. Upah, Gaji, dan Jaminan sosial pemberi kerja (pensiun dan
                                            non-pensiun)</span>
                                        <li>Upah dan gaji dapat berupa pendapatan yang diterima secara tetap
                                            dan teratur atau pendapatan lain di
                                            luar upah/gaji (honorarium, lembur, dan sejenisnya) baik berupa
                                            uang maupun barang.</li>
                                        <li>Contoh non-pensiun: jaminan kesehatan, jaminan kecelakaan kerja,
                                            dsb</li>
                                        <v-text-field v-model="r305" label="Nilai Upah, Gaji, dan Jaminan Sosial"
                                            hint="Dalam Ribu (000) Rupiah" type="number" clearable
                                            append-inner-icon="mdi-information-outline"
                                            variant="underlined"></v-text-field>
                                        <v-expansion-panels color="deep-orange-lighten-2">
                                            <v-expansion-panel>
                                                <v-expansion-panel-title>
                                                    <template v-slot:default="{ expanded }">
                                                        <v-row no-gutters>
                                                            <v-col class="d-flex justify-start" cols="12">
                                                                Petunjuk 305
                                                            </v-col>
                                                        </v-row>
                                                    </template>
                                                </v-expansion-panel-title>
                                                <v-expansion-panel-text>
                                                    <v-row>
                                                        <v-col cols="12" md="6">
                                                            <strong>Termasuk</strong>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Komisi dan tips untuk karyawan
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Bonus
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Pembayaran cuti tahunan dan jenis cuti
                                                                lainnya
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Opsi saham karyawan
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Jaminan sosial pemberi kerja (pensiun dan
                                                                non-pensiun)
                                                            </p>
                                                        </v-col>
                                                        <v-col cols="12" md="6">
                                                            <strong>Tidak Termasuk</strong>
                                                            <p><v-icon color="red">mdi-close-circle
                                                                </v-icon>
                                                                Pekerja yang bukan pegawai perusahaan
                                                                seperti
                                                                konsultan, Bonus kontraktor, dan orang
                                                                yang dibayar dengan komisi
                                                            </p>
                                                            <p><v-icon color="red">mdi-close-circle
                                                                </v-icon>
                                                                Pajak penghasilan
                                                            </p>
                                                        </v-col>
                                                    </v-row>
                                                </v-expansion-panel-text>
                                            </v-expansion-panel>
                                        </v-expansion-panels>
                                        <br>
                                        <span>306. Penambahan Aset tetap (Kecuali Pembelian Tanah)</span>
                                        <li>Termasuk semua biaya yang dikapitalisasi, pembayaran progres
                                            kepada kontraktor untuk pekerjaan
                                            barang modal yang dilakukannya serta aset yang diperoleh melalui
                                            sewa pembiayaan.</li>
                                        <li>Silakan laporkan penambahan dan pelepasan untuk setiap jenis
                                            aset yang usia pakainya lebih dari satu
                                            tahun.</li>
                                        <li>Jika nilai yang tepat tidak tersedia, berikan perkiraan yang
                                            cermat.</li>
                                        <li>Untuk penambahan, pencatatan berdasarkan accrual basis ditambah
                                            barang modal dalam proses selama
                                            periode pencatatan.</li>
                                        <li>Untuk pelepasan, laporkan aset yang dilepas (dijual atau
                                            diberikan ke pihak lain) berdasarkan
                                            jenisnya (tidak termasuk aset yang habis masa pakai).</li>

                                        <v-text-field v-model="r306" label="Nilai Penambahan Aset tetap"
                                            hint="Dalam Ribu (000) Rupiah" type="number" clearable
                                            append-inner-icon="mdi-information-outline"
                                            variant="underlined"></v-text-field>
                                        <v-expansion-panels color="deep-orange-lighten-2">
                                            <v-expansion-panel>
                                                <v-expansion-panel-title>
                                                    <template v-slot:default="{ expanded }">
                                                        <v-row no-gutters>
                                                            <v-col class="d-flex justify-start" cols="12">
                                                                Petunjuk 306
                                                            </v-col>
                                                        </v-row>
                                                    </template>
                                                </v-expansion-panel-title>
                                                <v-expansion-panel-text>
                                                    <v-row>
                                                        <v-col cols="12" md="6">
                                                            <strong>Termasuk</strong>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Aset yang diperoleh melalui sewa pembiayaan
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Biaya aset kapital yang dikembangkan sendiri
                                                                oleh pegawai perusahaan/organisasi
                                                                ini
                                                            </p>

                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Gedung dan bangunan
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Mesin dan perlengkapan
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Kendaraan
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Perlengkapan lainnya
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Hewan dan tanaman yang menghasilkan berulang
                                                            </p>
                                                            <p><v-icon color="green">mdi-check-circle</v-icon>
                                                                Produk kekayaan intelektual
                                                            </p>
                                                        </v-col>
                                                        <v-col cols="12" md="6">
                                                            <strong>Tidak Termasuk</strong>
                                                            <p><v-icon color="red">mdi-close-circle
                                                                </v-icon>
                                                                Aset yang berdasar sewa operasi
                                                            </p>
                                                            <p><v-icon color="red">mdi-close-circle</v-icon>
                                                                Tanah
                                                            </p>
                                                        </v-col>
                                                    </v-row>
                                                </v-expansion-panel-text>

                                            </v-expansion-panel>
                                        </v-expansion-panels>
                                        <br>
                                        <span>307. Biaya Produksi (Pemakaian Bahan Baku dan Penolong)</span>
                                        <v-text-field v-model="r307"
                                            label="Biaya Produksi (Pemakaian Bahan Baku dan Penolong)"
                                            hint="Dalam Ribu (000) Rupiah" type="number" clearable
                                            append-inner-icon="mdi-information-outline"
                                            variant="underlined"></v-text-field>
                                        <br>

                                        <span>308. Biaya Operasional (air, listrik, gas, pemeliharaan, biaya
                                            angkutan)</span>
                                        <v-text-field v-model="r308"
                                            label="Biaya Operasional (air, listrik, gas, pemeliharaan, biaya angkutan)"
                                            hint="Dalam Ribu (000) Rupiah" type="number" clearable
                                            append-inner-icon="mdi-information-outline"
                                            variant="underlined"></v-text-field>
                                        <br>
                                        <v-checkbox v-model="is_done"
                                            label="Tandai selesai pelaporan bulanan atau triwulan"></v-checkbox>



                                    </v-card-text>
                                    <template v-slot:actions class="justify-end">
                                        <v-btn color="red" text="Batal" @click="data_dialog = false"></v-btn>
                                        <v-btn text="Ok" color="green" @click="edit_data()"></v-btn>
                                    </template>
                                </v-card>
                            </v-dialog>
                            <br>
                            <v-row justify="end"> 
                                <v-col cols="12" sm="4">
                                    <v-btn class="pd-2" type="submit" block rounded="lg" color="deep-orange-lighten-2"
                                        @click="kirim_data(type=1)">Simpan</v-btn>
                                </v-col>
                            </v-row>
                        </v-tabs-window>
                    </v-card-text>

                </v-card>

            </v-container>
        </v-form>
    </v-sheet>


    <Footer></Footer>
</template>
<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2'
import axios from 'axios';


const route = useRoute(); // Mengakses objek route saat ini
const router = useRouter()
const token = route.query.token
const id = route.query.id
const params = ref({})


//untuk kues
const apiUrl = import.meta.env.VITE_API_URL;
const user = JSON.parse(localStorage.getItem('user'))

//for tab
const tab = ref(null)

const mode = route.query.mode

const form = ref()

//variable blok 1
const tahun = ref()
const periode = ref()
const r101 = ref()
const r101_items = ref([{ kode: '51', nama: '51 - BALI' }])
const r102 = ref()
const r102_items = ref([
    { kode: '5101', nama: '5101 - JEMBRANA' },
    { kode: '5102', nama: '5102 - TABANAN' },
    { kode: '5103', nama: '5103 - BADUNG' },
    { kode: '5104', nama: '5104 - GIANYAR' },
    { kode: '5105', nama: '5105 - KLUNGKUNG' },
    { kode: '5106', nama: '5106 - BANGLI' },
    { kode: '5107', nama: '5107 - KARANGASEM' },
    { kode: '5108', nama: '5108 - BULELENG' },
    { kode: '5171', nama: '5171 - DENPASAR' },
])

const r103_sbr = ref()
const r103_a = ref()
const r103_b = ref()

const r104 = ref()
const r105 = ref()
const r106 = ref()

//variable blok 2
const r201_long = ref()
const r201_kbli = ref()
const r202_long = ref()
const r202_kbki = ref()


//variable tabel 
const data_dialog = ref(false)
const dialog_title = ref('Periode ')
const data_items = ref([
    { "periode": "Triwulan I", "r301": "", "r302": "", "r303": "", "r304": "", "r305": "", "r306": "", "r307": "", "r308": "", "tahun": "2024", "is_done": false },
    { "periode": "Triwulan II", "r301": "", "r302": "", "r303": "", "r304": "", "r305": "", "r306": "", "r307": "", "r308": "", "tahun": "2024", "is_done": false },
    { "periode": "Triwulan III", "r301": "", "r302": "", "r303": "", "r304": "", "r305": "", "r306": "", "r307": "", "r308": "", "tahun": "2024", "is_done": false },
    { "periode": "Triwulan IV", "r301": "", "r302": "", "r303": "", "r304": "", "r305": "", "r306": "", "r307": "", "r308": "", "tahun": "2024", "is_done": false },
    { "periode": "Januari", "r301": "", "r302": "", "r303": "", "r304": "", "r305": "", "r306": "", "r307": "", "r308": "", "tahun": "2025", "is_done": false },
    { "periode": "Februari", "r301": "", "r302": "", "r303": "", "r304": "", "r305": "", "r306": "", "r307": "", "r308": "", "tahun": "2025", "is_done": false },
    { "periode": "Maret", "r301": "", "r302": "", "r303": "", "r304": "", "r305": "", "r306": "", "r307": "", "r308": "", "tahun": "2025", "is_done": false },
    { "periode": "April", "r301": "", "r302": "", "r303": "", "r304": "", "r305": "", "r306": "", "r307": "", "r308": "", "tahun": "2025", "is_done": false },
    { "periode": "Mei", "r301": "", "r302": "", "r303": "", "r304": "", "r305": "", "r306": "", "r307": "", "r308": "", "tahun": "2025", "is_done": false },
    { "periode": "Juni", "r301": "", "r302": "", "r303": "", "r304": "", "r305": "", "r306": "", "r307": "", "r308": "", "tahun": "2025", "is_done": false },
    { "periode": "Juli", "r301": "", "r302": "", "r303": "", "r304": "", "r305": "", "r306": "", "r307": "", "r308": "", "tahun": "2025", "is_done": false },
    { "periode": "Agustus", "r301": "", "r302": "", "r303": "", "r304": "", "r305": "", "r306": "", "r307": "", "r308": "", "tahun": "2025", "is_done": false },
    { "periode": "September", "r301": "", "r302": "", "r303": "", "r304": "", "r305": "", "r306": "", "r307": "", "r308": "", "tahun": "2025", "is_done": false },
    { "periode": "Oktober", "r301": "", "r302": "", "r303": "", "r304": "", "r305": "", "r306": "", "r307": "", "r308": "", "tahun": "2025", "is_done": false },
    { "periode": "November", "r301": "", "r302": "", "r303": "", "r304": "", "r305": "", "r306": "", "r307": "", "r308": "", "tahun": "2025", "is_done": false },
    { "periode": "Desember", "r301": "", "r302": "", "r303": "", "r304": "", "r305": "", "r306": "", "r307": "", "r308": "", "tahun": "2025", "is_done": false },
])
const headers = ref([
    { "title": "Tahun", "key": "tahun", "align": 'start' },
    { "title": "Periode", "key": "periode", "align": 'start' },
    { "title": "Aksi", "key": "actions", "value": "Aksi" },
    { "title": "Jumlah Nilai Produksi/Pendapatan dari Penjualan Barang dan Jasa", "key": "r301", "align": 'end' },
    { "title": "Pendapatan Lainnya", "key": "r302", "align": 'end' },
    { "title": "Total Pendapatan", "key": "r303", "align": 'end' },
    { "title": "Rata-Rata Banyaknya Pekerja", "key": "r304", "align": 'end' },
    { "title": "Total Upah, Gaji dan Jaminan Sosial", "key": "r305", "align": 'end' },
    { "title": "Penambahan Aset Tetap (Kecuali Pembelian Tanah)", "key": "r306", "align": 'end' },
    { "title": "Biaya Produksi (Pemakaian Bahan Baku dan Penolong)", "key": "r307", "align": 'end' },
    { "title": "Biaya Operasional (air, listrik, gas, pemeliharaan, biaya angkutan)", "key": "r308", "align": 'end' },
])


const edit_data_dialog = (item) => {
    try {
        data_dialog.value = true
        dialog_title.value = item.tahun + " Periode " + item.periode
        tahun.value = item.tahun
        periode.value = item.periode
        r301.value = item.r301
        r302.value = item.r302
        r303.value = item.r303
        r304.value = item.r304
        r305.value = item.r305
        r306.value = item.r306
        r307.value = item.r307
        r308.value = item.r308
        is_done.value = item.is_done
    } catch (error) {

    }

}

const edit_data = async () => {
    //proses masukin ke tabel dulu :
    data_items.value.forEach((element, index) => {
        if (element.periode == periode.value && element.tahun == tahun.value) {
            data_items.value[index].r301 = r301.value
            data_items.value[index].r302 = r302.value
            data_items.value[index].r303 = r303.value
            data_items.value[index].r304 = r304.value
            data_items.value[index].r305 = r305.value
            data_items.value[index].r306 = r306.value
            data_items.value[index].r307 = r307.value
            data_items.value[index].r308 = r308.value
            data_items.value[index].is_done = is_done.value
        }

    });
    data_dialog.value=false
    await kirim_data()
}

const kirim_data = async (type) => {
    await form.value.validate().then(async (result) => {
        params.value.catatan = r401.value
        params.value.status = 'draft'
        const data = {
            r101: r101.value,
            r102: r102.value,
            r103_sbr: r103_sbr.value,
            r103_a: r103_a.value,
            r103_b: r103_b.value,
            r104: r104.value,
            r105: r105.value,
            r106: r106.value,
            r201_long: r201_long.value,
            r201_kbli: r201_kbli.value,
            r202_long: r202_long.value,
            r202_kbki: r202_kbki.value,
            data_items: data_items.value,
            r401: r401.value,
            r402_a: r402_a.value,
            r402_b: r402_b.value,
            r501_a: r501_a.value,
            r501_b: r501_b.value,
            r501_c1: r501_c1.value,
            r501_c2: r501_c2.value,
            r501_d: r501_d.value
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
                }).then(response =>{
                    if(type){
                        router.push('/success?id='+params.id+'&token='+params.token+'&path='+route.path)
                    }
                })
            }
        })
    })
}


const r203 = ref()

//variable blok 3
const r301 = ref()
const r302 = ref()
const r303 = ref()
const r304 = ref()
const r305 = ref()
const r306 = ref()
const r307 = ref()
const r308 = ref()
const is_done = ref(false)




//variable blok 4
const r401 = ref()
const r402_a = ref()
const r402_b = ref()




//variable blok 5
const r501_a = ref()
const r501_b = ref()
const r501_c1 = ref()
const r501_c2 = ref()
const r501_d = ref()

onMounted(async () => {
    if (!id && !token) {
        Swal.fire({
            title: "Opps!",
            text: "Anda mengakses halaman yang salah, silakan tekan OK!",
            icon: "error"
        }).then((result) => {
            router.push('/')
        });
    } else {
        params.value.id = id
        params.value.token = token
        await axios.get(`${apiUrl}/data/cawi?id=${id}&token=${token}`, {
        }).then(response => {
            if (response.data.code == 200) {
                console.log(response.data.data.answerKegiatan[0].answer)
                if (response.data.data.answerKegiatan[0].answer.r101) {
                    r101.value = response.data.data.answerKegiatan[0].answer.r101
                }
                if (response.data.data.answerKegiatan[0].answer.r102) {
                    r102.value = response.data.data.answerKegiatan[0].answer.r102
                }
                if (response.data.data.answerKegiatan[0].answer.r103_sbr) {
                    r103_sbr.value = response.data.data.answerKegiatan[0].answer.r103_sbr
                }
                if (response.data.data.answerKegiatan[0].answer.r103_a) {
                    r103_a.value = response.data.data.answerKegiatan[0].answer.r103_a
                } else {
                    r103_a.value = response.data.data.nama
                }
                if (response.data.data.answerKegiatan[0].answer.r103_b) {
                    r103_b.value = response.data.data.answerKegiatan[0].answer.r103_b
                }
                if (response.data.data.answerKegiatan[0].answer.r104) {
                    r104.value = response.data.data.answerKegiatan[0].answer.r104
                }
                if (response.data.data.answerKegiatan[0].answer.r105) {
                    r105.value = response.data.data.answerKegiatan[0].answer.r105
                }
                if (response.data.data.answerKegiatan[0].answer.r106) {
                    r106.value = response.data.data.answerKegiatan[0].answer.r106
                }
                if (response.data.data.answerKegiatan[0].answer.r201_long) {
                    r201_long.value = response.data.data.answerKegiatan[0].answer.r201_long
                }
                if (response.data.data.answerKegiatan[0].answer.r201_kbli) {
                    r201_kbli.value = response.data.data.answerKegiatan[0].answer.r201_kbli
                }
                if (response.data.data.answerKegiatan[0].answer.r202_long) {
                    r202_long.value = response.data.data.answerKegiatan[0].answer.r202_long
                }
                if (response.data.data.answerKegiatan[0].answer.r202_kbki) {
                    r202_kbki.value = response.data.data.answerKegiatan[0].answer.r202_kbki
                }
                if (response.data.data.answerKegiatan[0].answer.data_items) {
                    data_items.value = response.data.data.answerKegiatan[0].answer.data_items
                }
                if (response.data.data.answerKegiatan[0].answer.r401) {
                    r401.value = response.data.data.answerKegiatan[0].answer.r401
                }
                if (response.data.data.answerKegiatan[0].answer.r402_a) {
                    r402_a.value = response.data.data.answerKegiatan[0].answer.r402_a
                }
                if (response.data.data.answerKegiatan[0].answer.r402_b) {
                    r402_b.value = response.data.data.answerKegiatan[0].answer.r402_b
                }
                if (response.data.data.answerKegiatan[0].answer.r501_a) {
                    r501_a.value = response.data.data.answerKegiatan[0].answer.r501_a
                }
                if (response.data.data.answerKegiatan[0].answer.r501_b) {
                    r501_b.value = response.data.data.answerKegiatan[0].answer.r501_b
                }
                if (response.data.data.answerKegiatan[0].answer.r501_c1) {
                    r501_c1.value = response.data.data.answerKegiatan[0].answer.r501_c1
                }
                if (response.data.data.answerKegiatan[0].answer.r501_c2) {
                    r501_c2.value = response.data.data.answerKegiatan[0].answer.r501_c2
                }
                if (response.data.data.answerKegiatan[0].answer.r501_d) {
                    r501_d.value = response.data.data.answerKegiatan[0].answer.r501_d
                }
            } else {

            }
        }).catch(error => {
            Swal.fire({
                title: "Oops!",
                text: error.response.data.message,
                icon: "error"
            }).then((result) => {
                router.push('/')
            });
        })
    }
})

</script>