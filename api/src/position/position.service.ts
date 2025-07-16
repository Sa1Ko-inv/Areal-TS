import { Injectable, NotFoundException } from '@nestjs/common'
import { CreatePositionDto } from './dto/create-position.dto'
import { UpdatePositionDto } from './dto/update-position.dto'
import { PrismaService } from '../prisma/prisma.service'
import { Position } from '@prisma/client'
import { NotFoundError } from 'rxjs'

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
			},
		})
	}

	async findOne(id: string) {
		const position = await this.prismaService.position.findUnique({
			where: {
				id,
			},
		})

		if (!position) {
			throw new NotFoundException('Должность не найдена')
		}

		return position
	}

	async update(id: string, dto: UpdatePositionDto) {
		const position = await this.findOne(id)

		await this.prismaService.position.update({
			where: {
				id: position.id,
			},
			data: {
				name: dto.name,
			},
		})
		return this.findOne(id)
	}

	async remove(id: string) {
		const position = await this.findOne(id)

		await this.prismaService.position.delete({
			where: {
				id: position.id,
			},
		})

		return {
			message: 'Должность успешно удалена с id: ' + position.id,
		}
	}
}
