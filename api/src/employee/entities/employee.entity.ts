import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({name: 'employees'})
export class Employee {
	@PrimaryGeneratedColumn('increment')
	id!: number;

	@Column({ name: 'first_name' })
	firstName: string;

	@Column({ name: 'last_name' })
	lastName: string;

	@Column({ name: 'middle_name' })
	middleName: string;

	@Column({ name: 'birth_date' })
	birthDate: Date;

	@CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
	readonly createdAt!: Date;

	@UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
	readonly updatedAt!: Date;

	@DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at' })
	readonly deletedAt!: Date;
}
