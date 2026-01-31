import { describe, expect, it } from 'vitest';

import { parseHelmetOptions } from '../../helmet/src/parse-options';

describe('HelmetOptionsSchema', () => {
  it('should return default when input is undefined', () => {
    const options = parseHelmetOptions();
    expect(options).toBe(false);
  });

  it('should return true when input is true', () => {
    const options = parseHelmetOptions(true);
    expect(options).toBe(true);
  });

  it('should return false when input is false', () => {
    const options = parseHelmetOptions(false);
    expect(options).toBe(false);
  });

  it('should return the custom options when provided', () => {
    const customOptions = {
      contentSecurityPolicy: false,
    };
    const options = parseHelmetOptions(customOptions);
    expect(options).toEqual(customOptions);
  });

  it('should throw an error for invalid input', () => {
    // @ts-expect-error - Testing invalid input
    expect(() => parseHelmetOptions(123)).toThrow('Invalid Helmet options');
  });
});
