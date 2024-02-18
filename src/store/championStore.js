
import { defineStore } from "pinia";
export const useChampionStore = defineStore('champions', {
    state:() => ({
        version:'',
        champions:[],
        championInfo:{},
        languages:[],
        currentLang:'en_US',
        roleCategory:[],
        filteredOfCategory:[],
        items:[],
        loading:false,
        itemInfo:{}
    }),
    getters: {
        getRoleCategory(state) {
            return state.roleCategory
        }
    },
    actions: {
        async getVersion(){
            try {
                await fetch('https://ddragon.leagueoflegends.com/api/versions.json')
                .then ((res) => res.json())
                .then(json => this.version = (json[0]))
            }
            catch(err) {
                console.log(err)
            }
        },
        async fetchChamps(lang = this.currentLang) {
            this.loading = true
            try {
                await this.getVersion()
                const response = await fetch(`http://ddragon.leagueoflegends.com/cdn/${this.version}/data/${lang}/champion.json`)
                const result = await response.json()
                this.champions = Object.values(result.data)
                this.loading = false
            }
            catch(err) {
                console.log(err)
            }
        },
        async getChampionInfo(championName,lang = this.currentLang) {
                await this.getVersion()
                this.loading = true
               fetch(
                `https://ddragon.leagueoflegends.com/cdn/${this.version}/data/${lang}/champion/${championName}.json`
              )
                .then((res) => res.json())
                .then((json) => (this.championInfo = json.data[championName]))
                this.loading = false
          },
        async getLanguages() {
            fetch('https://ddragon.leagueoflegends.com/cdn/languages.json')
            .then(res => res.json())
            .then(json => this.languages = json)
        },
        findOfCategory() {
            if(!this.roleCategory) {
                return this.champions
            }
            return this.champions.filter((elem) => this.roleCategory.every(role => elem.tags.includes(role))
            )
        },
        async getItems() {
            this.loading = true
            await this.getVersion()
            try {
                const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${this.version}/data/en_US/item.json`)
                const result = await response.json()
                this.items = Object.values(result.data)
            }
            catch(err) {
                console.log(err)
            }
            this.loading = false
        },
        async getItemInfo(itemName) {
            this.loading = true
            await this.getItems()
           this.itemInfo = this.items.filter(elem => elem.name === itemName)[0]
           this.loading = false
      },
    },
})