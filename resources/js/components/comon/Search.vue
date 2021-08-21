<template>
  <div class="w-25">
    <v-autocomplete
      class="mx-4"
      flat
      hide-no-data
      hide-details
      label="Search.."
      solo-inverted
      clearable
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      return-object
      v-model="searchData"
      auto-select-first
    >
      <template v-slot:item="{ item }">
        <v-list-item
          link
          exact
          :to="item.value.search_url"
          v-html="item.value.search_text"
        ></v-list-item>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import config from "../../config";

export default {
  name: "Search",
  data() {
    return {
      config,
      state: "open",

      isLoading: false,
      SearchResults: [],
      search: "",
      searchData: "null",
    };
  },

  update() {
    this.SearchResults = [];
    this.search = "";
  },
  computed: {
    items() {
      let results = [];
      this.SearchResults.map((entry) => {
        results.push({
          text: entry.search_text,
          value: entry,
        });
      });
      return results;
    },
  },
  watch: {
    search(val) {
      if (val === null) {
        val = "";
        this.search = "";
      }
      let _this = this;

      let config = _this.$store.getters.headers;
      // Items have already been loaded

      // Items have already been requested

      if (val.length < 3) {
        _this.SearchResults = [];
        return;
      }

      // Lazily load input items

      let formData = new FormData();

      formData.append("keyword", val);

      _this.isLoading = true;
      axios
        .post("search", formData, config)
        .then(function (response) {
          if (response.data.success) {
            _this.SearchResults = response.data.data.searchResults;
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => (_this.isLoading = false));
    },
    $route: function (to, from) {
      setTimeout(() => {
        this.SearchResults = [];
        this.search = "";
      }, 2000);
    },
  },
  methods: {},
};
</script>

<style src="../../styles/Search.scss" lang="scss"></style>


