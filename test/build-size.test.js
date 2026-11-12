import {execFileSync, spawnSync} from 'node:child_process';
import {
	copyFileSync,
	cpSync,
	mkdtempSync,
	readFileSync,
	rmSync,
	symlinkSync,
} from 'node:fs';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';
import {
	expect,
	test,
} from 'bun:test';

test('only CI rejects unaccepted bundle increases above 50 bytes', () => {
	const dir = mkdtempSync(join(tmpdir(), 'lui-build-size-'));
	const env = {...process.env};
	delete env.CI;
	delete env.GITHUB_REF_NAME;
	delete env.LUI_ACCEPT_SIZE_INCREASE;
	const run = extra => spawnSync(process.execPath, ['build.js'], {
		cwd: dir,
		env: {...env, ...extra},
		encoding: 'utf8',
	});
	const git = (args, input) => execFileSync('git', args, {
		cwd: dir,
		env: {
			...env,
			GIT_AUTHOR_NAME: 'Test',
			GIT_AUTHOR_EMAIL: 'test@example.invalid',
			GIT_COMMITTER_NAME: 'Test',
			GIT_COMMITTER_EMAIL: 'test@example.invalid',
		},
		input,
		encoding: 'utf8',
	}).trim();

	try {
		copyFileSync('build.js', join(dir, 'build.js'));
		copyFileSync('package.json', join(dir, 'package.json'));
		cpSync('src', join(dir, 'src'), {recursive: true});
		symlinkSync(resolve('node_modules'), join(dir, 'node_modules'), 'dir');
		git(['init', '-q']);
		const initial = run({});
		expect(initial.status).toBe(0);
		expect(initial.stderr).not.toContain('Bundle size increases');
		const entries = [
			['lui.js', 51],
			['luix.js', 50],
		].map(([filename, diff]) => {
			const size = readFileSync(join(dir, 'dist', filename)).length;
			const blob = git(['hash-object', '-w', '--stdin'], Buffer.alloc(size - diff));
			return `100644 blob ${blob}\t${filename}\n`;
		});
		const tree = git(['mktree'], entries.join(''));
		const commit = git(['commit-tree', tree], 'baseline');
		git(['update-ref', 'refs/remotes/origin/dist', commit]);
		const ci = {CI: 'true', GITHUB_REF_NAME: 'master'};
		const rejected = run(ci);
		expect(rejected.status).toBe(1);
		expect(rejected.stderr).toContain('lui.js: +51 bytes');
		expect(rejected.stderr).not.toContain('luix.js: +50 bytes');
		expect(rejected.stderr).toContain('Size increase requires confirmation');
		const accepted = run({...ci, LUI_ACCEPT_SIZE_INCREASE: '1'});
		expect(accepted.status).toBe(0);
		expect(accepted.stderr).toContain('lui.js: +51 bytes');
		const local = run({});
		expect(local.status).toBe(0);
		expect(local.stderr).toContain('lui.js: +51 bytes');
	}
	finally {
		rmSync(dir, {recursive: true, force: true});
	}
}, 300000);
