<template>
  <div class="details-wrapper">
    <h1>{{ pokemon.name }}</h1>
    <h3>id: {{ pokemon.id }} | weight: {{ pokemon.weight }}</h3>
    <hr>
    <h4>Types</h4>
    <p>{{ pokemon.types }}</p>
    <hr>
    <h4>Abilities</h4>
    <p>{{ pokemon.abilities}}</p>
    <hr>
    <h4>Forms</h4>
    <p>{{ pokemon.forms }}</p>
    <h4>Species</h4>
    <p>{{ pokemon.species }}</p>
    <div
        @click="$emit('close-details')"
        class="close"
    />
  </div>
</template>

<script>
export default {
  name: 'PokemonDetails',
  props: {
    pokemon: Object
  }
};
</script>

<style lang="scss">
.details-wrapper {
  position: fixed;
  top: calc(50vh - 250px);
  left: calc(50vw - 150px);
  z-index: 10;
  height: 500px;
  width: 300px;
  background-color: #3B4CCA;
  color: white;
  border-radius: 5px;

  h1, h3 {
    margin-bottom: 10px;
  }

  h4 {
    margin: 10px 0;
  }

  hr {
    width: 90%
  }

  .close{
    position: absolute;
    right: 7px;
    top: 7px;
    width: 30px;
    height: 30px;
    cursor: pointer;

    &::before, &::after {
        position: absolute;
        content: '';
        top: 14px;
        right: 5px;
        width: 20px;
        height: 2px;
        background: white;
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
