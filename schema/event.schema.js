module.exports = {
	createEventSchema: {
		id: '/create-event',
		type: 'object',
		additionalProperties: true,
		required: [],
		properties: {
			date_time: {
				type: 'string',
				pattern: '\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d(?:\\.\\d+)?Z',
				description: 'Date time must be in UTC format e.g. 2015-03-25T12:00:00Z',
			},
			duration: {
				type: 'number',
				maximum: 120,
				minimum: 30,
			},
		},
	},
	freeSlotsSchema: {
		id: '/free-slot',
		type: 'object',
		additionalProperties: true,
		required: [],
		properties: {
			date: {
				type: 'string',
				pattern: '\\d{4}-[01]\\d-[0-3]\\d$',
			},
			timezone: {
				type: 'string',
				enum: [
					'EDT',
					'IST',
					'AEDT',
					'JST',
				],
			},
		},
	},
	bookedEventsSchema: {
		id: '/booked-events',
		type: 'object',
		additionalProperties: true,
		required: [],
		properties: {
			dateFrom: {
				type: 'string',
				pattern: '\\d{4}-[01]\\d-[0-3]\\d$',
			},
			dateTo: {
				type: 'string',
				pattern: '\\d{4}-[01]\\d-[0-3]\\d$',
			},
		},
	},
};
