import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService {
  private openai: OpenAIApi;

  constructor(private configService: ConfigService) {
    const configuration = new Configuration({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),  // Get 
API Key from .env
    });

    this.openai = new OpenAIApi(configuration);
  }

  async generateText(prompt: string): Promise<string> {
    try {
      const response = await this.openai.createCompletion({
        model: "gpt-4o-mini",
        prompt,
        max_tokens: 150,
      });

      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to generate AI response');
    }
  }
}

