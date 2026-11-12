import {PassThrough} from 'node:stream';
import {
	expect,
	test,
} from 'bun:test';
import {
	confirm_size_increases,
	size_increase,
} from '../build-size.js';

test('only known bundle increases over 100 bytes require confirmation', () => {
	expect(size_increase('lui.js', 1101, 1000)).toEqual({
		filename: 'lui.js',
		diff: 101,
	});
	expect(size_increase('lui.js', 1100, 1000)).toBeNull();
	expect(size_increase('lui.js', 900, 1000)).toBeNull();
	expect(size_increase('lui.js', 1101, null)).toBeNull();
});

test('non-interactive builds require explicit acceptance', async () => {
	const output = new PassThrough();
	let text = '';
	output.on('data', data => { text += data; });
	const increases = [
		{filename: 'lui.js', diff: 101},
		{filename: 'luix.r.js', diff: 250},
	];
	await expect(confirm_size_increases(increases, {
		input: new PassThrough(),
		output,
	})).rejects.toThrow('requires confirmation');
	expect(text).toContain('lui.js: +101 bytes');
	expect(text).toContain('luix.r.js: +250 bytes');
	await expect(confirm_size_increases(increases, {
		input: new PassThrough(),
		output,
		accepted: true,
	})).resolves.toBeUndefined();
	await expect(confirm_size_increases([], {
		input: new PassThrough(),
		output,
	})).resolves.toBeUndefined();
});

for (const [answer, accepted] of [
	['y\n', true],
	['YES\n', true],
	['n\n', false],
	['\n', false],
]) {
	test(`interactive size confirmation: ${JSON.stringify(answer)}`, async () => {
		const input = new PassThrough();
		const output = new PassThrough();
		input.isTTY = output.isTTY = true;
		const result = confirm_size_increases([{filename: 'lui.js', diff: 101}], {
			input,
			output,
		});
		input.write(answer);
		if (accepted) await expect(result).resolves.toBeUndefined();
		else await expect(result).rejects.toThrow('Build cancelled');
		input.destroy();
		output.destroy();
	});
}

test('closing the prompt without an answer rejects the build', async () => {
	const input = new PassThrough();
	const output = new PassThrough();
	input.isTTY = output.isTTY = true;
	const result = confirm_size_increases([{filename: 'lui.js', diff: 101}], {
		input,
		output,
	});
	input.end();
	await expect(result).rejects.toThrow('Build cancelled');
	output.destroy();
});
