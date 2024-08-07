import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import gambar from "../assets/pokeball.svg";
import searchIcon from "../assets/search_24dp_FF0000_FILL0_wght400_GRAD0_opsz24.svg"; // Pastikan path ini benar
import "boxicons/css/boxicons.min.css";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonResponse {
  results: Pokemon[];
}

const Home: React.FC = () => {
  const [pokedata, setPokedata] = useState<Pokemon[]>([]);
  const [pokeFind, setPokeFind] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Pokemon[]>([]);
  const [searchBy, setSearchBy] = useState<string>("name");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const data: PokemonResponse = await response.json();
        setPokedata(data.results);
        setFilteredData(data.results);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleSearch = () => {
      let find: Pokemon[] = [];

      if (pokeFind) {
        find = pokedata.filter((pokemon) => {
          const pokemonID = getPokemonId(pokemon.url);
          if (searchBy === "name") {
            return pokemon.name.toLowerCase().includes(pokeFind.toLowerCase());
          } else if (searchBy === "id") {
            return formatPokemonId(pokemonID)
              .toLowerCase()
              .includes(pokeFind.toLowerCase());
          }
          return false;
        });
      } else {
        find = pokedata;
      }

      setFilteredData(find);
    };

    handleSearch();
  }, [pokeFind, searchBy, pokedata]);

  const getPokemonId = (url: string) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };

  const formatPokemonId = (id: string) => {
    return `#${id.padStart(3, "0")}`;
  };

  const clearSearch = () => {
    setPokeFind("");
    navigate(`/`);
  };

  if (!pokedata.length) {
    return (
      <div className="text-center">
        <h1 className="font-bold text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <div className={`text-center bg`}>
      <div id="header">
        <h1 className="font-bold font-poppins text-3xl text-white flex p-4">
          <img src={gambar} alt="pokedex" className="mr-2" />
          <Link to="/">Pokédex</Link>
        </h1>
      </div>
      <div className="flex m-3 justify-between items-center relative">
        <div className="relative w-4/5">
          <input
            className="border-solid rounded-full w-full p-2 pl-10 pr-10"
            type="text"
            id="search-term"
            placeholder="Search"
            value={pokeFind}
            onChange={(e) => setPokeFind(e.target.value)}
            style={{
              backgroundImage: `url(${searchIcon})`,
              backgroundPosition: "10px center",
              backgroundRepeat: "no-repeat",
              paddingLeft: "40px",
            }}
          />
          {pokeFind && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 font-bold text-red-600"
              onClick={clearSearch}
            >
              ✕
            </button>
          )}
        </div>

        <div className="relative">
          <button
            className="border-solid rounded-full p-2 bg-white text-red-600 w-10"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {searchBy === "name" ? "A" : "#"}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 bg-red-500 rounded-md mt-2 shadow-lg z-10 p-2 text-left">
              <h1 className="text-white font-semibold pb-4 text-center">
                Sort by:
              </h1>
              <div id="card" className="bg-white rounded-md">
                <label className="cursor-pointer p-2 hover:bg-gray-200 flex items-center">
                  <input
                    type="radio"
                    name="searchBy"
                    value="id"
                    checked={searchBy === "id"}
                    onChange={() => {
                      setSearchBy("id");
                      setDropdownOpen(false);
                    }}
                    className="mr-2 custom-radio"
                  />
                  Number
                </label>
                <label className="block cursor-pointer p-2 hover:bg-gray-200">
                  <input
                    type="radio"
                    name="searchBy"
                    value="name"
                    checked={searchBy === "name"}
                    onChange={() => {
                      setSearchBy("name");
                      setDropdownOpen(false);
                    }}
                    className="mr-2 custom-radio"
                  />
                  Name
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* card  */}
      <div id="main-content" >
        <ul className="grid grid-cols-3 pt-3 p-2 bg-white m-3 rounded-lg min-h-40 ">
          {filteredData.map((pokemon, index) => {
            const id = getPokemonId(pokemon.url);
            // Perbarui URL gambar ke yang lebih stabil
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
            return (
              <div
              className="relative flex flex-col border p-2 border-gray-300 shadow-slate-400 shadow-sm rounded-md bg-fuchsia-50 m-1 text-xs font-semibold cursor-pointer"
              key={index}
              >
              <div className="absolute bg-slate-200 w-full h-12 rounded-md mr-3 z-10  left-0 bottom-0" />
                <p className="text-end opacity-70 z-20">
                  {formatPokemonId(id)}
                </p>
                <Link to={`/pokemon/${id}`} className="z-20">
                  <img
                    src={imageUrl}
                    alt={pokemon.name}
                    className="w-24 h-24 mx-auto"
                    onError={(e) => {
                      e.currentTarget.src = gambar;
                    }}
                  />
                </Link>
                <p className="capitalize z-20 ">{pokemon.name}</p>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
