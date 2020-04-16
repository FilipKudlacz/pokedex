<template>
  <div class="pagination-wrapper">
    <div
        class="minus"
        @click="previousPage"
    />
    <p>Page {{ currentPage }}</p>
    <div
        class="plus"
        @click="nextPage"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: Number,
    lastPage: Number
  },
  methods: {
    previousPage () {
      if (this.currentPage > 0) {
        this.$emit('reduce-page');
      }
    },
    nextPage () {
      if (this.currentPage < this.lastPage) {
        this.$emit('increase-page');
      }
    }
  }
};
</script>

<style lang="scss">
.pagination-wrapper {
  display: flex;
  justify-content: space-evenly;
  width: 250px;
  height: 50px;
  border-radius: 5px;
  margin-left: calc(50vw - 125px);
  background-color: #3B4CCA;
  color: white;

  p {
    font-weight: bold;
    margin: 0;
    padding: 5px;
    font-size: 30px;
  }

  .minus, .plus {
    display: inline-block;
    margin: 10px;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  .minus::before {
      content: " ";
      position: relative;
      display: block;
      background-color: #fff;
      width: 20px;
      height: 4px;
      top: 13px;
      left: 4px;
  }

  .plus::after {
      content: " ";
      position: relative;
      display: block;
      background-color: #fff;
      height: 20px;
      width: 4px;
      left: 13px;
      top: 1px;
  }
  .plus::before {
      content: " ";
      position: relative;
      display: block;
      background-color: #fff;
      width: 20px;
      height: 4px;
      top: 13px;
      left: 4px;
  }
}
</style>
