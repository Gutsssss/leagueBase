<template>
    <div class="flex items-center justify-around text-white around bg-green-500 mb-3 " id="nav">
    <p class="uppercase font-semibold text-lg "><RouterLink to="/">liguebase</RouterLink></p>
    <div>
    <input class="border-2 border-white bg-white rounded" type="text" list="championsList"  @change.prevent="goToChampInfo(selectedChamp), this.getChampionInfo(selectedChamp)" v-model="selectedChamp"/>
        <datalist id="championsList" >
            <option v-for="champion in champions" :key="champion.id"><p>{{ champion.id }}</p></option>
        </datalist>
    </div>
        <ul class="flex">
            <li class="text-lg p-1 hover:text-gray-600"><RouterLink to="/">Home</RouterLink></li>
            <li class="text-lg p-1 hover:text-gray-600"><RouterLink to="/champions">Champions</RouterLink></li>
            <li class="text-lg p-1 hover:text-gray-600"><RouterLink to="/items">Items</RouterLink></li>
        </ul>
    </div>
</template>
<script>
import { useChampionStore } from '@/store/championStore'
import { mapState,mapActions} from 'pinia'
    export default {
        data() {
            return {
                selectedChamp:'',
            }
        },
        props:['myLanguage'],
        computed: {
            ...mapState(useChampionStore, ['champions'])
        },
        methods: {
            ...mapActions(useChampionStore,['getChampionInfo','fetchChamps']),

            async goToChampInfo(selectedChamp) {
                await this.$router.replace({name:'championInfo',params: {championName:selectedChamp} })
                 this.selectedChamp = ''
            }
        },
        mounted() {
            this.fetchChamps()
        }
    }
</script>

<style lang="scss" scoped>

</style>