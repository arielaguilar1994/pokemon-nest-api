import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

import { Pokemon } from './entities/pokemon.entity';
import { ErrorDBCode } from 'src/core/error-db-code.enum';
import { PaginationDto } from 'src/common/dtos/pagination-dto';

@Injectable()
export class PokemonService {
  private defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit')!;
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleException(error, 'create');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    // desestructuracion con valor por defecto
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;
    return this.pokemonModel
      .find()
      .limit(limit!)
      .skip(offset)
      .sort({
        no: 1 //ordena ascendentemente
      })
      .select('-__v'); // quita la version
  }

  async findOne(search: string) {
    let pokemon: Pokemon | null = null;

    if (!isNaN(+search)) {
      pokemon = await this.pokemonModel.findOne({ no: search });
    } else if (isValidObjectId(search)) {
      pokemon = await this.pokemonModel.findById(search);
    } else {
      pokemon = await this.pokemonModel.findOne({
        name: RegExp(search.toLowerCase(), 'i'),
      });
    }

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, name or no "${search}" not found`,
      );

    return pokemon;
  }

  async update(search: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne(search);

      if (updatePokemonDto.name)
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

      await pokemon.updateOne(updatePokemonDto, { new: true });

      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleException(error, 'update');
    }
  }

  async remove(id: string) {
    const pokemon = await this.pokemonModel.findByIdAndDelete(id);

    if (!pokemon)
      throw new BadRequestException(`Pokemon with id "${id}" not found`);

    return pokemon;
  }

  private handleException(error: any, actionMessage: string) {
    if (error.code === ErrorDBCode.ALREADY_EXIST) {
      throw new BadRequestException(`Pokemon already exists`);
    }

    throw new InternalServerErrorException(
      `Can't ${actionMessage} pokemon - Check server logs`,
    );
  }
}
