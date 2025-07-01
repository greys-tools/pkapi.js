import axios, { AxiosResponse } from 'axios';
import BaseRateLimiter from './BaseRateLimiter';

interface RateLimiterOptions {
	// Print debug info
	debug?: boolean;
	// Base window to use for increasing/decreasing the wait time
	errorWindowBase?: number;
	// Time we initially wait when we hit the ratelimit
	initialWaitTime?: number;
	// Lowest our wait time can go
	minWait?: number;
	// Highest the wait time can go
	maxWait?: number;
	// How much to change the wait time by when increase/decrease thresholds are hit
	increment?: number;
	// Min amount of errors in the last (errorWindowBase * waitTime) ms to increase wait time
	increaseThreshold?: number;
	// Max amount of errors in the last (errorWindowBase * waitTime) ms to allow decreasing wait time
	decreaseThreshold?: number;
}

export default class DefaultRateLimiter extends BaseRateLimiter {
	// Array of timestamps when we triggered a 429
	protected errorTimestamps: Array<number>;
	// Timestamp when our rate limit is reset (including our own waitTime)
	protected resetTimestamp: number;
	// Time we wait when we hit the ratelimit
	protected waitTime: number;

	protected options: Required<RateLimiterOptions>;

	constructor(
		options?: RateLimiterOptions,
		// Base window to use for increasing/decreasing the wait time
	) {
		super();

		this.options = {
			debug: false,
			errorWindowBase: 5,
			initialWaitTime: 1000,
			minWait: 1000,
			maxWait: 3000,
			increment: 500,
			increaseThreshold: 3,
			decreaseThreshold: 0,

			...options,
		};
		this.waitTime = this.options.initialWaitTime;
		this.errorTimestamps = [];
		this.resetTimestamp = 0;
	}

	private adjustWaitTime() {
		const curTime = Date.now();
		this.errorTimestamps = this.errorTimestamps.filter(
			(v) =>
				v >
				curTime - this.options.errorWindowBase * this.options.minWait,
		);

		// If we hit the rate limit more than `increaseThreshold` times
		// in the last `errorWindowBase * minWait` seconds we increase the delay
		// up to a maximum of `maxWait`
		if (
			this.errorTimestamps.length >= this.options.increaseThreshold &&
			this.waitTime !== this.options.maxWait
		) {
			this.waitTime = Math.min(
				this.waitTime + this.options.increment,
				this.options.maxWait,
			);
			this.debugLog(
				`ratelimit: error threshold exceeded, increased wait time to ${this.waitTime}ms`,
			);
		} else if (
			this.errorTimestamps.length <= this.options.decreaseThreshold &&
			this.waitTime !== this.options.minWait
		) {
			this.waitTime = Math.max(
				this.waitTime - this.options.increment,
				this.options.minWait,
			);
			this.debugLog(
				`ratelimit: error threshold reset, decreased wait time to ${this.waitTime}ms`,
			);
		}
	}

	private parseHeaders(headers: unknown): {
		limit?: number;
		remaining?: number;
		reset?: number;
	} | null {
		if (!headers) {
			return null;
		}

		if (typeof headers != 'object') {
			return null;
		}

		const parsed: { limit?: number; remaining?: number; reset?: number } =
			{};

		if ('x-ratelimit-limit' in headers) {
			if (typeof headers['x-ratelimit-limit'] == 'string') {
				const limit = parseInt(headers['x-ratelimit-limit']);
				if (!isNaN(limit)) {
					parsed.limit = limit;
				}
			} else if (typeof headers['x-ratelimit-limit'] == 'number') {
				parsed.limit = headers['x-ratelimit-limit'];
			}
		}

		if ('x-ratelimit-remaining' in headers) {
			if (typeof headers['x-ratelimit-remaining'] == 'string') {
				const limit = parseInt(headers['x-ratelimit-remaining']);
				if (!isNaN(limit)) {
					parsed.remaining = limit;
				}
			} else if (typeof headers['x-ratelimit-remaining'] == 'number') {
				parsed.remaining = headers['x-ratelimit-remaining'];
			}
		}

		if ('x-ratelimit-reset' in headers) {
			if (typeof headers['x-ratelimit-reset'] == 'string') {
				const reset = parseInt(headers['x-ratelimit-reset']);
				if (!isNaN(reset)) {
					parsed.reset = reset;
				}
			} else if (typeof headers['x-ratelimit-reset'] == 'number') {
				parsed.reset = headers['x-ratelimit-reset'];
			}
		}

		return parsed;
	}

	private debugLog(data: unknown) {
		if (this.options.debug) {
			console.debug(data);
		}
	}

	private isRateLimitError(res: AxiosResponse) {
		// NOTE: res.status is string or number but coercion means either works
		return res.status == 429;
	}

	private handleResult(res: AxiosResponse) {
		// Handle incremental backoff when ratelimited
		this.adjustWaitTime();

		const headers = this.parseHeaders(res.headers);
		this.debugLog({ headers });
		if (
			(headers?.remaining !== undefined && headers.remaining < 1) ||
			this.isRateLimitError(res)
		) {
			const resetMs = headers?.reset
				? Math.max(headers.reset * 1000 - Date.now(), this.waitTime)
				: this.waitTime;
			const type = this.isRateLimitError(res) ? 'triggered' : 'hit';
			this.debugLog(
				`ratelimit: ${type}, need to wait for ${resetMs} milliseconds`,
			);
			this.resetTimestamp = Date.now() + resetMs;
		}
	}

	public async handleError(error: unknown): Promise<boolean> {
		if (
			axios.isAxiosError(error) &&
			error.response &&
			this.isRateLimitError(error.response)
		) {
			this.errorTimestamps.push(Date.now());
			this.handleResult(error.response);
			return true;
		}

		return false;
	}

	public async handleResponse(res: AxiosResponse) {
		this.handleResult(res);
	}

	public async wait() {
		const waitTime = this.resetTimestamp - Date.now();
		this.debugLog({
			waitTime,
			resetTimestamp: this.resetTimestamp,
			now: Date.now(),
		});
		if (waitTime <= 0) {
			return;
		}

		return new Promise<void>((resolve) => setTimeout(resolve, waitTime));
	}
}
