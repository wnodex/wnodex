import passport from 'passport';

import { describe, expect, it } from 'vitest';

import { parsePassportOptions } from '../../passport/src/parse-options';

describe('PassportOptionsSchema', () => {
  it('should return default when input is undefined', () => {
    const options = parsePassportOptions();
    expect(options).toBe(false);
  });

  it('should return true when input is true', () => {
    const options = parsePassportOptions(true);
    expect(options).toBe(true);
  });

  it('should return false when input is false', () => {
    const options = parsePassportOptions(false);
    expect(options).toBe(false);
  });

  it('should return the passport instance when provided', () => {
    const customPassport = new passport.Passport();
    const options = parsePassportOptions(customPassport);
    expect(options).toBe(customPassport);
  });

  it('should throw an error for invalid input', () => {
    // @ts-expect-error - Testing invalid input
    expect(() => parsePassportOptions(123)).toThrow('Invalid Passport options');
  });
});
