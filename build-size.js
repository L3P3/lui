import {createInterface} from 'node:readline';

export function size_increase(filename, size, size_before) {
	const diff = size - size_before;
	return size_before !== null && diff > 100 ? {filename, diff} : null;
}

export async function confirm_size_increases(increases, {
	input = process.stdin,
	output = process.stderr,
	accepted = false,
} = {}) {
	if (!increases.length) return;

	output.write('Bundle size increases over 100 bytes:\n');
	for (const {filename, diff} of increases)
		output.write(`  ${filename}: +${diff} bytes\n`);

	if (accepted) return;
	if (!input.isTTY || !output.isTTY)
		throw new Error('Size increase requires confirmation; set LUI_ACCEPT_SIZE_INCREASE=1 to proceed');

	const readline = createInterface({input, output});
	const answer = await new Promise(resolve => {
		readline.question('Continue? [y/N] ', resolve);
		readline.once('close', () => resolve(''));
	});
	readline.close();
	if (!/^y(es)?$/i.test(answer.trim()))
		throw new Error('Build cancelled due to bundle size increase');
}
