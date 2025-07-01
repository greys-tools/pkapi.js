import { AxiosResponse } from 'axios';
import BaseRateLimiter from './BaseRateLimiter';

export default class NoOpRateLimiter extends BaseRateLimiter {
	public async handleResponse(_response: AxiosResponse) {}
	public async handleError(_error: unknown): Promise<boolean> {
		return false;
	}
	public async wait() {}
}
