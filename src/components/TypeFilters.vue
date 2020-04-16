<template>
  <div class="outer-wrapper">
    <h3>Filter By Pokemon Type</h3>
    <div class="active-wrapper">
      <p>Currently Active: </p>
      <div
          @click="resetActive"
          class="type"
          :class="{ 'non-clickable': currentlyActive==='' }"
      >
        {{ currentlyActive===''?'None':currentlyActive }}
        <div class="active"/>
      </div>
    </div>
    <div class="type-filters-wrapper">
      <div
          v-for="type in typesArray"
          :key="type.url"
          class="type"
          @click="setType(type)"
      >
        {{ type.name }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TypeFilters',
  data () {
    return ({
      typesArray: [],
      currentlyActive: ''
    });
  },
  mounted () {
    axios.get('https://pokeapi.co/api/v2/type')
      .then(res => {
        this.typesArray = res.data.results;
      })
      .catch(e => {
        console.log(e);
      });
  },
  methods: {
    resetActive () {
      this.currentlyActive = '';
      this.$emit('reset');
    },
    setType (type) {
      this.$emit('filter-by-type', type.url);
      this.currentlyActive = type.name;
    }
  }
};
</script>

<style lang="scss">
.type-filters-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 0 5px;

}
.type {
  margin: 10px;
  height: 30px;
  width: 120px;
  border-radius: 15px;
  background-color: lightgray;
  border: 2px solid grey;
  cursor: pointer;
}

.active-wrapper {
  display: flex;
  margin-left: calc(50vw - 120px);

  .non-clickable {
    cursor: unset;
  }

  .active {
    position: relative;
    top: -24px;
    right: 6px;
    &::before, &::after {
        position: absolute;
        content: '';
        top: 14px;
        right: 5px;
        width: 14px;
        height: 2px;
        background: black;
        display: block;
    }

    &::before {
        transform: rotate(-45deg);
    }

    &::after {
        transform : rotate(45deg);
    }
  }
}
</style>
