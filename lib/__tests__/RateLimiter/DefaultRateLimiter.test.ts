import { jest, describe, expect, it } from '@jest/globals';

import DefaultRateLimiter from '../../RateLimiter/DefaultRateLimiter';

import { createRateLimitError, createResponse } from './util';

class TestRateLimiter extends DefaultRateLimiter {
	public setErrorTimestamps(timestamps: Array<number>) {
		this.errorTimestamps = timestamps;
	}

	public async triggerError() {
		return this.handleError(createRateLimitError());
	}

	public getWaitTime() {
		return this.waitTime;
	}

	public getResetTimestamp() {
		return this.resetTimestamp;
	}
}

describe('DefaultRateLimiter', function () {
	describe('waitTime', function () {
		it('increases the wait time if we exceed the max error threshold', async function () {
			const limiter = new TestRateLimiter();

			await limiter.triggerError();
			await limiter.triggerError();
			await limiter.triggerError();

			expect(limiter.getWaitTime()).toBe(1500);
		});
		it('decreases the wait time if we drop below the min threshold', async function () {
			const limiter = new TestRateLimiter({
				errorWindowBase: 5000,
				initialWaitTime: 2000,
			});

			limiter.setErrorTimestamps([0, 1, 2]);
			await limiter.handleResponse(createResponse());

			expect(limiter.getWaitTime()).toBe(1500);
		});
		it('does not exceed maxWait', async function () {
			const limiter = new TestRateLimiter({
				maxWait: 3000,
				initialWaitTime: 2000,
				increment: 500,
			});

			await limiter.triggerError();
			await limiter.triggerError();
			await limiter.triggerError();
			await limiter.triggerError();
			await limiter.triggerError();

			expect(limiter.getWaitTime()).toBe(3000);
		});
		it('does not go below minWait', async function () {
			const limiter = new TestRateLimiter({
				minWait: 1000,
				initialWaitTime: 2000,
				increment: 500,
			});

			await limiter.handleResponse(createResponse());
			await limiter.handleResponse(createResponse());
			await limiter.handleResponse(createResponse());

			expect(limiter.getWaitTime()).toBe(1000);
		});
	});
	describe('take', function () {
		it("waits if there's no remaining requests", async function () {
			jest.useFakeTimers();

			const limiter = new TestRateLimiter({
				errorWindowBase: 5000,
				initialWaitTime: 1000,
			});
			// trigger the ratelimiter by setting remaining requests to 0
			await limiter.handleResponse(
				createResponse({
					headers: { 'x-ratelimit-remaining': '0' },
				}),
			);

			// set done to true after the wait time
			let done = false;
			const limiterPromise = limiter.wait().then(() => (done = true));
			// make sure the short circuit case resolves, so we can test correctly
			await jest.advanceTimersByTimeAsync(0);

			expect(done).toBe(false);
			await jest.advanceTimersByTimeAsync(1000);
			await limiterPromise; // wait for the promise
			expect(done).toBe(true);
		});
		it('waits if a rate limit error was triggered', async function () {
			jest.useFakeTimers();

			const limiter = new TestRateLimiter({ initialWaitTime: 1000 });
			// trigger an error to ratelimit the next request
			await limiter.triggerError();

			// set done to true after waiting for the ratelimiter
			let done = false;
			limiter.wait().then(() => (done = true));

			// after 500 milliseconds we should still be waiting as our waitTime is 1000
			await jest.advanceTimersByTimeAsync(500);
			expect(done).toBe(false);

			// after a second we should be done
			await jest.advanceTimersByTimeAsync(500);
			expect(done).toBe(true);
		});
		it("immediately returns if there's no ratelimiting", async function () {
			jest.useFakeTimers();

			const limiter = new TestRateLimiter({ initialWaitTime: 1000 });
			// set done to true after waiting for the ratelimiter
			let done = false;
			limiter.wait().then(() => (done = true));

			await jest.advanceTimersByTimeAsync(0);
			expect(done).toBe(true);
		});
		it('respects x-ratelimit-reset headers from API responses', async function () {
			jest.useFakeTimers();

			const limiter = new TestRateLimiter();
			await limiter.handleResponse(
				createResponse({
					headers: {
						'x-ratelimit-remaining': 0,
						'x-ratelimit-reset': Math.ceil(Date.now() / 1000) + 60,
					},
				}),
			);

			// set done to true after waiting for the ratelimiter
			let done = false;
			const donePromise = limiter.wait().then(() => (done = true));

			// assert it doesn't instantly gets set to true
			await jest.advanceTimersByTimeAsync(0);
			expect(done).toBe(false);

			// should still be waiting after 59 seconds
			await jest.advanceTimersByTimeAsync(59000);
			expect(done).toBe(false);

			// should be resolved after over 60 seconds total
			await jest.advanceTimersByTimeAsync(1500);
			expect(done).toBe(true);

			await donePromise;
		});
		it('respects x-ratelimit-reset headers from API errors', async function () {
			jest.useFakeTimers();

			const limiter = new TestRateLimiter();
			await limiter.handleError(
				createRateLimitError({
					'x-ratelimit-remaining': 0,
					'x-ratelimit-reset': Math.ceil(Date.now() / 1000) + 60,
				}),
			);

			// set done to true after waiting for the ratelimiter
			let done = false;
			const donePromise = limiter.wait().then(() => (done = true));

			// assert it doesn't instantly gets set to true
			await jest.advanceTimersByTimeAsync(0);
			expect(done).toBe(false);

			// should still be waiting after 59 seconds
			await jest.advanceTimersByTimeAsync(59000);
			expect(done).toBe(false);

			// should be resolved after 60 seconds total
			await jest.advanceTimersByTimeAsync(1500);
			expect(done).toBe(true);

			await donePromise;
		});
	});
	describe('handleError', function () {
		it('returns true on errors related to ratelimiting', async function () {
			const limiter = new TestRateLimiter();
			expect(await limiter.handleError(createRateLimitError())).toBe(
				true,
			);
		});
		it('returns false on errors unrelated to ratelimiting', async function () {
			const limiter = new TestRateLimiter();
			expect(await limiter.handleError('unrelated')).toBe(false);
		});
		it('respects the x-ratelimit-remaining header in API responses', async function () {});
	});
});
