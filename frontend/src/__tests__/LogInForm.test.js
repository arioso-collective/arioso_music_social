import { describe, it, expect } from 'vitest';
import { validateEmail } from '../utils/validation';

describe("validateEmail()", () => {
  it("should return true for valid email formats", () => {
    expect(validateEmail("test@example.com")).toBe(true);
    expect(validateEmail("user.name+filter@domain.co")).toBe(true);
    expect(validateEmail("email@sub.domain.com")).toBe(true);
  });

  it("should return false for invalid email formats", () => {
    expect(validateEmail("bademail")).toBe(false);
    expect(validateEmail("missing@domain")).toBe(false);
    expect(validateEmail("@nope.com")).toBe(false);
  });
});
