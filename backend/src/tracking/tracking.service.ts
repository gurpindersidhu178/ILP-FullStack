import { Injectable } from '@nestjs/common';
import { OpenAIApi, Configuration } from 'openai';

@Injectable()
export class TrackingService {
  private openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async predictDelay(shipmentData: any): Promise<string> {
    const prompt = `Predict shipment delay for this route: 
${JSON.stringify(shipmentData)}`;
    const response = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 100,
    });

    return response.data.choices[0].text.trim();
  }
}

