import { Injectable } from '@nestjs/common'
import { CreatePositionDto } from './dto/create-position.dto'
import { UpdatePositionDto } from './dto/update-position.dto'
import { PrismaService } from '../prisma/prisma.service'
import { Position } from '@prisma/client'
// 3:57:18
@Injectable()
export class PositionService {
	constructor(private readonly prismaService: PrismaService) {
	}

	async create(dto: CreatePositionDto): Promise<Position> {
		const { name } = dto

		const position = await this.prismaService.position.create({
			data: {
				name,
			},
		})

		return position
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
			}
		})
	}

	findOne(id: number) {
		return `This action returns a #${id} position`
	}

	update(id: number, updatePositionDto: UpdatePositionDto) {
		return `This action updates a #${id} position`
	}

	remove(id: number) {
		return `This action removes a #${id} position`
	}
}
