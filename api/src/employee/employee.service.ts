import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { UpdateEmployeeDto } from './dto/update-employee.dto'
import { employeeSchema, employeeUpdateSchema } from './dto/employee.schema'
import { DatabaseService } from '../config/database.service'

@Injectable()
export class EmployeeService {
	constructor(private readonly db: DatabaseService) {
	}

	async create(createEmployeeDto: CreateEmployeeDto) {
		// Валидация с Joi
		const { error, value } = employeeSchema.validate(createEmployeeDto, {
			abortEarly: false, // Возвращает все ошибки, а не только первую
			allowUnknown: false, // Запрещает неизвестные поля
		})

		if (error) {
			throw new BadRequestException({
				message: 'Ошибка валидации данных',
				details: error.details.map(detail => ({
					field: detail.path.join('.'),
					message: detail.message,
				})),
			})
		}

		const client = await this.db.getClient()

		try {
			await client.query('BEGIN') // Начинаем транзакцию

			// Если валидация прошла успешно, value содержит проверенные данные
			const employees = await client.query(
				`INSERT INTO employees (first_name, last_name, middle_name, birth_date)
				 VALUES ($1, $2, $3, $4) RETURNING *`,
				[
					value.first_name,
					value.last_name,
					value.middle_name,
					value.birth_date,
				],
			)

			await client.query('COMMIT') // Фиксируем транзакцию

			return employees[0]
		} catch (err) {
			await client.query('ROLLBACK') // Откатываем транзакцию в случае ошибки
			throw new BadRequestException({
				message: 'Ошибка при создании сотрудника',
				details: err.message,
			})
		} finally {
			client.release()
		}
	}

	async findAll() {
		// Пример запроса к базе данных для получения всех сотрудников
		const employees = await this.db.query(
			`SELECT id,
					  first_name,
					  last_name,
					  middle_name,
					  TO_CHAR(birth_date, 'DD/MM/YYYY') as birth_date,
					  created_at,
					  updated_at,
					  deleted_at
			 FROM employees`,
		)
		if (!employees) {
			throw new BadRequestException({
				message: 'Не удалось получить список сотрудников',
			})

		}
		return employees
	}

	async findOne(id: number) {
		const employee = await this.db.query(
			`SELECT id,
					  first_name,
					  last_name,
					  middle_name,
					  TO_CHAR(birth_date, 'DD/MM/YYYY') as birth_date,
					  created_at,
					  updated_at,
					  deleted_at
			 FROM employees
			 WHERE id = $1`,
			[id],
		)
		if (!employee || employee.length === 0) {
			throw new BadRequestException({
				message: `Сотрудник с ID ${id} не найден`,
			})
		}
		return employee[0]
	}

	async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
		// 1. Проверяем существование сотрудника
		const existingEmployee = await this.findOne(id)
		if (!existingEmployee) {
			throw new BadRequestException({
				message: `Сотрудник с ID ${id} не найден`,
			})
		}

		// 2. Валидация данных
		const { error, value } = employeeUpdateSchema.validate(updateEmployeeDto, {
			abortEarly: false,
			allowUnknown: false,
		})

		if (error) {
			throw new BadRequestException({
				message: 'Ошибка валидации данных',
				details: error.details.map(detail => ({
					field: detail.path.join('.'),
					message: detail.message,
				})),
			})
		}

		const client = await this.db.getClient()

		try {
			await client.query('BEGIN') // Начинаем транзакцию

			// 3. Формируем динамический SQL запрос для обновления
			const fieldsToUpdate: string[] = []
			const params: (string | number | Date)[] = []
			let paramIndex = 1

			// Добавляем только те поля, которые были переданы для обновления
			if (value.first_name !== undefined) {
				fieldsToUpdate.push(`first_name = $${paramIndex}`)
				params.push(value.first_name)
				paramIndex++
			}

			if (value.last_name !== undefined) {
				fieldsToUpdate.push(`last_name = $${paramIndex}`)
				params.push(value.last_name)
				paramIndex++
			}

			if (value.middle_name !== undefined) {
				fieldsToUpdate.push(`middle_name = $${paramIndex}`)
				params.push(value.middle_name)
				paramIndex++
			}

			if (value.birth_date !== undefined) {
				fieldsToUpdate.push(`birth_date = TO_DATE($${paramIndex}, 'DD/MM/YYYY')`)
				params.push(value.birth_date)
				paramIndex++
			}

			// Если нет полей для обновления
			if (fieldsToUpdate.length === 0) {
				throw new BadRequestException({
					message: 'Нет данных для обновления',
				})
			}

			// Добавляем ID в параметры
			params.push(id)

			// 4. Выполняем запрос на обновление
			const query = `
				UPDATE employees
				SET ${fieldsToUpdate.join(', ')},
					 updated_at = NOW()
				WHERE id = $${paramIndex} RETURNING *`

			const updatedEmployee = await client.query(query, params)

			await client.query('COMMIT') // Фиксируем транзакцию

			return updatedEmployee[0]

		} catch (error) {
			await client.query('ROLLBACK') // Откатываем транзакцию в случае ошибки
			throw new BadRequestException({
				message: 'Ошибка при обновлении сотрудника',
				details: error.message,
			})
		} finally {
			client.release() // Освобождаем клиент после завершения работы
		}
	}

	async remove(id: number) {
		// 1. Сначала проверяем существование сотрудника
		const employee = await this.findOne(id)
		if (!employee) {
			throw new BadRequestException({
				message: `Сотрудник с ID ${id} не найден`,
			})
		}

		const client = await this.db.getClient()
		try {
			await client.query('BEGIN') // Начинаем транзакцию

			// 2. Выполняем запрос на удаление
			const employee = await client.query(
				`UPDATE employees
				 SET deleted_at = NOW()
				 WHERE id = $1 RETURNING id, first_name, last_name, TO_CHAR(deleted_at, 'DD/MM/YYYY HH24:MI:SS') as deleted_at`,
				[id],
			)

			await client.query('COMMIT')

			// 4. Возвращаем информацию об удаленном сотруднике
			return {
				message: `Сотрудник успешно удален`,
				deletedEmployee: employee[0],
			}
		} catch (error) {
			await client.query('ROLLBACK') // Откатываем транзакцию в случае ошибки
			// 5. Обрабатываем возможные ошибки
			throw new BadRequestException({
				message: 'Ошибка при удалении сотрудника',
				details: error.message,
			})
		} finally {
			client.release() // Освобождаем клиент после завершения работы
		}
	}
}
