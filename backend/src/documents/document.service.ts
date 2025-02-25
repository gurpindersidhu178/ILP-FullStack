import { Injectable } from '@nestjs/common';
import { HuggingFaceApi } from '@huggingface/inference';

@Injectable()
export class DocumentService {
  private huggingFace: HuggingFaceApi;

  constructor() {
    this.huggingFace = new HuggingFaceApi(process.env.HF_ACCESS_TOKEN);
  }

  async extractText(imageBase64: string): Promise<string> {
    const response = await this.huggingFace.query({
      model: 'microsoft/trocr-base-stage1',
      inputs: imageBase64,
    });

    return response.text;
  }
}

