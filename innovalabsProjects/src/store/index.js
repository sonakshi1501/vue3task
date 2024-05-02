import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  // State drives our application
  state: {
    users: [],
    error: null,
    loading: false,
    pagination: {
      currentPage: 1,
      perPage: 10,
    },
    searchData: "",
    filters: {
      name: "",
      email: "",
    },
  },
  // Getter are computed property which is based on the state
  getters: {
    allUsers(state) {
      return state.users;
    },
    filteredTableData(state) {
      const query = state.searchData.toLowerCase();
      const nameFilter = state.filters.name.toLowerCase();
      const emailFilter = state.filters.email.toLowerCase();
      return state.users.filter(
        (item) =>
          item.name.toLowerCase().includes(query) &&
          item.name.toLowerCase().includes(nameFilter) &&
          item.email.toLowerCase().includes(emailFilter)
      );
    },
    
  },
  // Change or Update our state
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setSearch(state, search) {
      state.searchData = search;
    },
    setFilters(state, filters) {
      state.filters = filters;
    },
    setCurrentPage(state, currentPage) {
      state.pagination.currentPage = currentPage;
    },
    setError(state, error) {
      state.error = error;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    clearFilters(state) {
      state.filters = {
        name: "",
        email: "",
      };
    },
  },
  // Async functions
  actions: {
    async fetchUsers({ commit, state }) {
      commit("setLoading", true);
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users?_page=${state.pagination.currentPage}&_limit=${state.pagination.perPage}`
        );
        commit("setUsers", response.data);
        commit("setError", null);
        commit('setLoading', false);
      } catch (error) {
        commit("setError", error.message);
        commit('setLoading', false);
      }
    },

    applyFilters({ commit, dispatch }) {
      commit("setCurrentPage", 1); // Reset pagination to first page
      dispatch("fetchUsers"); // Fetch users with applied filters
    },

    clearAllFilters({ commit }) {
      commit("clearFilters");
    },
  },
});
