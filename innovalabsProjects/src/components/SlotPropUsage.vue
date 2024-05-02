<template>
  <div>
    <h1>Slot Section Usage</h1>
    <!-- <slot></slot> -->
    <slot name="header"></slot>

    <slot name="main"></slot>
    <slot name="footer"></slot>
    <!-- <slot nm="Mohan" :age="27"> </slot> -->

  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
</style>