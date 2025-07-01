import { AxiosResponse } from 'axios';

export interface RateLimitableItem {
	status?: string | number;
	headers?: unknown;
}
export default abstract class BaseRateLimiter {
	/** gets called on normal responses from the API, use to parse headers, etc. */
	public abstract handleResponse(response: AxiosResponse): Promise<void>;

	/**
	 * gets called when any error occurs when peforming a request
	 *
	 * should return a boolean value indicating whether the rate limiter
	 * has handled the error (and we should retry), or it should be propagated to the user
	 */
	public abstract handleError(error: unknown): Promise<boolean>;

	/** method that should wait until we're allowed to make a request again */
	public abstract wait(): Promise<void>;
}
