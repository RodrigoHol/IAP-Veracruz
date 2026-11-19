import { createRouter, createWebHistory } from 'vue-router'
import { getProgramBySlug } from '../data/programs'
import HomeView from '../views/HomeView.vue'
import ProfessionalizationView from '../views/ProfessionalizationView.vue'
import ProgramDetailView from '../views/ProgramDetailView.vue'
import LibraryView from '../views/LibraryView.vue'
import ContactView from '../views/ContactView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 96, behavior: 'smooth' }
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Inicio' } },
    { path: '/profesionalizacion', name: 'professionalization', component: ProfessionalizationView, meta: { title: 'Profesionalización' } },
    {
      path: '/profesionalizacion/:slug',
      name: 'program-detail',
      component: ProgramDetailView,
      props: true,
      meta: { title: 'Programa académico' },
      beforeEnter: (to) => getProgramBySlug(to.params.slug) ? true : { name: 'not-found' },
    },
    { path: '/biblioteca', name: 'library', component: LibraryView, meta: { title: 'Biblioteca virtual' } },
    { path: '/contacto', name: 'contact', component: ContactView, meta: { title: 'Contacto' } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView, meta: { title: 'Página no encontrada' } },
  ],
})

router.afterEach((to) => {
  const title = to.name === 'program-detail'
    ? getProgramBySlug(to.params.slug)?.title
    : to.meta.title

  if (title) document.title = `${title} | IAP Veracruz`
})

export default router
