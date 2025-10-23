import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IPokemonResponse } from './interfaces/pokemon-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { FetchAdapter } from 'src/common/http-adapters/http-adapter-implementation';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: FetchAdapter
    // private readonly pokemonService: PokemonService
  ){}

  async loadDB() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=650&offset=0';
    try {
      const response = await this.http.get<IPokemonResponse>(url);

      const arrayPokemon: { no: number, name: string }[] = [];
      
      response.results.forEach(({ name, url }) => {
        const segments = url.split('/');
        const no = +segments[segments.length - 2];

        arrayPokemon.push({ no, name });

      });

      // vaciamos primero y luego insertamos para evitar el error de repetidos
      await this.pokemonModel.deleteMany({}) // delete * from pokemon
      await this.pokemonModel.insertMany(arrayPokemon);

      return 'Seed Executed!';

    } catch (error) {
      throw new InternalServerErrorException(`Error to load DB with seed ${error}`);
    }
  }
}
