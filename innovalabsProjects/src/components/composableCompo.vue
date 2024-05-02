<template>
    <div>
        <hr />
    <!-- Composable function -->
    <h1>Composable function</h1>
    <p>Shared Data: {{ sharedData }}</p>
    <button @click="updatedSharedData">Update Shared Data</button>

   
    </div>
</template>

<script setup>
import {stateData} from "../composable/common"
// Composable button click to see change
const {sharedData} = stateData()
function updatedSharedData() {
    sharedData.value = 'Updated Shared Data from child 2'
}
</script>

<style lang="scss" scoped>

</style>