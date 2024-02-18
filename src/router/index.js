import { createRouter, createWebHistory } from "vue-router";
import championsPage from "../views/ChampionsPage.vue";
import ChampionInfoPage from "../views/ChampionInfoPage.vue";
import HomeLeague from '../views/HomeLeague.vue'
import itemsPage from '../views/ItemsPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'
import ItemInfoPage from '../views/ItemInfoPage.vue'
const routes = [
  {
    path: "/",
    component:HomeLeague ,
  },

  {
    path: "/champions",
    component: championsPage,
  },

  {
    path: "/champions/:championName",
    component: ChampionInfoPage,
    name:"championInfo",
    props:true
  },
  {
    path:"/items",
    component:itemsPage
  },
  {
    path:"/items/:itemName",
    component:ItemInfoPage,
    name:"itemInfo",
    props:true
  },
  {
    path:"/404",
    component:NotFoundPage
  },
  {
    path: "/:championName(.*)*",
    redirect: "/404"
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
