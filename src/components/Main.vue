<template>
  <div class="app-wrapper">
    <div class="intro-wrapper">
      <img
          alt="Pokemon logo"
          src="./../assets/1200pxlogo.svg.png"
      >
    </div>
    <div class="main-container">
      <div class="pokeball" />
      <input
          v-model="searchPhrase"
          type="text"
          placeholder="pokemon name"
          @input="resetPage"
      >
      <Pagination
          :currentPage="currentPage"
          :lastPage="lastPage"
          @reduce-page="previousPage"
          @increase-page="nextPage"
          class="upper-pagination"
      />
      <Results
          :resultsList="displayArray"
          :currentPage="currentPage"
          :resultsPerPage="resultsPerPage"
          @open-description="openDescription"
      />
      <Pagination
          :currentPage="currentPage"
          :lastPage="lastPage"
          @reduce-page="previousPage"
          @increase-page="nextPage"
      />
    </div>
    <PokemonDetails
        :pokemon="selectedPokemon"
        v-if="isDetailsShown"
        @close-details="isDetailsShown = false"
    />
  </div>
</template>

<script>
import Results from './Results';
import Pagination from './Pagination';
import PokemonDetails from './PokemonDetails';

import Pokemon from './../pokemon';
import axios from 'axios';

const url = 'https://pokeapi.co/api/v2/';

export default {
  name: 'Main',
  components: {
    Results,
    Pagination,
    PokemonDetails
  },
  data () {
    return {
      searchPhrase: '',
      pokemonArray: [],
      currentPage: 0,
      resultsPerPage: 50,
      isDetailsShown: false,
      selectedPokemon: ''
    };
  },
  computed: {
    lastPage () {
      return Math.floor(this.pokemonArray.length / this.resultsPerPage);
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
    },
    openDescription (pokemon) {
      const self = this;
      axios.get(pokemon.url)
        .then(res => {
          self.selectedPokemon = new Pokemon(
            res.data.name,
            res.data.id,
            res.data.types,
            res.data.abilities,
            res.data.forms,
            res.data.species,
            res.data.weight
          );
          console.log(this.selectedPokemon);
        })
        .catch(e => {
          console.log(e);
        });

      this.isDetailsShown = true;
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
  }
  .main-container {
    width: 100vw;
    background-color: white;
    padding-bottom: 20px;

    input {
      margin-top: 140px;
      height: 40px;
      width: 300px;
      font-size: 20px;
      border: solid black;
      border-width: 0 0 2px 0;

      &:focus {
        outline: none;
      }
    }

    .upper-pagination {
      margin: 20px 0;
      margin-left: calc(50vw - 125px);
    }

    .pokeball {
      position: relative;
      width: 120px;
      height: 120px;
      background-color: black;
      border-radius: 50%;
      left: calc(50vw - 60px);
      top: -60px;

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
}

@media (max-width: 580px) {
  .app-wrapper {
    .intro-wrapper {
      img {
        height: 20vh;
      }
    }

    .main-container {
      input {
        margin-top: 140px;
        margin-bottom: 70px;
      }
    }
  }
}

@media (max-width: 470px) {
  .app-wrapper {
    .intro-wrapper {
      img {
        height: 15vh;
      }
    }
  }
}
</style>
