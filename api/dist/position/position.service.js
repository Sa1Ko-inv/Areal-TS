"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PositionService = class PositionService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(dto) {
        const { name } = dto;
        const position = await this.prismaService.position.create({
            data: {
                name,
            },
        });
        return position;
    }
    async findAll() {
        return this.prismaService.position.findMany({
            take: 10,
            skip: 0,
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                name: true,
            },
        });
    }
    async findOne(id) {
        const position = await this.prismaService.position.findUnique({
            where: {
                id,
            },
        });
        if (!position) {
            throw new common_1.NotFoundException('Должность не найдена');
        }
        return position;
    }
    async update(id, dto) {
        const position = await this.findOne(id);
        await this.prismaService.position.update({
            where: {
                id: position.id,
            },
            data: {
                name: dto.name,
            },
        });
        return this.findOne(id);
    }
    async remove(id) {
        const position = await this.findOne(id);
        await this.prismaService.position.delete({
            where: {
                id: position.id,
            },
        });
        return {
            message: 'Должность успешно удалена с id: ' + position.id,
        };
    }
};
exports.PositionService = PositionService;
exports.PositionService = PositionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PositionService);
//# sourceMappingURL=position.service.js.map