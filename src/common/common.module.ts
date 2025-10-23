import { Module } from '@nestjs/common';
import { FetchAdapter } from './http-adapters/http-adapter-implementation';

@Module({
  providers: [ FetchAdapter ],
  exports: [ FetchAdapter ]
})
export class CommonModule {}
