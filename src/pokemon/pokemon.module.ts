import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';

import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    ConfigModule, // para poder usar el servicio de configuracion
    MongooseModule.forFeature([
      {
        name: Pokemon.name, // este name proviede de documents
        schema: PokemonSchema
      }
    ])
  ],
  exports: [ 
    MongooseModule, // lo exporto asi porque ya va configurado desde arriba
    // PokemonService
    // NOTA puedo exportar el modelo de base de datos o el servicio
    // preferi el servicio para controlar la inserciones repetidas
  ]
})
export class PokemonModule {}
