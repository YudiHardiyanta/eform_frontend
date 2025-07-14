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
                        <v-card>
                            <v-tabs v-model="tab" bg-color="deep-orange-accent-2">
                                <v-tab value="about">Tentang</v-tab>
                                <v-tab value="blok_1">Blok I</v-tab>
                                <v-tab value="blok_2">Blok II</v-tab>
                                <v-tab value="blok_3">Blok III</v-tab>
                                <v-tab value="blok_4">Blok IV</v-tab>
                                <v-tab value="blok_5">Blok V</v-tab>
                                <v-tab value="blok_6">Blok VI</v-tab>
                                <v-tab value="blok_7">Blok VII</v-tab>
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
                                                    <br>

                                                    <h3>III. Kerahasiaan</h3>
                                                    <p>Kerahasiaan data yang diberikan dijamin oleh Undang-Undang No. 16
                                                        Tahun 1997
                                                        tentang Statistik.</p>
                                                    <br>
                                                    <h4>Layanan Informasi:</h4>
                                                    <p>
                                                        Untuk bantuan pengisian daftar isian, dapat menghubungi:<br>
                                                        <strong>Bagian Transformasi Statistik, Biro Bina Program – Badan
                                                            Pusat
                                                            Statistik</strong><br>
                                                        Telp. 021-3841195, 3842508, 3810294 – Ext. 2140-2143<br>
                                                        Email: transformasi.statistik@bps.go.id
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
                                                    <v-select v-model="r101" label="101. Provinsi" :items=r101_items
                                                        item-title="nama" item-value="kode"
                                                        variant="underlined"></v-select>
                                                    <v-select v-model="r102" label="102. Kabupaten/Kota"
                                                        :items=r102_items item-title="nama" item-value="kode"
                                                        variant="underlined"></v-select>
                                                    <span>103. Nama Perusahaan</span>
                                                    <v-text-field v-model="r103_sbr" label="103.sbr. Kode SBR"
                                                        type="text" clearable
                                                        append-inner-icon="mdi-information-outline"
                                                        variant="underlined"></v-text-field>

                                                    <v-text-field v-model="r103_a" label="103.a. Nama Legal" type="text"
                                                        clearable append-inner-icon="mdi-information-outline"
                                                        placeholder="Contoh : Jaya, PT atau Karya, CV"
                                                        variant="underlined"></v-text-field>

                                                    <v-text-field v-model="r103_b" label="103.b. Nama Operational"
                                                        type="text" placeholder="Jika Ada" clearable
                                                        append-inner-icon="mdi-information-outline"
                                                        variant="underlined"></v-text-field>

                                                    <v-textarea v-model="r104" label="104. Alamat Lengkap Perusahaan"
                                                        variant="underlined" :disabled="mode == 'view'"></v-textarea>

                                                    <v-text-field v-model="r105" label="105. Nomor Telepon/Fax"
                                                        type="text" clearable
                                                        append-inner-icon="mdi-information-outline"
                                                        variant="underlined"></v-text-field>

                                                    <v-text-field v-model="r106" label="106. Email" type="text"
                                                        clearable append-inner-icon="mdi-information-outline"
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
                                                    <span>201. Lapangan Usaha dari kegiatan utama</span>
                                                    <v-row>
                                                        <v-col cols="12" sm="6">
                                                            <v-textarea v-model="r201_long"
                                                                label="Tuliskan kegiatan utama perusahaan saat ini"
                                                                variant="underlined"
                                                                :disabled="mode == 'view'"></v-textarea>
                                                        </v-col>
                                                        <v-col cols="12" sm="6">
                                                            <v-text-field v-model="r201_kbli" label="5 Digit Kode KBLI"
                                                                type="number" clearable
                                                                append-inner-icon="mdi-information-outline"
                                                                variant="underlined"></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                    <span>202. Produk (barang/jasa) utama</span>
                                                    <v-row>
                                                        <v-col cols="12" sm="6">
                                                            <v-textarea v-model="r202_long"
                                                                label="Uraian Produk (barang/jasa) utama"
                                                                variant="underlined"
                                                                :disabled="mode == 'view'"></v-textarea>
                                                        </v-col>
                                                        <v-col cols="12" sm="6">
                                                            <v-text-field v-model="r202_kbki" label="5 Digit Kode KBKI"
                                                                type="number" clearable
                                                                append-inner-icon="mdi-information-outline"
                                                                variant="underlined"></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                    <span>203. Orang yang bekerja untuk perusahaan</span>
                                                    <v-text-field v-model="r203" label="Rata-rata dalam 1 bulan"
                                                        type="number" clearable
                                                        append-inner-icon="mdi-information-outline"
                                                        variant="underlined"></v-text-field>
                                                    <v-expansion-panels color="deep-orange-lighten-2">
                                                        <v-expansion-panel>
                                                            <v-expansion-panel-title>
                                                                <template v-slot:default="{ expanded }">
                                                                    <v-row no-gutters>
                                                                        <v-col class="d-flex justify-start" cols="12">
                                                                            Petunjuk 203
                                                                        </v-col>
                                                                    </v-row>
                                                                </template>
                                                            </v-expansion-panel-title>
                                                            <v-expansion-panel-text>
                                                                <v-row>
                                                                    <v-col cols="12" md="6">
                                                                        <strong>Termasuk</strong>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Orang yang dibayar dengan upah atau
                                                                            gaji, serta dengan perjanjian retainer
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Pegawai/karyawan penuh dan paruh waktu
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Pegawai/karyawan permanen, dan kontrak
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Pegawai/karyawan yang absen dengan cuti
                                                                            yang dibayar</p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Pemilik dan mitra kerja jika ini adalah
                                                                            bisnis yang tidak berbadan hukum</p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
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

                                                </v-sheet>
                                            </v-col>
                                        </v-row>
                                    </v-tabs-window-item>

                                    <v-tabs-window-item value="blok_3">
                                        <v-row no-gutters>
                                            <v-col cols="12">
                                                <v-sheet class="pa-2" color="deep-orange-lighten-2">
                                                    <b>III. ITEM PENDATAAN</b>
                                                </v-sheet>
                                                <v-sheet class="pa-2" color="deep-orange-lighten-4">
                                                    <span>301. Pendapatan dari penjualan barang dan jasa
                                                        perusahaan</span>
                                                    <li>Mencatat semua pendapatan setelah dikurangi diskon dan retur
                                                        penjualan</li>
                                                    <li>Mencatat semua penjualan barang dan jasa dari seluruh provinsi
                                                        tempat perusahaan beroperasi</li>
                                                    <v-text-field v-model="r301" label="Nilai dalam satu bulan"
                                                        type="number" clearable
                                                        append-inner-icon="mdi-information-outline"
                                                        variant="underlined"></v-text-field>
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
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Penjualan atau pemberian ke rekan bisnis
                                                                            atau ke cabang luar negeri dari
                                                                            perusahaan
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Penjualan ekspor (FOB-Free On Board)
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Pendapatan dari jasa konsultasi
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Pendapatan jasa perbaikan dan layanan
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Pendapatan dari kontrak, subkontrak, dan
                                                                            komisi
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Pendapatan dari jasa manajemen
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Pendapatan sponsor
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Pendapatan dari sewa operasi
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Pendapatan dari biaya pengiriman dengan
                                                                            invoiced (bukti) terpisah pada barang
                                                                            yang dijual perusahaan ke pelanggan
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Komisi yang diperoleh dari penyediaan
                                                                            layanan
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
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
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Laba/rugi bersih dari hasil revaluasi aset
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Laba/rugi dari penjualan aset tetap
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Keuntungan dari akuisisi
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
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
                                                    <v-text-field v-model="r302" label="Nilai dalam satu bulan"
                                                        type="number" clearable hint="Dalam Ribu (000) Rupiah"
                                                        append-inner-icon="mdi-information-outline"
                                                        variant="underlined"></v-text-field>
                                                    <span>Tuliskan 2 pendapatan lainnya yang terbesar selama satu
                                                        bulan</span>
                                                    <v-row>
                                                        <v-col cols="12" sm="6">
                                                            <v-text-field v-model="r302_1_text"
                                                                label="Nama Pendapatan Lainnya ke-1" type="text"
                                                                clearable append-inner-icon="mdi-information-outline"
                                                                variant="underlined"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6">
                                                            <v-text-field v-model="r302_1_value"
                                                                label="Nilai Pendapatan Lainnya ke-1 dalam satu bulan"
                                                                hint="Dalam Ribu (000) Rupiah" type="number" clearable
                                                                append-inner-icon="mdi-information-outline"
                                                                variant="underlined"></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row>
                                                        <v-col cols="12" sm="6">
                                                            <v-text-field v-model="r302_2_text"
                                                                label="Nama Pendapatan Lainnya ke-2" type="text"
                                                                clearable append-inner-icon="mdi-information-outline"
                                                                variant="underlined"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6">
                                                            <v-text-field v-model="r302_2_value"
                                                                label="Nilai Pendapatan Lainnya ke-2 dalam satu bulan"
                                                                type="number" clearable hint="Dalam Ribu (000) Rupiah"
                                                                append-inner-icon="mdi-information-outline"
                                                                variant="underlined"></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                    <v-text-field v-model="r303" label="303. Total Pendapatan"
                                                        type="number" clearable
                                                        append-inner-icon="mdi-information-outline"
                                                        hint="Jumlah rincian pendapatan utama dan pendapatan lainnya Dalam Ribu (000) Rupiah"
                                                        variant="underlined"></v-text-field>
                                                </v-sheet>
                                            </v-col>
                                        </v-row>
                                    </v-tabs-window-item>

                                    <v-tabs-window-item value="blok_4">
                                        <v-row no-gutters>
                                            <v-col cols="12">
                                                <v-sheet class="pa-2" color="deep-orange-lighten-2">
                                                    <b>IV. PENGELUARAN UNTUK TENAGA KERJA</b>
                                                </v-sheet>
                                                <v-sheet class="pa-2" color="deep-orange-lighten-4">
                                                    <span>401. Upah, Gaji, dan Jaminan sosial pemberi kerja (pensiun dan
                                                        non-pensiun)</span>
                                                    <li>Upah dan gaji dapat berupa pendapatan yang diterima secara tetap
                                                        dan teratur atau pendapatan lain di
                                                        luar upah/gaji (honorarium, lembur, dan sejenisnya) baik berupa
                                                        uang maupun barang.</li>
                                                    <li>Contoh non-pensiun: jaminan kesehatan, jaminan kecelakaan kerja,
                                                        dsb</li>
                                                    <v-expansion-panels color="deep-orange-lighten-2">
                                                        <v-expansion-panel>
                                                            <v-expansion-panel-title>
                                                                <template v-slot:default="{ expanded }">
                                                                    <v-row no-gutters>
                                                                        <v-col class="d-flex justify-start" cols="12">
                                                                            Petunjuk 401
                                                                        </v-col>
                                                                    </v-row>
                                                                </template>
                                                            </v-expansion-panel-title>
                                                            <v-expansion-panel-text>
                                                                <v-row>
                                                                    <v-col cols="12" md="6">
                                                                        <strong>Termasuk</strong>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Komisi dan tips untuk karyawan
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Bonus
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Pembayaran cuti tahunan dan jenis cuti
                                                                            lainnya
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Opsi saham karyawan
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
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
                                                    <v-text-field v-model="r401" label="Nilai dalam satu bulan"
                                                        hint="Dalam Ribu (000) Rupiah" type="number" clearable
                                                        append-inner-icon="mdi-information-outline"
                                                        variant="underlined"></v-text-field>
                                                </v-sheet>

                                            </v-col>
                                        </v-row>
                                    </v-tabs-window-item>

                                    <v-tabs-window-item value="blok_5">
                                        <v-row no-gutters>
                                            <v-col cols="12">
                                                <v-sheet class="pa-2" color="deep-orange-lighten-2">
                                                    <b>V. PENAMBAHAN DAN PELEPASAN ASET TETAP</b>
                                                </v-sheet>
                                                <v-sheet class="pa-2" color="deep-orange-lighten-4">
                                                    <span>501. Upah, Gaji, dan Jaminan sosial pemberi kerja (pensiun dan
                                                        non-pensiun).</span>
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

                                                    <v-expansion-panels color="deep-orange-lighten-2">
                                                        <v-expansion-panel>
                                                            <v-expansion-panel-title>
                                                                <template v-slot:default="{ expanded }">
                                                                    <v-row no-gutters>
                                                                        <v-col class="d-flex justify-start" cols="12">
                                                                            Petunjuk 501
                                                                        </v-col>
                                                                    </v-row>
                                                                </template>
                                                            </v-expansion-panel-title>
                                                            <v-expansion-panel-text>
                                                                <v-row>
                                                                    <v-col cols="12" md="6">
                                                                        <strong>Termasuk</strong>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Aset yang diperoleh melalui sewa pembiayaan
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Biaya aset kapital yang dikembangkan sendiri
                                                                            oleh pegawai perusahaan/organisasi
                                                                            ini
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Tanah
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Gedung dan bangunan
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Mesin dan perlengkapan
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Kendaraan
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Perlengkapan lainnya
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Hewan dan tanaman yang menghasilkan berulang
                                                                        </p>
                                                                        <p><v-icon
                                                                                color="green">mdi-check-circle</v-icon>
                                                                            Produk kekayaan intelektual
                                                                        </p>
                                                                    </v-col>
                                                                    <v-col cols="12" md="6">
                                                                        <strong>Tidak Termasuk</strong>
                                                                        <p><v-icon color="red">mdi-close-circle
                                                                            </v-icon>
                                                                            Aset yang berdasar sewa operasi
                                                                        </p>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-expansion-panel-text>

                                                        </v-expansion-panel>
                                                    </v-expansion-panels>
                                                    <br>
                                                    <span>501.a. Penambahan</span>
                                                    <v-text-field v-model="r501_a" label="Nilai dalam satu bulan"
                                                        hint="Dalam Ribu (000) Rupiah" type="number" clearable
                                                        append-inner-icon="mdi-information-outline"
                                                        variant="underlined"></v-text-field>
                                                    <span>501.b. Pelepasan</span>
                                                    <v-text-field v-model="r501_b" label="Nilai dalam satu bulan"
                                                        hint="Dalam Ribu (000) Rupiah" type="number" clearable
                                                        append-inner-icon="mdi-information-outline"
                                                        variant="underlined"></v-text-field>
                                                </v-sheet>
                                            </v-col>
                                        </v-row>
                                    </v-tabs-window-item>

                                    <v-tabs-window-item value="blok_6">
                                        <v-row no-gutters>
                                            <v-col cols="12">
                                                <v-sheet class="pa-2" color="deep-orange-lighten-2">
                                                    <b>VI. CATATAN, KOMENTAR, DAN WAKTU PENGISIAN KUESIONER</b>
                                                </v-sheet>
                                                <v-sheet class="pa-2" color="deep-orange-lighten-4">
                                                    <span>601. Catatan</span>
                                                    <li>Tuliskan keterangan tambahan yang perlu disampaikan untuk
                                                        memperjelas isian jawaban atau catatan
                                                        jika ada pertanyaan yang tidak bisa diisi.</li>
                                                    <v-textarea v-model="r601" variant="underlined"
                                                        :disabled="mode == 'view'"></v-textarea>
                                                    <span>602. Komentar dan Saran</span>
                                                    <li>Tuliskan segala informasi terkait dengan isian kuesioner ini
                                                        seperti faktor yang menyebabkan
                                                        perubahan signifikan pada perusahaan (inflasi, kompetisi,
                                                        kebijakan pajak), kesulitan dalam
                                                        pengisian, serta informasi lain yang tidak bisa dituliskan pada
                                                        pertanyaan sebelumnya</li>
                                                    <v-textarea v-model="r602_a" variant="underlined"
                                                        :disabled="mode == 'view'"></v-textarea>
                                                    <li>Tuliskan saran untuk perbaikan kuesioner ini</li>
                                                    <v-textarea v-model="r602_b" variant="underlined"
                                                        :disabled="mode == 'view'"></v-textarea>
                                                    <span>603. Estimasi waktu yang diperlukan dalam mengisi
                                                        kuesioner</span>
                                                    <li>Waktu yang diperlukan untuk membaca instruksi, menjawab
                                                        pertanyaan, dan mendapatkan informasi</li>
                                                    <li>Waktu yang diperlukan untuk mengumpulkan dan menyediakan
                                                        informasi ini</li>
                                                    <v-row>
                                                        <v-col cols="4">
                                                            <v-text-field v-model="r603_a" label="Hari" type="number"
                                                                clearable append-inner-icon="mdi-information-outline"
                                                                variant="underlined"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="4">
                                                            <v-text-field v-model="r603_b" label="Jam" type="number"
                                                                clearable append-inner-icon="mdi-information-outline"
                                                                variant="underlined"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="4">
                                                            <v-text-field v-model="r603_c" label="Menit" type="number"
                                                                clearable append-inner-icon="mdi-information-outline"
                                                                variant="underlined"></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                </v-sheet>
                                            </v-col>
                                        </v-row>
                                    </v-tabs-window-item>

                                    <v-tabs-window-item value="blok_7">
                                        <v-row no-gutters>
                                            <v-col cols="12">
                                                <v-sheet class="pa-2" color="deep-orange-lighten-2">
                                                    <b>VII. NARAHUBUNG DAN KETERANGAN PENGESAHAN</b>
                                                </v-sheet>
                                                <v-sheet class="pa-2" color="deep-orange-lighten-4">
                                                    <span>701. Narahubung</span>
                                                    <li>Tuliskan informasi narahubung yang bertanggung jawab dalam
                                                        pengisian kuesioner, jika terdapat
                                                        beberapa pertanyaan yang akan ditanyakan terkait informasi yang
                                                        telah diberikan </li>
                                                    <v-text-field v-model="r701_a" label="a. Nama" type="text" clearable
                                                        append-inner-icon="mdi-information-outline"
                                                        variant="underlined"></v-text-field>
                                                    <v-text-field v-model="r701_b" label="b. Jabatan" type="text"
                                                        clearable append-inner-icon="mdi-information-outline"
                                                        variant="underlined"></v-text-field>
                                                    <v-row>
                                                        <v-col cols="12" md="6">
                                                            <v-text-field v-model="r701_c1" label="c. Telepon"
                                                                type="text" clearable
                                                                append-inner-icon="mdi-information-outline"
                                                                variant="underlined"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="6">
                                                            <v-text-field v-model="r701_c2" label="c. Fax" type="text"
                                                                clearable append-inner-icon="mdi-information-outline"
                                                                variant="underlined"></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                    <v-text-field v-model="r701_d" label="d. Email" type="text"
                                                        clearable append-inner-icon="mdi-information-outline"
                                                        variant="underlined"></v-text-field>
                                                    <span>702. Keterangan Pengesahan</span>
                                                    <li>Data yang tercantum dalam daftar isian ini diisi dengan
                                                        sebenarnya dan menurut keadaan yang
                                                        sesungguhnya</li>
                                                    <v-text-field v-model="r702_a" label="a. Nama" type="text" clearable
                                                        append-inner-icon="mdi-information-outline"
                                                        variant="underlined"></v-text-field>
                                                    <v-text-field v-model="r702_b" label="b. Jabatan" type="text"
                                                        clearable append-inner-icon="mdi-information-outline"
                                                        variant="underlined"></v-text-field>
                                                    <v-row>
                                                        <v-col cols="12" md="6">
                                                            <v-text-field v-model="r702_c1" label="c. Telepon"
                                                                type="text" clearable
                                                                append-inner-icon="mdi-information-outline"
                                                                variant="underlined"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="6">
                                                            <v-text-field v-model="r702_c2" label="c. Fax" type="text"
                                                                clearable append-inner-icon="mdi-information-outline"
                                                                variant="underlined"></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                    <v-text-field v-model="r702_d" label="d. Email" type="text"
                                                        clearable append-inner-icon="mdi-information-outline"
                                                        variant="underlined"></v-text-field>
                                                    
                                                    <v-card >
                                                        <v-card-title>e. Tanda Tangan</v-card-title>
                                                        <v-card-text>
                                                            <canvas ref="canvas" 
                                                                style="border:1px solid #ccc; border-radius: 8px;"></canvas>
                                                        </v-card-text>
                                                        <v-card-actions>
                                                            <v-btn color="primary" @click="clear">Hapus</v-btn>
                                                            <v-btn color="success" @click="save">Simpan</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                    
                                                    <v-text-field v-model="r702_f_formated" label="f. Tanggal Pengesahan"
                                                        type="text" clearable
                                                        append-inner-icon="mdi-information-outline" variant="underlined"
                                                        hint="Format yyyy-mm-dd. Contoh : 2025-08-17">
                                                        <template v-slot:append>
                                                            <v-dialog max-width="500">
                                                                <template v-slot:activator="{ props: activatorProps }">
                                                                    <v-btn v-bind="activatorProps" class="pd-2" block rounded="lg"
                                                                        color="deep-orange-lighten-2"
                                                                        v-if="(mode == 'edit')" @click="">Atur</v-btn>
                                                                </template>

                                                                <template v-slot:default="{ isActive }">
                                                                    <v-card title="Atur Tanggal Pengesahan">
                                                                        <v-date-picker v-model="r702_f" color="deep-orange-lighten-2" ></v-date-picker>
                                                                        <v-card-actions>
                                                                            <v-spacer></v-spacer>
                                                                            <v-btn text="Tutup"
                                                                                @click="isActive.value = false"></v-btn>
                                                                        </v-card-actions>
                                                                    </v-card>
                                                                </template>
                                                            </v-dialog>
                                                        </template>
                                                    </v-text-field>
                                                    

                                                </v-sheet>
                                            </v-col>
                                        </v-row>
                                    </v-tabs-window-item>
                                </v-tabs-window>
                            </v-card-text>
                        </v-card>
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
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2'
import axios from 'axios';
import dayjs from 'dayjs'
import SignaturePad from 'signature_pad'

