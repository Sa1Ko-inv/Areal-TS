import * as Joi from 'joi';

// Регулярное выражение для даты в формате DD/MM/YYYY
const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

// Базовые поля сотрудника
export const employeeSchema = Joi.object({
	last_name: Joi.string().min(2).max(50).required().messages({
		'string.base': 'Фамилия должна быть строкой',
		'string.empty': 'Фамилия не может быть пустой',
		'string.min': 'Фамилия должна содержать минимум {#limit} символа',
		'string.max': 'Фамилия должна содержать максимум {#limit} символов',
		'any.required': 'Фамилия является обязательным полем',
	}),
	first_name: Joi.string().min(2).max(50).required().messages({
		'string.base': 'Имя должно быть строкой',
		'string.empty': 'Имя не может быть пустым',
		'string.min': 'Имя должно содержать минимум {#limit} символа',
		'string.max': 'Имя должно содержать максимум {#limit} символов',
		'any.required': 'Имя является обязательным полем',
	}),
	middle_name: Joi.string().min(2).max(50).required().messages({
		'string.base': 'Отчество должно быть строкой',
		'string.empty': 'Отчество не может быть пустым',
		'string.min': 'Отчество должно содержать минимум {#limit} символа',
		'string.max': 'Отчество должно содержать максимум {#limit} символов',
		'any.required': 'Отчество является обязательным полем',
	}),
	birth_date: Joi.string().pattern(dateRegex).required().messages({
		'string.base': 'Дата рождения должна быть строкой',
		'string.empty': 'Дата рождения не может быть пустой',
		'string.pattern.base': 'Дата рождения должна быть в формате DD/MM/YYYY',
		'any.required': 'Дата рождения является обязательным полем',
	}),
	passport: Joi.object({
		// Вложенный объект для паспорта
		series: Joi.string()
			.length(4)
			.pattern(/^[0-9]+$/)
			.required()
			.messages({
				'string.base': 'Серия паспорта должна быть строкой',
				'string.empty': 'Серия паспорта не может быть пустой',
				'string.length': 'Серия паспорта должна содержать {#limit} цифры',
				'string.pattern.base': 'Серия паспорта должна содержать только цифры',
				'any.required': 'Серия паспорта является обязательным полем',
			}),
		number: Joi.string()
			.length(6)
			.pattern(/^[0-9]+$/)
			.required()
			.messages({
				'string.base': 'Номер паспорта должен быть строкой',
				'string.empty': 'Номер паспорта не может быть пустым',
				'string.length': 'Номер паспорта должен содержать {#limit} цифр',
				'string.pattern.base': 'Номер паспорта должен содержать только цифры',
				'any.required': 'Номер паспорта является обязательным полем',
			}),
		issued_by: Joi.string().min(5).max(255).required().messages({
			'string.base': 'Кем выдан должен быть строкой',
			'string.empty': 'Кем выдан не может быть пустым',
			'string.min': 'Кем выдан должен содержать минимум {#limit} символов',
			'string.max': 'Кем выдан должен содержать максимум {#limit} символов',
			'any.required': 'Кем выдан является обязательным полем',
		}),
		issued_date: Joi.string().pattern(dateRegex).required().messages({
			'string.empty': 'Дата выдачи не может быть пустым',
			'string.base': 'Дата выдачи должна быть строкой',
			'string.pattern.base': 'Дата должна быть DD/MM/YYYY',
			'any.required': 'Дата выдачи является обязательным полем',
		}),
		division_code: Joi.string()
			.length(7)
			.pattern(/^[0-9]{3}-[0-9]{3}$/)
			.required()
			.messages({
				'string.base': 'Код подразделения должен быть строкой',
				'string.empty': 'Код подразделения не может быть пустым',
				'string.length': 'Код подразделения должен быть в формате XXX-XXX',
				'string.pattern.base': 'Код подразделения должен быть в формате XXX-XXX (только цифры)',
				'any.required': 'Код подразделения является обязательным полем',
			}),
	}).optional(), // Паспорт не обязателен (можно передать или нет)
	address: Joi.object({
		// Вложенный объект для адреса
		region: Joi.string().min(2).max(100).required().messages({
			'string.base': 'Регион должен быть строкой',
			'string.empty': 'Регион не может быть пустым',
			'string.min': 'Регион должен содержать минимум {#limit} символа',
			'string.max': 'Регион должен содержать максимум {#limit} символов',
			'any.required': 'Регион является обязательным полем',
		}),
		locality: Joi.string().min(2).max(100).required().messages({
			'string.base': 'Населенный пункт должен быть строкой',
			'string.empty': 'Населенный пункт не может быть пустым',
			'string.min': 'Населенный пункт должен содержать минимум {#limit} символа',
			'string.max': 'Населенный пункт должен содержать максимум {#limit} символов',
			'any.required': 'Населенный пункт является обязательным полем',
		}),
		street: Joi.string().min(2).max(100).required().messages({
			'string.base': 'Улица должна быть строкой',
			'string.empty': 'Улица не может быть пустой',
			'string.min': 'Улица должна содержать минимум {#limit} символа',
			'string.max': 'Улица должна содержать максимум {#limit} символов',
			'any.required': 'Улица является обязательным полем',
		}),
		house: Joi.string().min(1).max(10).required().messages({
			'string.base': 'Дом должен быть строкой',
			'string.empty': 'Дом не может быть пустым',
			'string.min': 'Дом должен содержать минимум {#limit} символ',
			'string.max': 'Дом должен содержать максимум {#limit} символов',
			'any.required': 'Дом является обязательным полем',
		}),
		building: Joi.string().min(1).max(10).allow('').optional().messages({
			'string.empty': 'Корпус не может быть пустым',
			'string.base': 'Корпус должно быть строкой',
			'string.min': 'Корпус должно содержать минимум {#limit} символ',
			'string.max': 'Корпус должно содержать максимум {#limit} символов',
		}),
		apartment: Joi.string().min(1).max(10).required().messages({
			'string.base': 'Квартира должна быть строкой',
			'string.empty': 'Квартира не может быть пустой',
			'string.min': 'Квартира должна содержать минимум {#limit} символ',
			'string.max': 'Квартира должна содержать максимум {#limit} символов',
			'any.required': 'Квартира является обязательным полем',
		}),
	}).optional(), // Адрес не обязателен
});

