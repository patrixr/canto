import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw }                 from 'vue-router';
import Chapter                            from '../views/Chapter.vue'
import ChapterList                        from '../views/ChapterList.vue'
import NotFound                           from '../views/404.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/chapters'
  },
  {
    path: '/chapters/:id',
    name: 'Chapter',
    component: Chapter
  },
  {
    path: '/chapters',
    name: 'ChapterList',
    component: ChapterList
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
