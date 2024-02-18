<template>
  <div>
  <div v-if="this.loading === true">
    <loading-item/>
  </div>
  <div>
    <p class="text-3xl text-white font-bold">{{ championInfo.name }} {{ championInfo.title }}</p>
    <img
      :src="`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championInfo.id}_0.jpg`"
    />
    <div class="flex">
      <span >
        <img
          id="parent"
          style="height: 64px; margin: 10px"
          :src="`https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${championInfo.passive?.image.full}`"
        />
        <v-tooltip activator="parent"
        location="start"
        :width="200"
          >
          <p class="text-skills">{{ championInfo.passive?.name }}</p>
          <br>
        <p>{{ championInfo.passive?.description.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g,' ') }}</p>
        </v-tooltip>
      </span>
      <span v-for="spell in championInfo.spells" :key="spell.id">
      <img
        style="margin: 10px"
        :src="`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}`"
      />
      <v-tooltip activator="parent" location="start" :width="200">
        <p class="text-skills">{{ spell.name }}</p>
        <p>Cooldown: {{ spell.cooldownBurn }}</p>
        <p>Cost: {{ spell.costBurn }}</p>
        <p>Range: {{ spell.rangeBurn }}</p>
        
        <br>
        <p>{{ spell.description.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g,' ') }}</p>
    </v-tooltip>
    </span>
    </div>
    <div v-if="championInfo?.allytips?.length !== 0">
    <p class="tips">Tips</p>
    <div class="flex flex-col border-solid bg-gray-600 rounded mx-3 border-b-4 border-gray-700">
    <p class="m-4 text-xl text-green-200" v-for="(tips,index) in championInfo.allytips" :key="tips"> <span class="text-amber-500">{{ index+1 }}.</span> {{ tips }}</p>
    </div>
    <div class="flex flex-col border-solid bg-gray-600 rounded mx-3">
    <p class="m-4 text-xl text-red-200" v-for="(tips,index) in championInfo.enemytips" :key="tips"> <span class="text-amber-500">{{ index+1 }}.</span> {{ tips }}</p>
    </div>
  </div>
  </div>
</div>
</template>

<script>
import { mapState,mapActions } from 'pinia'
import { useChampionStore } from '@/store/championStore'
import loadingItem from '@/components/loadingItem.vue';
export default {
  components: {
    loadingItem
  },
  data() {
    return {
      champName: this.$route.params.championName,
    };
  },
  methods: {
    ...mapActions(useChampionStore,['getChampionInfo','fetchChamps'])
  },
  computed:{
    ...mapState(useChampionStore,['championInfo','passive','version','loading'])
  },
  mounted() {
    this.fetchChamps()
  },
  created() {
    this.getChampionInfo(this.champName)
  }
};
</script>

<style scoped>
.skinList {
  display: flex;
  flex-direction: row;
}
.skinList_img {
  width: 150px;
  margin: 10px;
}
</style>
