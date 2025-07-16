import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Position } from '@prisma/client';
export declare class PositionService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(dto: CreatePositionDto): Promise<Position>;
    findAll(): Promise<{
        id: string;
        name: string;
    }[]>;
    findOne(id: number): string;
    update(id: number, updatePositionDto: UpdatePositionDto): string;
    remove(id: number): string;
}
