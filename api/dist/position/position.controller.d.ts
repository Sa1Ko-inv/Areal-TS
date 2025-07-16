import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
export declare class PositionController {
    private readonly positionService;
    constructor(positionService: PositionService);
    create(dto: CreatePositionDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
    }[]>;
    findOne(id: string): string;
    update(id: string, updatePositionDto: UpdatePositionDto): string;
    remove(id: string): string;
}
