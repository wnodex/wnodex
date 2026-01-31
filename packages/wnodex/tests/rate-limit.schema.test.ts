import { describe, expect, it } from 'vitest';

import { DEFAULT_RATE_LIMIT_OPTIONS } from '../../rate-limit/src/defaults';
import { parseRateLimitOptions } from '../../rate-limit/src/parse-options';

describe('RateLimitOptionsSchema', () => {
  it('should return default when input is undefined', () => {
    const options = parseRateLimitOptions();
    expect(options).toEqual(DEFAULT_RATE_LIMIT_OPTIONS);
  });

  it('should return true when input is true', () => {
    const options = parseRateLimitOptions(true);
    expect(options).toBe(true);
  });

  it('should return false when input is false', () => {
    const options = parseRateLimitOptions(false);
    expect(options).toBe(false);
  });

  it('should return the custom options when provided', () => {
    const customOptions = {
      windowMs: 1000,
      max: 10,
      message: 'Too many requests',
    };
    const options = parseRateLimitOptions(customOptions);
    expect(options).toEqual(customOptions);
  });

  it('should use defaults for missing properties', () => {
    const customOptions = {
      max: 50,
    };
    const options = parseRateLimitOptions(customOptions);
    expect(options).toEqual({
      ...DEFAULT_RATE_LIMIT_OPTIONS,
      ...customOptions,
    });
  });

  it('should throw an error for invalid input', () => {
    // @ts-expect-error - Testing invalid input
    expect(() => parseRateLimitOptions('invalid')).toThrow(
      'Invalid rate-limit options'
    );
  });

  it('should throw an error for an invalid object', () => {
    // @ts-expect-error - Testing invalid input
    expect(() => parseRateLimitOptions({ windowMs: -100 })).toThrow(
      'Invalid rate-limit options'
    );
  });
});
