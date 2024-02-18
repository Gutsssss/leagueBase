<template>
    <div v-if="item.maps?.[21] && item.gold?.total !== 0" class="m-2 border-2 border-gray-500 rounded flex items-center text-center flex-col p-2 cursor-pointer" @click.prevent="$router.replace({name:'itemInfo',params: {itemName:item.name} })">
    <img style="width:50px ml-auto mr-auto inline-block;" :src='`https://ddragon.leagueoflegends.com/cdn/${this.version}/img/item/${item.image?.full}`'/>
    <p class="text-white py-4">{{ item.name }}</p>
</div>
</template> 

<script>
import { mapState,mapActions } from 'pinia'
import { useChampionStore } from '@/store/championStore'
export default {
    data(){
      return {
        openItem:false,
        toggleItemOpen:{
            background:'black'
        }
      }
    },
    computed: {
        ...mapState(useChampionStore,['version'])
    },
    props: {
            item:{
                type:Object,
                required:true
            },
            fromGold:{
                type:Number
            }
        },
        methods: {
          ...mapActions(useChampionStore,['getItemInfo']),
          toogleOnenItem() {
            console.log(this.openItem = !this.openItem)
          },
          findGold(itemFrom) {
            return this.item.filter(elem => elem.image.full.includes(itemFrom))
          },
          addShowItem() {
          }
        }
};
</script>

<style lang="scss" scoped></style>
