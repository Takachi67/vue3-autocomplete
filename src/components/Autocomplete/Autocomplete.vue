<template>
  <input
      type="text"
      @input="search"
      v-model="searchText"
  />
  <ul v-for="item in list" :key="item">
    <li>{{ displayItem(item) }}</li>
  </ul>
</template>

<script lang="ts">
import { ref, reactive, watch } from 'vue'
// @ts-ignore
import { SetupContext } from '@vue/composition-api'
import ComponentProps from '../../interfaces/ComponentProps'

export default {
  name: 'Autocomplete',
  props: {
    list: {
      type: Array,
      default: []
    },
    displayItem: {
      type: Function,
      default: (item: Object|String) => {
        // @ts-ignore TODO: Use a pre-build object with a name property
        return typeof item === 'string' ? item : item.name
      }
    }
  },
  emits: [
      'input'
  ],
  setup(props: ComponentProps, context: SetupContext) {
    let searchText = ref('')

    /**
     * Triggered on input changes
     * @param { InputEvent } e
     */
    function search(e: any) {
      context.emit('input', e.target.value)
    }

    return {
      searchText,
      search
    }
  }
}
</script>

<style scoped>

</style>