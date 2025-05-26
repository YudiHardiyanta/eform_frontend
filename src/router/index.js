/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'

import { routes } from 'vue-router/auto-routes'

//mengatur path require login
const pathLogin = ['/','/data','/kegiatan','/pendataan']

routes.forEach((element,index) => {
  if(pathLogin.includes(element.path)){
    routes[index].meta = { requiresAuth: true }
  }
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

// Guard global
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token'); // atau ambil dari store
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else if (to.path === '/login' && isLoggedIn) {
    next('/'); // kalau sudah login, jangan balik ke halaman login
  } else {
    next();
  }
});

export default router
