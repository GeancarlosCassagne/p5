import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Gasoline } from './gasoline.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGasolineDto } from './dto/create-gasoline.dto';
import { UpdateGasolineDto } from './dto/update-gasoline.dto';

@Injectable()
export class GasolineService {
  private readonly logger = new Logger('GasolineService');

  constructor(
    @InjectRepository(Gasoline)
    private readonly gasolineRepository: Repository<Gasoline>,
  ) {}

  async create(createGasolineDto: CreateGasolineDto): Promise<Gasoline> {
    try {
      const gasoline = this.gasolineRepository.create(createGasolineDto);
      await this.gasolineRepository.save(gasoline);
      return gasoline;
    } catch (error) {
      console.error(error);
      if (error.code === '23505') throw new BadRequestException(error.detail);
      this.logger.error(error);
      throw new InternalServerErrorException('Error creating gasoline');
    }
  }

  async findAll(): Promise<Gasoline[]> {
    return await this.gasolineRepository.find({});
  }

  async findOne(id: string): Promise<Gasoline> {
    const gasoline = await this.gasolineRepository.findOneBy({ id });
    if (!gasoline) throw new NotFoundException(`Gasoline ${id} not found`);
    return gasoline;
  }

  async findOneByName(name: string): Promise<Gasoline> {
    const gasoline = await this.gasolineRepository.findOneBy({ name });
    if (!gasoline) throw new NotFoundException(`Gasoline ${name} not found`);
    return gasoline;
  }

  async update(
    id: string,
    updateGasolineDto: UpdateGasolineDto,
  ): Promise<Gasoline> {
    const gasoline = await this.gasolineRepository.preload({
      id: id,
      ...updateGasolineDto,
    });
    if (!gasoline) throw new NotFoundException(`Gasoline ${id} not found`);

    try {
      await this.gasolineRepository.save(gasoline);
      return gasoline;
    } catch (error) {
      console.error(error);
    }
  }

  async remove(id: string): Promise<void> {
    const gasoline = await this.findOne(id);
    await this.gasolineRepository.remove(gasoline);
  }
}
