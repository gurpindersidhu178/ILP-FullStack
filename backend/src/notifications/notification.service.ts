import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class NotificationService {
  private openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async chatbotResponse(userQuery: string): Promise<string> {
    const response = await this.openai.createCompletion({
      model: 'gpt-4',
      prompt: `User Query: ${userQuery}\nAI Response: `,
      max_tokens: 200,
    });

    return response.data.choices[0].text.trim();
  }
}

