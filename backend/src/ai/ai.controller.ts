import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate')
  async generate(@Body('prompt') prompt: string) {
    return { response: await this.aiService.generateText(prompt) };
  }
}

