import { MigrationBuilder } from 'node-pg-migrate'

export const up = (pgm) => {
	pgm.createTable('employees', {
		id: 'id',
		first_name: { type: 'varchar(50)', notNull: true },
		last_name: { type: 'varchar(50)', notNull: true },
		middle_name: { type: 'varchar(50)', notNull: true },
		birth_date: { type: 'date', notNull: true },
		created_at: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('now()'),
		},
		updated_at: {
			type: 'timestamp',
			default: null,
		},
		deleted_at: {
			type: 'timestamp',
			default: null,
		},
	})
}

export const down = (pgm) => {
	pgm.dropTable('employees')
}
