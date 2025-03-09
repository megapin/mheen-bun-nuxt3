import { describe, it, expect } from 'vitest';
import { useFileExplorer } from './useFileExplorer';

describe('useFileExplorer', () => {
	it('should initialize correctly', () => {
		const explorer = useFileExplorer();
		expect(explorer).toBeDefined();
	});

	it('should have a method to open a file', () => {
		const explorer = useFileExplorer();
		expect(typeof explorer.openFile).toBe('function');
	});

	it('should have a method to close a file', () => {
		const explorer = useFileExplorer();
		expect(typeof explorer.closeFile).toBe('function');
	});
});