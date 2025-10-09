import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import RoleSelection from '../components/RoleSelection.vue'
import PlayerView from '../components/PlayerView.vue'
import CaptainView from '../components/CaptainView.vue'
import NextView from '../components/NextView.vue'
import LeaveRoomButton from '../components/LeaveRoomButton.vue'
import FriseView from '../components/FriseView.vue'
import VulpeFriseView from '../components/VulpeFriseView.vue'
import LeoneFriseView from '../components/LeoneFriseView.vue'

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
  { path: '/FriseChronoPrince', name: 'FriseChronoPrince', component: FriseView },
  { path: '/FriseChronoVulpe', name: 'FriseChronoVulpe', component: VulpeFriseView },
  { path: '/FriseChronoLeone', name: 'FriseChronoLeone', component: LeoneFriseView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
