<template>
  <div class="vue3-autocomplete-container">
    <input
        ref="autocompleteRef"
        type="text"
        @input="handleInput"
        v-bind="$attrs"
        v-model="searchText"
        :class="getInputClass"
        @focus="displayResults"
        @blur="hideResults"
    />
    <div :style="{ width: inputWidth + 'px' }" :class="getResultsContainerClass" v-if="shouldShowResults">
      <div
          v-for="item in filteredResults"
          :key="item"
          :class="getResultsItemClass"
          @click="clickItem(item)"
          @mousedown.prevent
      >{{ displayItem(item) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, SetupContext, onMounted } from 'vue'
import ComponentProps from './interfaces/ComponentProps'

export default {
  name: 'Autocomplete',
  props: {
    debounce: {
      type: Number,
      default: 0
    },
    inputClass: {
      type: Array,
      default: []
    },
    max: {
      type: Number,
      default: 10
    },
    results: {
      type: Array,
      default: []
    },
    resultsContainerClass: {
      type: Array,
      default: []
    },
    resultsItemClass: {
      type: Array,
      default: []
    },
    displayItem: {
      type: Function,
      default: (item: Object|String) => {
        // @ts-ignore
        return typeof item === 'string' ? item : item.name
      }
    }
  },
  emits: [
    'input',
    'onSelect'
  ],
  setup(props: ComponentProps, context: SetupContext) {
    const autocompleteRef = ref()

    let inputWidth = ref(0)
    let searchText = ref('')
    let timeout: NodeJS.Timeout
    let showResults = ref(true)

    /**
     * Same as Vue2 'mounted' function, used to get refs correctly
     */
    onMounted(() => {
      inputWidth.value = autocompleteRef.value.offsetWidth - 2
    })

    /**
     * Triggered on input changes with a dynamic debounce
     * @param { InputEvent } e
     */
    function handleInput(e: any) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        context.emit('input', e.target.value)
      }, props.debounce)
    }

    /**
     * Triggered on click on a result item
     */
    function clickItem(data: Object) {
      context.emit('onSelect', data)
      showResults.value = false
    }

    /**
     * Called on focus
     */
    function displayResults() {
      showResults.value = true
    }

    /**
     * Called on blur
     */
    function hideResults() {
      showResults.value = false
    }

    /**
     * Return class(es) for input element
     */
    const getInputClass = computed(() => {
      return props.inputClass.length > 0 ? props.inputClass : ['vue3-input']
    })

    /**
     * Return class(es) for results container element
     */
    const getResultsContainerClass = computed(() => {
      return props.resultsContainerClass.length > 0 ?
          props.resultsContainerClass :
          ['vue3-results-container']
    })

    /**
     * Return class(es) for results item elements
     */
    const getResultsItemClass = computed(() => {
      return props.resultsItemClass.length > 0 ?
          props.resultsItemClass :
          ['vue3-results-item']
    })

    /**
     * Show results depending on results length and showResults boolean
     */
    let shouldShowResults = computed(() => {
      return showResults.value && (props.results.length > 0)
    })

    /**
     * Return results filtered with the 'max' props
     */
    const filteredResults = computed(() => {
      return props.results.slice(0, props.max)
    })

    /**
     * Return data, making them reactive
     */
    return {
      searchText,
      showResults,
      autocompleteRef,
      inputWidth,
      displayResults,
      hideResults,
      handleInput,
      clickItem,
      filteredResults,
      getInputClass,
      getResultsContainerClass,
      getResultsItemClass,
      shouldShowResults
    }
  }
}
</script>

<style lang="scss" scoped>
.vue3-autocomplete-container {
  display: flex;
  flex-direction: column;

  .vue3-input {
    border-radius: 5px;

    &:focus {
      outline: none;
    }
  }

  .vue3-results-container {
    position: absolute;
    top: 27px;
    border: 1px solid black;
    z-index: 99;
    background: white;
  }

  .vue3-results-item {
    list-style-type: none;
    padding: 5px;
    border-bottom: 1px solid black;

    &:hover {
      cursor: pointer;
    }

    &:nth-last-child(1) {
      border-bottom: none;
    }
  }
}
</style>
