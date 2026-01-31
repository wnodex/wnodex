import { describe, expect, it } from 'vitest';

import { parseCompressionOptions } from '../../compression/src/parse-options';

describe('CompressionOptionsSchema', () => {
  it('should return default when input is undefined', () => {
    const options = parseCompressionOptions();
    expect(options).toBe(true);
  });

  it('should return true when input is true', () => {
    const options = parseCompressionOptions(true);
    expect(options).toBe(true);
  });

  it('should return false when input is false', () => {
    const options = parseCompressionOptions(false);
    expect(options).toBe(false);
  });

  it('should throw an error for invalid input', () => {
    // @ts-expect-error - Testing invalid input
    expect(() => parseCompressionOptions(123)).toThrow(
      'Invalid compression options'
    );
  });
});
