import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Chat } from "./entities/chat.entity";

@Injectable()
export class ChattingService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ){}

  
  async findMyChatList({ userId }){
    const result = await this.chatRepository.find({where: userId})
    return result;
  }

  async findBoardChat( {boardId} ) {
    const result = await this.chatRepository.find({where: boardId})
    return result;
  }

  async createChat( {boardId, message} ) {
    const result = await this.chatRepository.save({
      board: boardId,
      message
    })

    return result;
  }

}