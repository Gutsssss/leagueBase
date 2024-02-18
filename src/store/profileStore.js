import { defineStore } from "pinia";
export const useProfileStore = defineStore("profile", {
  state: () => ({
    MyProfile: {},
    loading: false,
    masteryChampions: [],
    nameInGame: {},
    account:{},
    rank:{},
    apiKey:'RGAPI-4cf20b9b-432e-4b04-afe7-ffe29ae8ee3a'
  }),
  actions: {
    async getProfileInfo() {
      this.loading = true
      try {
        await fetch(
          `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-account/7xbnOkw2IUjJj5Qxif8MGQbXmMvi_zuuMLpNZJDsks2c84mKRu0vWQsk?api_key=${this.apiKey}`
        )
          .then((res) => res.json())
          .then((json) => (this.MyProfile = json));
      } catch (error) {
        console.log(error);
      }
      this.loading = false
    },
    async getMasteryChampions() {
      this.loading = true
      try {
        await fetch(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/fEgget-0rrFwvyWcMzxWwgyXJv3pPxUEwht77J2REgtfe4hWX3wF_OFnEcNLd1b1eSOwCjiIgoLskw?api_key=${this.apiKey}`
        )
          .then((res) => res.json())
          .then((json) => (this.masteryChampions = json));
      } catch (error) {
        console.log(error);
      }
      this.loading = false
    },
    async getAccountInfo() {
      try {
        await fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/fEgget-0rrFwvyWcMzxWwgyXJv3pPxUEwht77J2REgtfe4hWX3wF_OFnEcNLd1b1eSOwCjiIgoLskw?api_key=RGAPI-4cf20b9b-432e-4b04-afe7-ffe29ae8ee3a`)
        .then(res => res.json())
        .then((json) => this.account = (json))
      }
      catch(err) {
        console.log(err)
      }
    },
    async getRankedInfo() {
      this.loading = true
      try {
        await fetch(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/3HRnP6vtgxjb43pENTQn297mIEaodeDXCc_OXiiwBrG2lW0tca0_4iwweQ?api_key=${this.apiKey}`)
        .then(res => res.json())
        .then(json => this.rank = json[0])
      }
      catch(err) {
        console.log(err)
      }
      this.loading = false
    }
  }
});
