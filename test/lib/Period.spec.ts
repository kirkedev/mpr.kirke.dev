import { vi, test, expect, beforeAll, afterAll } from "vitest";
import Period from "lib/Period";

beforeAll(function() {
    vi.useFakeTimers().setSystemTime(new Date(2020, 4, 1).getTime());
});

afterAll(function() {
    vi.useRealTimers();
});

test("one month ago", () => {
    const period = Period.from("1M");
    expect(period.description).toBe("1M");
    expect(period.start).toEqual(new Date(2020, 3, 1));
});

test("three months ago", () => {
    const period = Period.from("3M");
    expect(period.description).toBe("3M");
    expect(period.start).toEqual(new Date(2020, 1, 1));
});

test("six months ago", () => {
    const period = Period.from("6M");
    expect(period.description).toBe("6M");
    expect(period.start).toEqual(new Date(2019, 10, 1));
});

test("one year ago", () => {
    const period = Period.from("1Y");
    expect(period.description).toBe("1Y");
    expect(period.start).toEqual(new Date(2019, 4, 1));
});

test("period equality check", () => {
    expect(Period.from("1M").equals(Period.from("1M"))).toBe(true);
    expect(Period.from("1M").equals(Period.from("3M"))).toBe(false);
});
