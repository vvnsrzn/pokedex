import React, { Component } from "react";
import ReactDOM from "react-dom";
import logo from "./logo.svg";
import "./App.css";

class PokemonRow extends React.Component {
  render() {
    const pokemon = this.props.pokemon;

    return (
      <tr>
        <td>{pokemon.fr}</td>
        <img src={pokemon.image} />
      </tr>
    );
  }
}

class PokemonTable extends React.Component {
  lang() {
    var lang;
    var fr = this.props.fr;
    var en = this.props.en;
    var de = this.props.de;
    if (this.props.fr) {
      lang = fr;
    } else if (this.props.de) {
      lang = de;
    } else {
      lang = en;
    }
    return lang;
  }

  render() {
    var pokemons = require("./pokedex.json");
    const filterText = this.props.filterText;

    const rows = [];

    pokemons.forEach(pokemon => {
      if (pokemon.fr.indexOf(filterText) === -1) {
        return;
      }
      // if (inStockOnly && !pokemon.stocked) {
      //   return;
      // }
      rows.push(<PokemonRow pokemon={pokemon} key={pokemon.id} />);
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleLangChange = this.handleLangChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleLangChange(e) {
    this.props.onLangChange(e.target.checked);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input type="checkbox" checked={this.props.fr} /> Français
          <input type="checkbox" checked={this.props.en} /> English
          <input type="checkbox" checked={this.props.de} /> Deutch
        </p>
      </form>
    );
  }
}

class FilterablePokemonTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      lang: ""
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleLang = this.handleLang.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleLang(lang) {
    this.setState({
      lang: lang
    });
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
          onLangChange={this.handleLang}
        />
        <PokemonTable
          pokemons={this.props.pokemons}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}

var pokemons = require("./pokedex.json");

ReactDOM.render(
  <FilterablePokemonTable pokemons={pokemons} />,
  document.getElementById("container")
);
