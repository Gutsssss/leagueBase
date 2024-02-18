<template>
  <p class="tips">Heroes</p>
  <div class="flex flex-row border-b-4 border-gray-700 h-auto m-2">
  <input class="hidden" type="checkbox" id="Assassin" value="Assassin" v-model="roleCategory"/>
  <label for="Assassin" class="checkbox" >Assassin</label>

  <input class="hidden" type="checkbox" id="Fighter" value="Fighter" v-model="roleCategory"/>
  <label for="Fighter" class="checkbox">Fighter</label>

  <input class="hidden" type="checkbox" id="Mage" value="Mage" v-model="roleCategory"/>
  <label for="Mage" class="checkbox">Mage</label>

  <input class="hidden" type="checkbox" id="Marksman" value="Marksman" v-model="roleCategory"/>
  <label for="Marksman" class="checkbox">Marksman</label>

  <input class="hidden" type="checkbox" id="Support" value="Support" v-model="roleCategory"/>
  <label for="Support" class="checkbox">Support</label>

  <input class="hidden" type="checkbox" id="Tank" value="Tank" v-model="roleCategory"/>
  <label for="Tank" class="checkbox">Tank</label>
    
  </div>
  <div>
    <loadingItem v-if="loading === true"/>
  </div>
  <div v-if="loading === false" class="m-auto py-2 bg-gray-600 min-h-auto rounded-lg border-2 border-gray-500 w-3/4">
  <div v-if="!this.findOfCategory(...this.roleCategory).length" class="text-center">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" data-slot="icon" class="w-48 h-48 stroke-green-500 block m-auto">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
<p class="text-white font-bold text-2xl mt-3">Сharacters with such roles are not found, try to choose other roles</p>
</div>
  <div class="grid grid-cols-10">
    <championItem v-for="champion in this.findOfCategory(...this.roleCategory)" :key="champion.id" :champion="champion"/>
  </div>
</div>
</template>

<script>  
import championItem from '@/components/championItem.vue'
import { mapState,mapActions,mapWritableState } from 'pinia'
import { useChampionStore } from '@/store/championStore'
import loadingItem from '@/components/loadingItem.vue';
  export default {
    components: {
      championItem,
      loadingItem
    }, 
    data(){
      return {
        version:null,
        checkedCategory:[]
      }
    },
    methods:{
      ...mapActions(useChampionStore,['fetchChamps','getInfo','findOfCategory','getItems']),
    },
    computed: {
      ...mapState(useChampionStore,['champions','getRoleCategory','filteredOfCategory','loading']),
      ...mapWritableState(useChampionStore,['roleCategory'])
    },
    mounted() {
      this.fetchChamps()
      this.findOfCategory()
    },
  }
</script>

<style scoped>
input[type='checkbox']:checked + label {
  background-color: rgb(34 197 94);
  border-color: rgb(34 197 94); 
}
</style>