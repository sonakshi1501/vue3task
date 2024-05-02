<template>
    <form @submit.prevent="handleSubmit" class="form">
      <div v-for="(block, index) in formBlocks" :key="index" class="input-group">
        <label v-if="block.type !== 'checkbox'">{{ block.label }}:</label>
        <!-- Checkbox -->
        <input
          v-if="block.type !== 'checkbox' && block.type !== 'time'"
          v-model="formData[block.key]"
          @input="updateError(block.key)"
          :type="block.type"
        />
        <!--  -->
        <!-- Time -->
        <div v-else-if="block.type === 'time'" class="time-group">
          <input
            v-model="formData[block.key]"
            :type="block.type"
            @input="updateError(block.key)"
          />
          <label>{{ block.label }} : </label>
        </div>
        <!-- Time -->
        <!-- Normal input fields -->
        <input
          v-else
          v-model="formData[block.key]"
          :type="block.type"
          @input="updateError(block.key)"
        />
        <span v-if="errors[block.key]" class="error">{{
          errors[block.key]
        }}</span>
        <!-- Normal input fields -->
      </div>
      <button type="submit" class="submit-btn">Submit</button>
    </form>
  </template>
    
    <script setup>
  import { reactive } from "vue";
  import formBlocks from "../Forms/formBlocks.json"
  const formData = reactive({}); // Reactive form data object
  const errors = reactive({}); // Object to store validation errors
  
  const handleSubmit = () => {
    validateForm();
    if (Object.keys(errors).length === 0) {
      // Form is valid, submit data
      console.log("Form data:", formData);
    } else {
      console.log("Form has errors. Please fix them.");
    }
  };
  
  const validateForm = () => {
    // Clear previous errors
    for (const key of Object.keys(errors)) {
      delete errors[key];
    }
  
    formBlocks.forEach((block) => {
      console.log(formData[block.key], "formData[block.key]");
      if (!formData[block.key]) {
        errors[block.key] = `${block.label} is required.`;
      } else {
        delete errors[block.key]; // Remove error if value is present
      }
    });
  };
  
  const updateError = (key) => {
    if (errors[key]) {
      delete errors[key]; // Remove error message when user starts typing
    }
  };
  
  </script>
    
  <style scoped>
  .form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .input-group {
    margin-top: 10px;
  }
  
  .label {
    margin-bottom: 5px;
  }
  
  .time-group {
    display: flex;
    align-items: center;
  }
  
  .error {
    color: red;
    margin-top: 5px;
  }
  
  .submit-btn {
    margin-top: 15px;
  }
  </style>
    