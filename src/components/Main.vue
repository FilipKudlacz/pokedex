<template>
  <div class="app-wrapper">
    <div class="intro-wrapper">
      <img
          alt="Pokemon logo"
          src="./../assets/1200pxlogo.svg.png"
      >
      <div class="pokeball" />
    </div>
    <div class="main-container">
      <input
          v-model="searchPhrase"
          type="text"
          placeholder="pokemon name"
          @input="resetPage"
      >
      <Results
          :resultsList="displayArray"
          :currentPage="currentPage"
          :resultsPerPage="resultsPerPage"
      />
      <Pagination
          :currentPage="currentPage"
          :lastPage="lastPage"
          @reduce-page="previousPage"
          @increase-page="nextPage"
      />
    </div>
  </div>
</template>

<script>
import Results from './Results';
import Pagination from './Pagination';
import axios from 'axios';

const url = 'https://pokeapi.co/api/v2/';

export default {
  name: 'Main',
  components: {
    Results,
    Pagination
  },
  data () {
    return {
      searchPhrase: '',
      pokemonArray: [],
      currentPage: 0,
      resultsPerPage: 50
    };
  },
  computed: {
    lastPage () {
      return Math.ceil(this.pokemonArray.length / this.resultsPerPage);
    },
    displayArray () {
      if (this.searchPhrase !== '') {
        return this.pokemonArray.filter(pokemon => pokemon.name.includes(this.searchPhrase));
      }
      return this.pokemonArray;
    }
  },
  mounted () {
    const self = this;

    axios.get(url + 'pokemon/?offset=0&limit=964')
      .then(res => {
        this.pokemonArray = res.data.results;
      })
      .catch(e => {
        console.log(e);
      });
  },
  methods: {
    nextPage () {
      this.currentPage += 1;
    },
    previousPage () {
      this.currentPage -= 1;
    },
    resetPage () {
      this.currentPage = 0;
    }
  }
};
</script>

<style scoped lang="scss">
.app-wrapper {
  margin-top: 15px;
  .intro-wrapper {
    background-color: red;
    height: 30vh;

    img {
      height: 25vh;
    }

    &::after {
      content: '';
      position: absolute;
      top: 30vh;
      left: 0;
      height: 35px;
      width: 100vw;
      background-color: black;
    }

    .pokeball {
      position: relative;
      width: 120px;
      height: 120px;
      background-color: black;
      border-radius: 50%;
      left: calc(50vw - 60px);
      top: -20px;

      &::after {
        position: absolute;
        top: 30px;
        left: 30px;
        content: '';
        width: 60px;
        height: 60px;
        background-color: white;
        border-radius: 50%;
        z-index: 2;
      }
    }
  }
  .main-container {
    width: 100vw;
    background-color: white;

    input {
      margin-top: 200px;
      height: 40px;
      width: 300px;
      font-size: 20px;
      border: solid black;
      border-width: 0 0 2px 0;

      &:focus {
        outline: none;
      }
    }
  }
}
</style>
