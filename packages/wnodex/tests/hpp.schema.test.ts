import { describe, expect, it } from 'vitest';

import { parseHppOptions } from '../../hpp/src/parse-options';

describe('HppOptionsSchema', () => {
  it('should return default when input is undefined', () => {
    const options = parseHppOptions();
    expect(options).toBe(true);
  });

  it('should return true when input is true', () => {
    const options = parseHppOptions(true);
    expect(options).toBe(true);
  });

  it('should return false when input is false', () => {
    const options = parseHppOptions(false);
    expect(options).toBe(false);
  });

  it('should return the whitelist array when provided', () => {
    const whitelist = ['param1', 'param2'];
    const options = parseHppOptions(whitelist);
    expect(options).toEqual(whitelist);
  });

  it('should throw an error for invalid input', () => {
    // @ts-expect-error - Testing invalid input
    expect(() => parseHppOptions(123)).toThrow('Invalid Hpp options');
  });
});
