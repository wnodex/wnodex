import { describe, expect, it } from 'vitest';

import { parseBodyParserOptions } from '../../body-parser/src/parse-options';

describe('BodyParserOptionsSchema', () => {
  it('should return default when input is undefined', () => {
    const options = parseBodyParserOptions();
    expect(options).toBe(true);
  });

  it('should return true when input is true', () => {
    const options = parseBodyParserOptions(true);
    expect(options).toBe(true);
  });

  it('should return false when input is false', () => {
    const options = parseBodyParserOptions(false);
    expect(options).toBe(false);
  });

  it('should return an empty object when input is an empty object', () => {
    const options = parseBodyParserOptions({});
    expect(options).toEqual({});
  });

  it('should return the json options when provided', () => {
    const jsonOptions = { limit: '10mb' };
    const options = parseBodyParserOptions({ json: jsonOptions });
    expect(options).toEqual({ json: jsonOptions });
  });

  it('should return the urlencoded options when provided', () => {
    const urlencodedOptions = { extended: false };
    const options = parseBodyParserOptions({ urlencoded: urlencodedOptions });
    expect(options).toEqual({ urlencoded: urlencodedOptions });
  });

  it('should return both json and urlencoded options when provided', () => {
    const jsonOptions = { limit: '10mb' };
    const urlencodedOptions = { extended: false };
    const options = parseBodyParserOptions({
      json: jsonOptions,
      urlencoded: urlencodedOptions,
    });
    expect(options).toEqual({
      json: jsonOptions,
      urlencoded: urlencodedOptions,
    });
  });

  it('should throw an error for invalid input', () => {
    // @ts-expect-error - Testing invalid input
    expect(() => parseBodyParserOptions(123)).toThrow(
      'Invalid body-parser options'
    );
  });
});
