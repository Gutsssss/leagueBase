<template>
  <div class="flex justify-around">
  <div>
    <div class="relative my-2">
      <h1 class="text-white text-4xl text-center">{{ MyProfile.name }}</h1>
      <img
        class="w-40 rounded-xl"
        :src="`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${MyProfile.profileIconId}.png`"
      />
      <p
        class="text-center text-xl text-white absolute -bottom-0.5 left-12 bg-gray-800 rounded-md w-16"
      >
        {{ MyProfile.summonerLevel }}
      </p>
    </div>
    <div v-if="this.arrChampsMastery.length > 0" class="flex">
      <championItem
        v-for="champion in this.arrChampsMastery.slice(0,3)"
        :key="champion.id"
        :champion="champion"
      />
    </div>
  </div>
  <div class="my-4" v-if="rank !== null">
    <p class="text-3xl text-center font-bold text-white ">{{ this.rank?.tier }}</p>
  <img class="h-60 w-90" :src="setRankedEmblem()">
  <div class="flex justify-center gap-3">
    <p class="text-lg text-center text-white">{{ this.rank?.rank }}</p>
    <p class="text-lg text-center text-white">{{ this.rank?.leaguePoints }} pts</p>
  </div>
  </div>
  
  </div>
</template>

<script>
import bronze from '@/assets/emblem-BRONZE.png'
import silver from '@/assets/emblem-SILVER.png'
import gold from '@/assets/emblem-GOLD.png'
import platinum from '@/assets/emblem-PLATINUM.png'
import emerald from '@/assets/emblem-EMERALD.png'
import diamond from '@/assets/emblem-DIAMOND.png'
import master from '@/assets/emblem-MASTER.png'
import grandmaster from '@/assets/emblem-GRANDMASTER.png'
import challenger from '@/assets/emblem-CHALLENGER.png'
import { mapState, mapActions } from "pinia";
import { useProfileStore } from "@/store/profileStore";
import { useChampionStore } from "@/store/championStore";
import championItem from "@/components/championItem.vue";
export default {
  components: {
    championItem,
  },
  inject:['arrChamps'],
  data() {
    return {
      arrChampsMastery: this.arrChamps,
      rankedEmblem:''
    };
  },
  computed: {
    ...mapState(useProfileStore, ["MyProfile", "loading", "masteryChampions",'rank']),
    ...mapState(useChampionStore, ["champions", "version"])
  },
  methods: {
    ...mapActions(useProfileStore, ["getProfileInfo", "getMasteryChampions",'getAccountInfo','getRankedInfo']),
    setRankedEmblem() {
      switch(this.rank?.tier) {
        case 'BRONZE':
        this.rankedEmblem = bronze
        break
        case 'SILVER':
        this.rankedEmblem = silver
        break
        case 'GOLD':
        this.rankedEmblem = gold
        break
        case 'PLATINUM':
        this.rankedEmblem = platinum
        break
        case 'EMERALD':
        this.rankedEmblem = emerald
        break
        case 'DIAMOND':
        this.rankedEmblem = diamond
        break
        case 'MASTER':
        this.rankedEmblem = master
        break
        case 'GRANDMASTER':
        this.rankedEmblem = grandmaster
        break
        case 'CHALLENGER':
        this.rankedEmblem = challenger
        break
      }
      return this.rankedEmblem
    }
  },
  mounted() {
    this.getProfileInfo(),
    this.getMasteryChampions(),
    this.setRankedEmblem()
  },
  created() {
    this.getRankedInfo()
  }
};
</script>

<style lang="scss" scoped></style>
