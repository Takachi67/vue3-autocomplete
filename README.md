# vue3-autocomplete

## Table of contents

* [Installation](#installation)
* [Usage](#usage)

## Installation

Using npm
```
npm install vue3-autocomplete
```

Using yarn
```
yarn add vue3-autocomplete
```

## Usage

Load the component globally...

```ts
import App from './App.vue' // Or whatever you need
import Autocomplete from 'vue3-autocomplete'
// Optional: Import default CSS
import 'vue3-autocomplete/dist/vue3-autocomplete.css'

let app = createApp(App)
app.component('Autocomplete', Autocomplete)
app.mount('#app')
```

... Or locally into your component.

```ts
import Autocomplete from 'vue3-autocomplete'
// Optional: Import default CSS
import 'vue3-autocomplete/dist/vue3-autocomplete.css'

export default {
    name: 'YourComponentName',
    components: {
        Autocomplete
    }
}
```

Use the component into your template.

```html
<template>
    <div>
        <Autocomplete
            @input="getItems"
            :results="items"
        ></Autocomplete>
    </div>
</template>
```

## Properties

| Property | Type  | Description | Required | Default |
| :------: | :---: | :---------: | :------: | :-----: |
| results | Array | Items to display in the results list | No | [] |
| display-item | Function | Describes how to render each item in results | No | **return** item.name |
| debounce | Integer | Time to wait before each call to the ***@input*** event | No | 0 |
| max | Integer | Define a render limit for **results** items | No | 10 |
| placeholder | String | Default input placeholder | No | '' |
| use-html-for-results | Boolean | If true, displayItem method will display results as html | No | false |
| input-class | Array | Override input default classes | No | [] |
| results-container-class | Array | Override results container default classes | No | [] |
| results-item-class | Array | Override results item default classes | No | [] |

## Events

| Event | Description |
| :---: | :---------: |
| **@input** | Triggered on user input, should update the local results list |
| **@onSelect** | Triggered when user click on a list item and return the selected item |

## License

MIT
