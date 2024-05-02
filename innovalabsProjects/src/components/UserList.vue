<template>
    <div style="text-align: center">
      <!-- For Filter -->
      <div class="input-group">
        <input type="text" v-model="nameQuery" placeholder="Search by name" />
        <input type="text" v-model="emailQuery" placeholder="Search by email" />
        <button @click="applyFilters">Apply Filter</button>
        <button @click="clearAllFilters">Clear Filter</button>
      </div>
      <!-- For Filter -->
      <br />
      <!-- Search bar -->
      <input style="margin-bottom: 5px;" type="text" v-model="searchQuery" placeholder="Search by name" />
      <!-- Search bar -->
  
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <table class="data-table" v-else>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedData" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.website }}</td>
          </tr>
        </tbody>
        <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          Next
        </button>
      </div>
      </table>
      
    </div>
  </template>
  
  <script>
  import { computed, ref } from "vue";
  import { useStore } from "vuex";
  
  export default {
    name: "UserList",
    setup() {
      const nameQuery = ref("");
      const emailQuery = ref("");
      const currentPage = ref(1);
      const pageSize = 5; // Adjust as needed
      const store = useStore();
      
      // To get all the data from allUser
      const loading = computed(() => store.state.loading);
      const error = computed(() => store.state.error);
      const users = computed(() => store.getters["allUsers"]);
  
      //get: how to get the current value.
      //set: This part defines how to update 
      const searchQuery = computed({
        get: () => store.state.searchData,
        set: (val) => store.commit("setSearch", val),
      });
  
      const filteredData = computed(() => store.getters["filteredTableData"]);
  
  // slice(start, end) is used on arrays to extract a portion of that array.
      const paginatedData = computed(() => {
        const start = (currentPage.value - 1) * pageSize;
        const end = start + pageSize;
        return filteredData.value.slice(start, end);
      });
      // Math.ceil(...) rounds up the result to the nearest whole number.
      const totalPages = computed(() =>
        Math.ceil(filteredData.value.length / pageSize)
      );
  
      // FetchUser from the store
      // async keyword indicates that this function will return a promise
      //await is pause the execution of the function until the store.dispatch("fetchUsers")
      async function fetchUsers() {
        await store.dispatch("fetchUsers");
      }
      fetchUsers();
  
      // Next Page
      function nextPage() {
        if (currentPage.value < totalPages.value) {
          currentPage.value++;
        }
      }
  
      // To go on Previous Page
      function prevPage() {
        if (currentPage.value > 1) {
          currentPage.value--;
        }
      }
      // Apply filter
      function applyFilters() {
        store.commit("setFilters", {
          name: nameQuery.value,
          email: emailQuery.value,
        });
        store.dispatch("applyFilters");
      }
  
      // clear filter
      function clearAllFilters() {
        store.dispatch("clearAllFilters");
        nameQuery.value = "";
        emailQuery.value = "";
        store.dispatch("fetchUsers");
      }
  
      return {
        users,
        loading,
        error,
        searchQuery,
        filteredData,
        currentPage,
        paginatedData,
        totalPages,
        nextPage,
        prevPage,
        nameQuery,
        emailQuery,
        applyFilters,
        clearAllFilters,
      };
    },
  };
  </script>
  
  <style scoped>
  .input-group {
    display: flex;
    gap: 10px; /* Adjust as needed */
  }
  .data-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .data-table th,
  .data-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .data-table th {
    background-color: #f2f2f2;
  }
  
  .data-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .data-table tr:hover {
    background-color: #f1f1f1;
  }
  
  .pagination {
    margin-top: 10px;
  }
  
  .pagination button {
    margin-right: 5px;
  }
  </style>
  