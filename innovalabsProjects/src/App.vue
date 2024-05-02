<template>
  <div>
    <parent />
    <hr />
    <!-- Named slot -->
    <slotProp>
      <template #header>
        <h1>I am Header</h1>
      </template>
      <template #main>
        <h2>I am Main</h2>
      </template>
      <template #footer>
        <h3>I am footer</h3>
      </template>
    </slotProp>

    <!-- <slotProp v-slot="{nm, age}">
      <h1>Name: {{nm}}</h1>
      <h2>Age:{{ age}}</h2>
    </slotProp> -->

    <provideInject />

    <hr />

    <h1>API Integration using Vuex, also include and filter function</h1>
    <userListVue />
    <hr />

    <h1>Dynamic forms</h1>
    <DynamicForms />
  </div>
</template>

<script setup>
import DynamicForms from "./components/DynamicForms.vue";
import parent from "./components/parent.vue";
import slotProp from "./components/SlotPropUsage.vue";
import provideInject from "./components/provide-inject.vue";
import { provide } from "vue";
import UserListVue from "./components/UserList.vue";
//   Provide and inject all to pass the data
provide("cources", {
  name: "Vue.js",
  duration: "6 months",
});
</script>

<style lang="scss" scoped>
</style>