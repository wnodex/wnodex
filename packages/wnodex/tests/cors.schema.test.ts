import { describe, expect, it } from 'vitest';

import { DEFAULT_CORS_OPTIONS } from '../../cors/src/defaults';
import { parseCorsOptions } from '../../cors/src/parse-options';

describe('CorsOptionsSchema', () => {
  it('should return default when input is undefined', () => {
    const options = parseCorsOptions();
    expect(options).toEqual(DEFAULT_CORS_OPTIONS);
  });

  it('should return true when input is true', () => {
    const options = parseCorsOptions(true);
    expect(options).toBe(true);
  });

  it('should return false when input is false', () => {
    const options = parseCorsOptions(false);
    expect(options).toBe(false);
  });

  it('should return the custom options when provided', () => {
    const customOptions = {
      origin: 'https://example.com',
      methods: ['GET', 'POST'],
    };
    const options = parseCorsOptions(customOptions);
    expect(options).toEqual(customOptions);
  });

  it('should throw an error for invalid input', () => {
    // @ts-expect-error - Testing invalid input
    expect(() => parseCorsOptions(123)).toThrow('Invalid CORS options');
  });
});
