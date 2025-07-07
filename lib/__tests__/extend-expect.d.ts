declare module 'expect' {
	interface Matchers<R> {
		toResolveAfterAtLeast(value: number): Promise<R>;
	}
}
