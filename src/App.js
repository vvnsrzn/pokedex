import React, { Component } from "react";
import ReactDOM from "react-dom";
import logo from "./logo.svg";
import "./App.css";

class PokemonRow extends React.Component {
  render() {
    const pokemon = this.props.pokemon;

    return (
      <tr>
        <td>{pokemon[this.props.lang]}</td>
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
      rows.push(<PokemonRow pokemon={pokemon} lang={this.props.lang} key={pokemon.id} />);
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
    // this.handleLangChange = this.handleLangChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
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
          <input type="radio" id="contactChoice1"
           name="contact" onChange={this.props.onLangChange} value="fr" checked={this.props.lang=='fr'}/>
          <label for="contactChoice1">Français</label>

          <input type="radio" id="contactChoice2"
           name="contact" onChange={this.props.onLangChange} value="en" checked={this.props.lang=='en'}/>
          <label for="contactChoice2">English</label>

          <input type="radio" id="contactChoice3"
           name="contact" onChange={this.props.onLangChange} value="de" checked={this.props.lang=='de'}/>
          <label for="contactChoice3">Deutch</label>
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
      lang: "fr"
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleLang = this.handleLang.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleLang(event) {
    console.log('suce', this)
    this.setState({
      lang: event.target.value
    });
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
          lang={this.state.lang}
          onLangChange={this.handleLang.bind(this)}
        />
        <PokemonTable
          pokemons={this.props.pokemons}
          filterText={this.state.filterText}
          lang={this.state.lang}
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
