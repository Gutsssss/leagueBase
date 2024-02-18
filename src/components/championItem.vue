<template>
    <div class="hover:bg-gray-700 cursor-pointer">
    <router-link :to="{name:'championInfo',params:{championName:champion.id}}">
    <div class="flex justify-center flex-col m-2">
    <img style="width: 70px;" class="rounded-lg" :src='`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.id}.png`'/>
        <p class="text-gray-300 font-medium ">{{ champion.id }}</p>
    </div>
</router-link>
</div>
</template>

<script>
import { mapState } from 'pinia'
import { useChampionStore } from '@/store/championStore'
    export default {
        props: {
            champion:{
                type:Object,
                required:true
            }
        },
        computed: {
            ...mapState(useChampionStore,['version'])
        }
    }
</script>

<style>
</style>