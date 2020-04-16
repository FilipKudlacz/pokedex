<template>
  <div class="results-wrapper">
    <div
        v-for="result in currentlyDisplayed"
        :key="result.url"
        class="result"
        @click="$emit('open-description', result)"
    >
      {{ result.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Results',
  props: {
    resultsList: Array,
    currentPage: Number,
    resultsPerPage: Number
  },
  computed: {
    currentlyDisplayed () {
      return this.resultsList.slice(this.currentPage * this.resultsPerPage,
        (this.currentPage + 1) * this.resultsPerPage);
    }
  }
};
</script>

<style lang="scss">
.results-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 50px;

  .result {
    margin: 20px;
    padding: 3px 15px;
    height: 60px;
    border-radius: 5px;
    font-size: 40px;
    background-color: #FFDE00;
    box-shadow: 5px 5px 3px 3px rgba(179,161,37,0.4);
    cursor: pointer;
  }
}
</style>
