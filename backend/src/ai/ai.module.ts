import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { ConfigModule } from '@nestjs/config';
import { AiController } from './ai.controller';

@Module({
  imports: [ConfigModule],
  providers: [AiService],
  exports: [AiService],
  controllers: [AiController],
})
export class AiModule {}

