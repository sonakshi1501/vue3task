<template>
    <div>
    <hr>
    <h1>provide and Inject process</h1>
    <h2>{{ name }}</h2> 
    <h2>{{ duration }}</h2>
    </div>
</template>

<script setup>
import { inject } from "vue"

// Provide and inject to pass the data
const {name, duration} = inject('cources')
</script>

<style lang="scss" scoped>

</style>