// Схема для обновления (все поля optional)
export const employeeUpdateSchema = Joi.object({
	last_name: Joi.string().min(2).max(50).optional().messages({
		'string.base': 'Фамилия должна быть строкой',
		'string.empty': 'Фамилия не может быть пустой',
		'string.min': 'Фамилия должна содержать минимум {#limit} символа',
		'string.max': 'Фамилия должна содержать максимум {#limit} символов',
	}),
	first_name: Joi.string().min(2).max(50).optional().messages({
		'string.base': 'Имя должно быть строкой',
		'string.empty': 'Имя не может быть пустым',
		'string.min': 'Имя должно содержать минимум {#limit} символа',
		'string.max': 'Имя должно содержать максимум {#limit} символов',
	}),
	middle_name: Joi.string().min(2).max(50).optional().messages({
		'string.base': 'Отчество должно быть строкой',
		'string.empty': 'Отчество не может быть пустым',
		'string.min': 'Отчество должно содержать минимум {#limit} символа',
		'string.max': 'Отчество должно содержать максимум {#limit} символов',
	}),
	birth_date: Joi.string().pattern(dateRegex).optional().messages({
		'string.base': 'Дата рождения должна быть строкой',
		'string.empty': 'Дата рождения не может быть пустой',
		'string.pattern.base': 'Дата рождения должна быть в формате DD/MM/YYYY',
	}),
	passport: Joi.object()
		.optional()
		.messages({
			'object.base': 'Паспорт должен быть объектом',
		})
		.keys({
			series: Joi.string()
				.length(4)
				.pattern(/^[0-9]+$/)
				.optional()
				.messages({
					'string.base': 'Серия паспорта должна быть строкой',
					'string.empty': 'Серия паспорта не может быть пустой',
					'string.length': 'Серия паспорта должна содержать {#limit} цифры',
					'string.pattern.base': 'Серия паспорта должна содержать только цифры',
				}),
			number: Joi.string()
				.length(6)
				.pattern(/^[0-9]+$/)
				.optional()
				.messages({
					'string.base': 'Номер паспорта должен быть строкой',
					'string.empty': 'Номер паспорта не может быть пустым',
					'string.length': 'Номер паспорта должен содержать {#limit} цифр',
					'string.pattern.base': 'Номер паспорта должен содержать только цифры',
				}),
			issued_by: Joi.string().min(5).max(255).optional().messages({
				'string.base': 'Кем выдан должен быть строкой',
				'string.empty': 'Кем выдан не может быть пустым',
				'string.min': 'Кем выдан должен содержать минимум {#limit} символов',
				'string.max': 'Кем выдан должен содержать максимум {#limit} символов',
			}),
			issued_date: Joi.string().pattern(dateRegex).optional().messages({
				'string.empty': 'Дата выдачи не может быть пустым',
				'string.base': 'Дата выдачи должна быть строкой',
				'string.pattern.base': 'Дата выдачи должна быть в формате DD-MM-YYYY',
			}),
			division_code: Joi.string()
				.length(7)
				.pattern(/^[0-9]{3}-[0-9]{3}$/)
				.optional()
				.messages({
					'string.base': 'Код подразделения должен быть строкой',
					'string.empty': 'Код подразделения не может быть пустым',
					'string.length': 'Код подразделения должен быть в формате XXX-XXX',
					'string.pattern.base': 'Код подразделения должен быть в формате XXX-XXX (только цифры)',
				}),
		}),
	address: Joi.object()
		.optional()
		.messages({
			'object.base': 'Адрес должен быть объектом',
		})
		.keys({
			region: Joi.string().min(2).max(100).optional().messages({
				'string.base': 'Регион должен быть строкой',
				'string.empty': 'Регион не может быть пустым',
				'string.min': 'Регион должен содержать минимум {#limit} символа',
				'string.max': 'Регион должен содержать максимум {#limit} символов',
			}),
			locality: Joi.string().min(2).max(100).optional().messages({
				'string.base': 'Населенный пункт должен быть строкой',
				'string.empty': 'Населенный пункт не может быть пустым',
				'string.min': 'Населенный пункт должен содержать минимум {#limit} символа',
				'string.max': 'Населенный пункт должен содержать максимум {#limit} символов',
			}),
			street: Joi.string().min(2).max(100).optional().messages({
				'string.base': 'Улица должна быть строкой',
				'string.empty': 'Улица не может быть пустой',
				'string.min': 'Улица должна содержать минимум {#limit} символа',
				'string.max': 'Улица должна содержать максимум {#limit} символов',
			}),
			house: Joi.string().min(1).max(10).optional().messages({
				'string.base': 'Дом должен быть строкой',
				'string.empty': 'Дом не может быть пустым',
				'string.min': 'Дом должен содержать минимум {#limit} символ',
				'string.max': 'Дом должен содержать максимум {#limit} символов',
			}),
			building: Joi.string().min(1).max(10).allow('').optional().messages({
				'string.empty': 'Корпус не может быть пустым',
				'string.base': 'Корпус должно быть строкой',
				'string.min': 'Корпус должно содержать минимум {#limit} символ',
				'string.max': 'Корпус должно содержать максимум {#limit} символов',
			}),
			apartment: Joi.string().min(1).max(10).optional().messages({
				'string.base': 'Квартира должна быть строкой',
				'string.empty': 'Квартира не может быть пустой',
				'string.min': 'Квартира должна содержать минимум {#limit} символ',
				'string.max': 'Квартира должна содержать максимум {#limit} символов',
			}),
		}),
});