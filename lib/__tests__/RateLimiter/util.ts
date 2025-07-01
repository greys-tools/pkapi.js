import { AxiosResponse } from 'axios';

export function createRateLimitError(headers = {}) {
	return {
		isAxiosError: true,
		response: createResponse({
			status: 429,
			statusText: 'Too Many Requests',
			headers,
		}),
	};
}

export function createResponse(
	options: Partial<AxiosResponse> = {},
): AxiosResponse {
	return {
		status: 200,
		headers: {},
		statusText: 'OK',
		data: '',
		config: {},
		...options,
	};
}
