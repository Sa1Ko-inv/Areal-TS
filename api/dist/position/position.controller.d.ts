import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
export declare class PositionController {
    private readonly positionService;
    constructor(positionService: PositionService);
    create(dto: CreatePositionDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    findAll(): Promise<{
        name: string;
        id: string;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    update(id: string, dto: UpdatePositionDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
