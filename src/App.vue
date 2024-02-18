<template>
  <div class="bg-gray-700 min-h-[1200px]">
  <navLeague />
 <RouterView  />
 <footerLeague/>
</div>
</template>

<script>
import {useChampionStore} from '@/store/championStore'
import {useProfileStore} from '@/store/profileStore'
import {mapState,mapActions} from 'pinia'
import navLeague from './components/navLeague.vue'
import footerLeague from './components/footerLeague.vue'
  export default {
    data() {
      return {
        arrChamps:[]
      }
    },
    components:{
      navLeague,
      footerLeague
    },
    provide() {
    return {
      arrChamps: this.arrChamps
    }
  },
    computed:{
      ...mapState(useChampionStore,['champions']),
      ...mapState(useProfileStore,['masteryChampions'])
    },
    methods: {
      ...mapActions(useChampionStore, ['getLanguages','fetchChamps']),
      ...mapActions(useProfileStore,['getMasteryChampions','getProfileInfo']),
      findChamps() {
      for (let i = 0; i < this.masteryChampions.length; i++) {
        const findedChampion = this.champions.filter(
          (elem) => elem.key == this.masteryChampions[i].championId
        );
        this.arrChamps.push(...findedChampion);
      }
      return this.arrChamps;
    }
    },
    created() {
      this.fetchChamps(),
      this.getProfileInfo(),
      this.getMasteryChampions()
    },
    async mounted() {
     await this.fetchChamps(),
     await this.getProfileInfo(),
     await this.getMasteryChampions(),
     await this.findChamps()
    },
  }
</script>

<style lang="scss" scoped>

</style>