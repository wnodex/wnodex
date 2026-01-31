import { describe, expect, it } from 'vitest';

import {
  DEFAULT_SESSION_COOKIE_HTTP_ONLY,
  DEFAULT_SESSION_COOKIE_MAX_AGE,
  DEFAULT_SESSION_COOKIE_SECURE,
  DEFAULT_SESSION_RESAVE,
  DEFAULT_SESSION_SAVE_UNINITIALIZED,
} from '../../session/src/defaults';
import { parseSessionOptions } from '../../session/src/parse-options';

describe('SessionOptionsSchema', () => {
  it('should return default when input is undefined', () => {
    const options = parseSessionOptions();
    expect(options).toBe(false);
  });

  it('should return false when input is false', () => {
    const options = parseSessionOptions(false);
    expect(options).toBe(false);
  });

  it('should return the session options with defaults for a valid secret', () => {
    const secret = 'my-secret';
    const options = parseSessionOptions({ secret });
    expect(options).toEqual({
      secret,
      resave: DEFAULT_SESSION_RESAVE,
      saveUninitialized: DEFAULT_SESSION_SAVE_UNINITIALIZED,
      cookie: {
        secure: DEFAULT_SESSION_COOKIE_SECURE,
        maxAge: DEFAULT_SESSION_COOKIE_MAX_AGE,
        httpOnly: DEFAULT_SESSION_COOKIE_HTTP_ONLY,
      },
    });
  });

  it('should return the full custom options when provided', () => {
    const customOptions = {
      secret: 'my-secret',
      resave: true,
      saveUninitialized: true,
      cookie: {
        secure: true,
        maxAge: 86_400_000,
        httpOnly: false,
      },
    };
    const options = parseSessionOptions(customOptions);
    expect(options).toEqual(customOptions);
  });

  it('should throw an error for invalid input', () => {
    // @ts-expect-error - Testing invalid input
    expect(() => parseSessionOptions(true)).toThrow('Invalid session options');
  });

  it('should throw an error for an empty object', () => {
    // @ts-expect-error - Testing invalid input
    expect(() => parseSessionOptions({})).toThrow('Invalid session options');
  });

  it('should use defaults for cookie when partial cookie is provided', () => {
    const secret = 'my-secret';
    const options = parseSessionOptions({
      secret,
      cookie: { maxAge: 1000 },
    });
    expect(options).toEqual({
      secret,
      resave: DEFAULT_SESSION_RESAVE,
      saveUninitialized: DEFAULT_SESSION_SAVE_UNINITIALIZED,
      cookie: {
        secure: DEFAULT_SESSION_COOKIE_SECURE,
        maxAge: 1000,
        httpOnly: DEFAULT_SESSION_COOKIE_HTTP_ONLY,
      },
    });
  });
});
