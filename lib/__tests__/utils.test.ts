import { describe, it, expect } from '@jest/globals';

import { validatePrivacy, formatDate } from '../utils';

describe('validatePrivacy', function () {
	it('skips undefined keys', function () {
		expect(validatePrivacy(['nonExistentKey'], {})).toEqual({});
	});
	it('preserves private/public as values', function () {
		expect(
			validatePrivacy(['privateKey', 'publicKey'], {
				privateKey: 'private',
				publicKey: 'public',
			}),
		).toEqual({
			privateKey: 'private',
			publicKey: 'public',
		});
	});
	it('converts true/false to public/private', function () {
		expect(
			validatePrivacy(['trueKey', 'falseKey'], {
				trueKey: true,
				falseKey: false,
			}),
		).toEqual({
			trueKey: 'public',
			falseKey: 'private',
		});
	});
});

describe('formatDate', function () {
	it.each([
		[new Date('0001-01-01'), '0001-01-01'],
		[new Date('0010-10-10'), '0010-10-10'],
		[new Date('0100-09-10'), '0100-09-10'],
		[new Date('1000-09-09'), '1000-09-09'],
	])('formats dates correctly, %p => %s', function (input, expected) {
		expect(formatDate(input)).toBe(expected);
	});
});
