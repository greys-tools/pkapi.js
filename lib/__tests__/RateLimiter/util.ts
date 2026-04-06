import { AxiosResponse, AxiosHeaders } from 'axios';

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
			config: {
				headers: new AxiosHeaders(),
			},
			statusText: '',
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
		config: {
			headers: new AxiosHeaders(),
		},
		...options,
	};
}
