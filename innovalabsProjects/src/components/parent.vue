<template>
  <div>
    <h2>Parent Component</h2>
    <p>Recieved data from Child component: {{ childData }}</p>
    <child
      :message="parentMessage"
      @childEvent="handleChildEvent"
      @increaseCount="(n) => (count += n)"
    />
    <h1>count: {{ count }}</h1>

    <ComposableCompo />
  </div>
</template>
  
  <script setup>
import { ref } from "vue";
import child from "./child.vue";
import ComposableCompo from "./composableCompo.vue";
// Parent to Child
const count = ref(0);
const parentMessage = ref("Hello I am parent!");
const childData = ref("");

// Arrow Function
const handleChildEvent = (dataFromChild) => {
  childData.value = dataFromChild;
};

</script>
  
  <style lang="scss" scoped>
</style>