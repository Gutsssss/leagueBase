<template>
  <div class="w-3/4 m-auto flex justify-around">
    <table class="w-80 text-center border-x-2 border-green-500 border-b-2 max-h-56">
      <tr class="bg-green-500 h-12">
        <th>{{ itemInfo.name }}</th>
      </tr>
      <tr>
        <td class="flex justify-center m-4 ">
          <div class="border-2 border-green-500 w-16 rounded">
            <img
              style="width: 50px ml-auto mr-auto inline-block"
              :src="`https://ddragon.leagueoflegends.com/cdn/${this.version}/img/item/${itemInfo.image?.full}`"
            />
          </div>
        </td>
      </tr>
      <tr class="bg-green-500 h-12">
        <th>Stats</th>
      </tr>
      <tr >
        <td class="p-4">{{ itemInfo.description?.replace(/<\/?[^>]+>/ig, " ") }}</td>
      </tr>
      <tr class="bg-green-500 h-12">
      <th>Recipe</th>
      </tr>
      <tr>
      <td class="flex justify-around m-4">
      <p>Cost {{ itemInfo.gold?.total }}</p>
        <p>Sell {{ itemInfo.gold?.sell }}</p>
      </td>
      </tr>
    </table>
    <div v-if="itemInfo.into?.length > 1">
        <h1 class="text-center text-white">Builds Into</h1>
        <div class="grid grid-cols-4">
            <img
            class="m-2"
            v-for="itemInto,index in itemInfo.into" :key="index"
              style="width: 50px ml-auto mr-auto inline-block"
              :src="`https://ddragon.leagueoflegends.com/cdn/${this.version}/img/item/${itemInto}.png`"
            />
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useChampionStore } from "@/store/championStore";
export default {
  data() {
    return {
      itemName: this.$route.params.itemName,
    };
  },
  computed: {
    ...mapState(useChampionStore, ["loading", "itemInfo", "version"]),
  },
  methods: {
    ...mapActions(useChampionStore, ["getItemInfo"]),
  },
  created() {
    this.getItemInfo(this.itemName);
  },
};
</script>

<style scoped></style>
