import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardsImage } from '../boardsImages/entities/boardsImage.entity';
import { SalesLocations } from '../salesLocations/entities/salesLocation.entity';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(SalesLocations)
    private readonly salesLocationRepository: Repository<SalesLocations>,

    @InjectRepository(BoardsImage)
    private readonly boardsImageRepository: Repository<BoardsImage>,
  ) {}

  async findAll() {
    return await this.boardRepository.find({
      relations: ['category', 'user', 'salesLocation'],
    });
  }

  async findOne({ id }) {
    return await this.boardRepository.findOne({
      where: { id: id },
      relations: ['category', 'user', 'salesLocation'],
    });
  }

  async create({ createBoardInput, userId }) {
    const { url, categoryId, salesLocations, ...rest } = createBoardInput;

    const result = await this.salesLocationRepository.save({
      ...salesLocations,
    });

    const result2 = await this.boardRepository.save({
      ...rest,
      user: userId,
      salesLocation: result,
      category: categoryId,
    });

    for (let i = 0; i < url.length; i++) {
      const urls = url[i];
      await this.boardsImageRepository.save({
        url: urls,
        board: result2.id,
      });
    }
    return result2;
  }

  async update({ updateBoardInput, userId, boardId }) {
    const myboard = await this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['user'],
    });
    if (userId !== myboard.user.id) {
      throw new UnprocessableEntityException('수정 못해~');
    }
    const result = this.boardRepository.save({
      ...myboard,
      id: boardId,
      ...updateBoardInput,
    });
    return result;
  }

  async delete({ boardId, userId }) {
    const myboard = await this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['user'],
    });
    if (userId !== myboard.user.id) {
      console.log('asdasdasdasdasdasda', userId, myboard.user.id);
      throw new UnprocessableEntityException('삭제 못해유~!');
    }
    const result = await this.boardRepository.softDelete({ id: boardId });
    return result.affected ? true : false;
  }
}
