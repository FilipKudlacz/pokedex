class Pokemon {
  constructor (name, id, types, abilities, forms, species, weight) {
    this.name = name;
    this.id = id;
    this.types = this.stringifyTypesArray(types);
    this.abilities = this.stringifyAbilitiesArray(abilities);
    this.forms = this.stringifyArray(forms);
    this.species = species.name;
    this.weight = weight;
  }

  stringifyArray (items) {
    let result = '';

    if (items.length > 0) {
      items.forEach(item => {
        result += item.name + ', ';
      });
      return result.slice(0, (result.length - 2));
    }
    return items[0];
  }

  stringifyAbilitiesArray (abilities) {
    let result = '';

    if (abilities.length > 0) {
      abilities.forEach(item => {
        result += item.ability.name + ', ';
      });
      return result.slice(0, (result.length - 2));
    }
    return abilities[0].ability.name;
  }

  stringifyTypesArray (types) {
    let result = '';

    if (types.length > 0) {
      types.forEach(item => {
        result += item.type.name + ', ';
      });
      return result.slice(0, (result.length - 2));
    }
    return types[0].type.name;
  }
}

export default Pokemon;
