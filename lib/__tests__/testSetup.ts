import { jest, expect } from '@jest/globals';

declare module 'expect' {
	interface Matchers<R> {
		toResolveAfterAtLeast(value: number): Promise<R>;
	}
}

expect.extend({
	async toResolveAfterAtLeast(received: Promise<any>, timePassedMs: number) {
		let timeBefore = Date.now();
		let resolvedAt: number | null = null;

		received.then(() => (resolvedAt = Date.now()));
		await jest.advanceTimersToNextTimerAsync();

		if (resolvedAt === null) {
			return {
				pass: false,
				message: () =>
					`expected ${received} to resolve, but it never did`,
			};
		}

		const actualTimePassed = resolvedAt - timeBefore;
		if (!resolvedAt || resolvedAt - timeBefore < timePassedMs) {
			return {
				pass: false,
				message: () =>
					`expected ${received} to resolve after at least ${timePassedMs}ms, but it resolved in ${actualTimePassed}ms`,
			};
		}

		return {
			pass: true,
			message: () => `${received} resolved after ${actualTimePassed}ms`,
		};
	},
});
