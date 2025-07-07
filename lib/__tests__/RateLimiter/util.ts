import { AxiosResponse } from 'axios';

export function createAxiosError(
	status = 429,
	responseOptions: Partial<AxiosResponse> = {},
) {
	return {
		isAxiosError: true,
		code: status,
		response: createResponse({
			status,
			headers: {},
			data: '',
			statusText: '',
			config: {},
			...responseOptions,
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
