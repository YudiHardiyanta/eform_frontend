<script setup>
import { ref } from 'vue'
const tab = ref(null)


//untuk menu
const items = [
    { title: 'I Komang Yudi Hardiyanta' },
    { title: 'Pencacah' },
]

</script>

<style scoped>
@media (max-width: 600px) {
    .bottom-tabs {
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 10;
    }
}
</style>
<template>
    <v-card>
        <v-app-bar :elevation="2">
            <template v-slot:prepend>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </template>

            <v-app-bar-title>E-Form</v-app-bar-title>

            <template v-slot:append>
                <v-btn icon="mdi-bell-outline" ></v-btn>

                <v-menu :location="location">
                    <template v-slot:activator="{ props }">
                        <v-btn color="primary" v-bind="props" icon="mdi-account">
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item v-for="(item, index) in items" :key="index" :value="index">
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-btn class="mt-2" text="Keluar" type="submit" block rounded="lg" color="red-darken-3"></v-btn>        
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>
        </v-app-bar>

        <v-tabs v-model="tab" align-tabs="center" bg-color="indigo-darken-3" stacked class="bottom-tabs"
            density="compact">
            <v-tab value="tab-2">
                <v-icon icon="mdi-note-edit"></v-icon>
                Pendataan
            </v-tab>
            <v-tab value="tab-3">
                <v-icon icon="mdi-account"></v-icon>
                Profil
            </v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
            <v-tabs-window-item value="tab-2">
                <v-card rounded="lg">
                    <Profil></Profil>
                </v-card>
            </v-tabs-window-item>
            <v-tabs-window-item value="tab-3">
                <v-card rounded="lg">
                    <Profil></Profil>
                </v-card>
            </v-tabs-window-item>
        </v-tabs-window>

    </v-card>
</template>