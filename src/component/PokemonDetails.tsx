import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import gwidth from "../assets/weight.svg";
import gheight from "../assets/straighten.svg";
import bgmain from "../assets/pokeballBG.svg";

interface PokemonDetails {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  sprites: { front_default: string };
}

const typeColors: { [key: string]: string } = {
  normal: "bg-[#A8A77A]",
  fire: "bg-[#EE8130]",
  water: "bg-[#6390F0]",
  electric: "bg-[#F7D02C]",
  grass: "bg-[#7AC74C]",
  ice: "bg-[#96D9D6]",
  fighting: "bg-[#C22E28]",
  poison: "bg-[#A33EA1]",
  ground: "bg-[#E2BF65]",
  flying: "bg-[#A98FF3]",
  psychic: "bg-[#F95587]",
  bug: "bg-[#A6B91A]",
  rock: "bg-[#B6A136]",
  ghost: "bg-[#735797]",
  dragon: "bg-[#6F35FC]",
  dark: "bg-[#705746]",
  steel: "bg-[#B7B7CE]",
  fairy: "bg-[#D685AD]",
};

const textColors: { [key: string]: string } = {
  normal: "text-[#A8A77A]",
  fire: "text-[#EE8130]",
  water: "text-[#6390F0]",
  electric: "text-[#F7D02C]",
  grass: "text-[#7AC74C]",
  ice: "text-[#96D9D6]",
  fighting: "text-[#C22E28]",
  poison: "text-[#A33EA1]",
  ground: "text-[#E2BF65]",
  flying: "text-[#A98FF3]",
  psychic: "text-[#F95587]",
  bug: "text-[#A6B91A]",
  rock: "text-[#B6A136]",
  ghost: "text-[#735797]",
  dragon: "text-[#6F35FC]",
  dark: "text-[#705746]",
  steel: "text-[#B7B7CE]",
  fairy: "text-[#D685AD]",
};

const statAbbreviations: { [key: string]: string } = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SATK",
  "special-defense": "SDEF",
  speed: "SPD",
};

const getStatAbbreviation = (name: string) => {
  return statAbbreviations[name] || name.toUpperCase();
};

const formatStatValue = (value: number) => {
  return value;
};

const getBackgroundColor = (type: string) => {
  return typeColors[type] || "bg-gray-500";
};

const PokemonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(
    null
  );
  const [pokemonDescription, setPokemonDescription] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data: PokemonDetails = await response.json();
        setSelectedPokemon(data);

        const speciesResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );
        const speciesData = await speciesResponse.json();
        const englishEntry = speciesData.flavor_text_entries.find(
          (entry: any) => entry.language.name === "en"
        );
        if (englishEntry) {
          setPokemonDescription(
            englishEntry.flavor_text.replace(/\n|\f/g, " ")
          );
        }
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  const getTypeColor = (type: string) => {
    return typeColors[type] || "bg-gray-500";
  };

  const getTextColor = (type: string) => {
    return textColors[type] || "text-gray-500";
  };

  const handleNextPokemon = () => {
    if (selectedPokemon) {
      navigate(`/pokemon/${selectedPokemon.id + 1}`);
    }
  };

  const handlePreviousPokemon = () => {
    if (selectedPokemon && selectedPokemon.id > 1) {
      navigate(`/pokemon/${selectedPokemon.id - 1}`);
    }
  };

  if (!selectedPokemon) {
    return (
      <div className="text-center">
        <h1 className="text-white font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div
      className={`relative p-4 max-w-md w-full z-0 min-h-screen bg-cover bg-center justify-center ${getTypeColor(
        selectedPokemon.types[0].type.name
      )}`}
    >
      <img
        src={bgmain}
        alt="Pokeball Background"
        className="absolute top-0 right-0 w-auto h-auto max-w-none opacity-70"
      />
      <div className="relative z-10">
        <div id="header" className="flex justify-between items-end mb-4 z-10">
          <h2 className="text-center text-2xl font-bold capitalize text-white">
            <button onClick={() => navigate(`/`)} className="text-white">
              <i className="bx bx-left-arrow-alt bx-sm"></i>
            </button>
            {selectedPokemon.name}
          </h2>
          <p className="text-right text-white self-stretch">
            {`#${selectedPokemon.id.toString().padStart(3, "0")}`}
          </p>
        </div>

        <div className="flex items-center justify-center mb-4 absolute w-full">
          <button onClick={handlePreviousPokemon} className="text-white mr-4">
            <i className="bx bx-chevron-left bx-sm"></i>
          </button>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon.id}.png`}
            alt={selectedPokemon.name}
            className="w-48"
            onError={(e) => {
              e.currentTarget.src = selectedPokemon.sprites.front_default;
            }}
          />
          <button onClick={handleNextPokemon} className="text-white ml-4">
            <i className="bx bx-chevron-right bx-sm"></i>
          </button>
        </div>

        <div className="bg-white rounded-md p-8 mt-36 pt-16">
          <div className="flex flex-wrap gap-2 justify-center">
            {selectedPokemon.types.map((typeInfo, index) => (
              <span
                key={index}
                className={`px-2 pb-1 rounded-full text-white font-bold capitalize ${getTypeColor(
                  typeInfo.type.name
                )}`}
              >
                {typeInfo.type.name}
              </span>
            ))}
          </div>
          <div id="about">
            <h3
              className={`text-sm font-bold text-center mt-4 ${getTextColor(
                selectedPokemon.types[0].type.name
              )}`}
            >
              About
            </h3>
            <div className="grid grid-cols-3 justify-center items-center mt-2">
              <div className="border-r-2 border-black/15">
                <p className="text-xs flex text-center justify-center mt-3 mb-2">
                  <img src={gwidth} alt="width icon" />
                  {selectedPokemon.weight / 10} kg
                </p>
                <p className="text-xs text-black/45 text-center">Weight</p>
              </div>
              <div className="border-r-2 border-black/15">
                <p className="text-xs flex text-center justify-center mt-3 mb-2">
                  <img src={gheight} alt="height" />
                  {selectedPokemon.height / 10} m
                </p>
                <p className="text-xs text-black/45 text-center">Height</p>
              </div>
              <div>
                <ul>
                  {selectedPokemon.abilities.map((abilityInfo, index) => (
                    <li key={index} className="text-center text-xs">
                      {abilityInfo.ability.name}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-black/45 text-center">Abilities</p>
              </div>
            </div>
            {pokemonDescription && (
              <div className="mt-5">
                <p className=" text-black text-xs">
                  {pokemonDescription}
                </p>
              </div>
            )}
          </div>

          <div className="bg-white text-black  rounded-lg mb-4 pt-5">
            <h2
              className={`text-sm font-bold mb-2 text-center ${getTextColor(
                selectedPokemon.types[0].type.name
              )}`}
            >
              Base Stats
            </h2>
            {selectedPokemon.stats.map((stat) => (
              <div
                key={stat.stat.name}
                className="grid grid-cols-[80px_1fr] items-center font-bold"
              >
                <div className="grid grid-cols-2 ">
                  <span
                    className={`text-end pr-5 text-xs  ${getTextColor(
                      selectedPokemon.types[0].type.name
                    )}`}
                  >
                    {getStatAbbreviation(stat.stat.name)}
                  </span>
                  <span className="pl-3 text-xs border-s-2">
                    {formatStatValue(stat.base_stat)}
                  </span>
                </div>
                <div className="w-auto bg-gray-300 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${getBackgroundColor(
                      selectedPokemon.types[0].type.name
                    )}`}
                    style={{ width: `${(stat.base_stat / 200) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
