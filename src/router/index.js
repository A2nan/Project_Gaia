import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import RoleSelection from '../components/RoleSelection.vue'
import PlayerView from '../components/PlayerView.vue'
import CaptainView from '../components/CaptainView.vue'
import NextView from '../components/tableau/NextView.vue'
import LeaveRoomButton from '../components/LeaveRoomButton.vue'
import PlayerVue from '@/components/tableau/PlayerVue.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/role', name: 'role', component: RoleSelection },
  {
    path: '/player/:id',
    name: 'player',
    component: PlayerView,
    props: (route) => ({ player: Number(route.params.id) }),
  },
  { path: '/captain', name: 'captain', component: CaptainView },
  { path: '/next', name: 'next', component: NextView },
  { path: '/LeaveRoomButton', name: 'LeaveRoomButton', component: LeaveRoomButton },
  { path: '/playervue', name: 'NextPlayer', component: PlayerVue },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
