import { jest, describe, expect, it } from '@jest/globals';

import NoOpRateLimiter from '../../RateLimiter/NoOpRateLimiter';

import { createResponse, createRateLimitError } from './util';

describe('NoOpRateLimiter', function () {
	describe('handleError', function () {
		it.each([createRateLimitError(), 'random-value'])(
			'returns false with handleError(%j)',
			async function (err) {
				const limiter = new NoOpRateLimiter();
				expect(await limiter.handleError(err)).toBe(false);
			},
		);
	});
	describe('handleResponse', function () {
		it('immediately returns', async function () {
			jest.useFakeTimers();
			const limiter = new NoOpRateLimiter();

			// set done to true after waiting for the ratelimiter
			let done = false;
			limiter.handleResponse(createResponse()).then(() => (done = true));

			await jest.advanceTimersByTimeAsync(0);
			expect(done).toBe(true);
		});
	});
	describe('take', function () {
		it('immediately returns', async function () {
			jest.useFakeTimers();
			const limiter = new NoOpRateLimiter();

			// set done to true after waiting for the ratelimiter
			let done = false;
			limiter.wait().then(() => (done = true));

			await jest.advanceTimersByTimeAsync(0);
			expect(done).toBe(true);
		});
	});
});
