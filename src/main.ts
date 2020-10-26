// @ts-ignore
import Autocomplete from './Autocomplete'

const AutocompletePlugin = {
    // @ts-ignore
    install(Vue, options = {}) {
        Vue.component('Autocomplete', Autocomplete)
    }
}

export default AutocompletePlugin
export { Autocomplete }

// @ts-ignore
if (typeof window !== 'undefined' && window.Vue) {
    // @ts-ignore
    window.Vue.use(ComponentLibrary)
}