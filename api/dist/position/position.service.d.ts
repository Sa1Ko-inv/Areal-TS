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
    findOne(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    update(id: string, dto: UpdatePositionDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
