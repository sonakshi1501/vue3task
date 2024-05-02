<template>
  <div>
    <h2>Child Component</h2>
    <p>Recieved from parent: {{ message }}</p>
    <button @click="sendDataToParent">
      Click on It to see the data from child to Parent
    </button>
    <br />
    <br />
    <button @click="$emit('increaseCount', 11)">Increase count</button>

    
  </div>
</template>
  
<script setup>

const props = defineProps(["message"]);
const emits = defineEmits(["childEvent"]);

// Normal Function
function sendDataToParent() {
  const newData = "Sending Data to Child";
  // Child to Parent
  emits("childEvent", newData);
}




</script>
  
  <style lang="scss" scoped>
</style>