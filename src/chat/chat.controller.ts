import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  async chat(@Body('message') message: string) {
    const reply = await this.chatService.getGeminiReply(message);

    return { reply };
  }
}
