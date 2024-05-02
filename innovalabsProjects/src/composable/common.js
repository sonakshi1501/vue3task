import {ref} from 'vue'

export function stateData() {
    const sharedData = ref('I am Composable, you can share me anywhere')
    return {
        sharedData
    }
}


