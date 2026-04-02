import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService {
  private openai: OpenAI;
  private readonly logger = new Logger(AiService.name);

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
    } else {
      this.logger.warn('OPENAI_API_KEY not found in environment variables. AI features will be disabled.');
    }
  }

  /**
   * Scans an invoice image and extracts product items using OpenAI Vision.
   * @param imageBase64 Base64 string of the invoice image
   */
  async scanInvoice(imageBase64: string) {
    if (!this.openai) {
      throw new Error('AI Service not initialized. Check OpenAI API Key.');
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              { 
                type: "text", 
                text: "You are an automated invoice scanner for a restaurant. Extract all inventory items from this invoice image. Return only a JSON object with an 'items' array where each item has 'name', 'quantity' (number), and 'unit' (e.g., 'kg', 'units', 'liters', 'box')." 
              },
              {
                type: "image_url",
                image_url: {
                  "url": `data:image/jpeg;base64,${imageBase64}`,
                },
              },
            ],
          },
        ],
        response_format: { type: "json_object" }
      });

      const content = response.choices[0].message.content;
      return JSON.parse(content || '{"items": []}');
    } catch (error) {
      this.logger.error(`AI Invoice Scan failed: ${error.message}`);
      throw error;
    }
  }
}