const canvas = ref(null)
let signaturePad = null

const apiUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user'))

//for tab
const tab = ref(null)
const route = useRoute(); // Mengakses objek route saat ini
const router = useRouter()
const mode = route.query.mode
const id = route.query.id
const form = ref()

//variable blok 1
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
const r203 = ref()

//variable blok 3
const r301 = ref()
const r302 = ref()
const r302_1_text = ref()
const r302_1_value = ref()
const r302_2_text = ref()
const r302_2_value = ref()
const r303 = ref()

//variable blok 4
const r401 = ref()

//variable blok 5
const r501_a = ref()
const r501_b = ref()

//variable blok 6
const r601 = ref()
const r602_a = ref()
const r602_b = ref()
const r603_a = ref()
const r603_b = ref()
const r603_c = ref()

//variable blok 7
const r701_a = ref()
const r701_b = ref()
const r701_c1 = ref()
const r701_c2 = ref()
const r701_d = ref()
const r702_a = ref()
const r702_b = ref()
const r702_c1 = ref()
const r702_c2 = ref()
const r702_d = ref()
const r702_f = ref()


const r702_f_formated = computed(() => {
  return r702_f.value
    ? dayjs(r702_f.value).format('YYYY-MM-DD')
    : ''
})

//TTD
const clear = () => {
    signaturePad.clear()
}

const save = () => {
    if (signaturePad.isEmpty()) {
        alert('Tanda tangan belum diisi!')
    } else {
        const dataUrl = signaturePad.toDataURL()
        console.log('Data URL:', dataUrl)
        // Kirim ke server atau simpan di state
    }
}

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
            signaturePad = new SignaturePad(canvas.value)
            catatan.value = response.data.data.catatan
            role.value = response.data.role
        })
    } catch (error) {
        console.log(error)
    }
})

</script>
