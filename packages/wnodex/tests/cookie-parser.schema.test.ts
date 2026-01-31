import { describe, expect, it } from 'vitest';

import { parseCookieParserOptions } from '../../cookie-parser/src/parse-options';

describe('CookieParserOptionsSchema', () => {
  it('should return default when input is undefined', () => {
    const options = parseCookieParserOptions();
    expect(options).toBe(false);
  });

  it('should return true when input is true', () => {
    const options = parseCookieParserOptions(true);
    expect(options).toBe(true);
  });

  it('should return false when input is false', () => {
    const options = parseCookieParserOptions(false);
    expect(options).toBe(false);
  });

  it('should return the secret when a string is provided', () => {
    const secret = 'my-secret';
    const options = parseCookieParserOptions({ secret });
    expect(options).toEqual({ secret });
  });

  it('should return the secret when an array is provided', () => {
    const secret = ['my-secret-1', 'my-secret-2'];
    const options = parseCookieParserOptions({ secret });
    expect(options).toEqual({ secret });
  });

  it('should return the secret and options when provided', () => {
    const secret = 'my-secret';
    const cookieOptions = { maxAge: 1000 };
    const options = parseCookieParserOptions({
      secret,
      options: cookieOptions,
    });
    expect(options).toEqual({ secret, options: cookieOptions });
  });

  it('should throw an error for invalid input', () => {
    // @ts-expect-error - Testing invalid input
    expect(() => parseCookieParserOptions(123)).toThrow(
      'Invalid cookie-parser options'
    );
  });

  it('should throw an error for an empty object', () => {
    // @ts-expect-error - Testing invalid input
    expect(() => parseCookieParserOptions({})).toThrow(
      'Invalid cookie-parser options'
    );
  });
});
