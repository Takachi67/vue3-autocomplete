<template>
  <Autocomplete :list="list" @input="searchItem" :display-item="displayRecipe"></Autocomplete>
</template>

<script>
import Autocomplete from '@/components/Autocomplete/Autocomplete'
import axios from 'axios'

export default {
  name: "App",
  components: {
    Autocomplete
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    searchItem(text) {
      axios.get('http://localhost:8000/api/recipe/search/' + text).then((response) => {
        this.list = response.data.recipes
      })
    },
    displayRecipe(recipe) {
      return recipe.name
    }
  }
}
</script>

<style scoped>

</style>