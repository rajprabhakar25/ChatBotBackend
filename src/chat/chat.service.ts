import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatService {
  constructor(private configService: ConfigService) {}

  async getGeminiReply(message: string) {
    console.log('Loaded Key:', this.configService.get('GEMINI_API_KEY'));
    debugger;
    const apiKey = this.configService.get('GEMINI_API_KEY');

    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          parts: [{ text: message }],
        },
      ],
    };

    try {
      const response = await axios.post(url, payload);

      if (!response.data.candidates?.length) {
        return '⚠️ AI did not return a response. Try again.';
      }

      return response.data.candidates[0].content.parts[0].text;
    } catch (error: any) {
      console.error('Gemini Error:', error.response?.data || error.message);

      if (error.response?.status === 429) {
        return '⚠️ Rate limit exceeded. Please wait.';
      }

      return '⚠️ Server error. Please try again later.';
    }
  }
}
