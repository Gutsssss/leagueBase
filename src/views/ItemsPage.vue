<template>
    <p class="tips">Items</p>
    <loadingItem v-if="loading === true"/>
    <div v-else class="grid grid-cols-11 m-8" id="start">
        <itemElement v-for="item in items" :key="item.name" :item="item"/>
    </div>
</template>

<script>
import { mapState,mapActions } from 'pinia'
import { useChampionStore } from '@/store/championStore'
import itemElement from '@/components/itemElement.vue';
import loadingItem from '@/components/loadingItem.vue';
    export default {
        components: {
            itemElement,
            loadingItem
        },
        computed:{
            ...mapState(useChampionStore,['items','loading']),
        },
        methods:{
            ...mapActions(useChampionStore,['getItems','getItemInfo']),
        },
        mounted() {
            this.getItems()
        }
    }
</script>

<style scoped>

</style>