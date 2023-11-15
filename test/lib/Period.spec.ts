import { expect, test } from "vitest";
import Period from "lib/time/Period";

test("three months ago", () => {
    const period = Period.from("3M");
    expect(period.description).toBe("3M");
    expect(period.start).toEqual(new Date(2021, 8, 23));
});

test("six months ago", () => {
    const period = Period.from("6M");
    expect(period.description).toBe("6M");
    expect(period.start).toEqual(new Date(2021, 5, 23));
});

test("one year ago", () => {
    const period = Period.from("1Y");
    expect(period.description).toBe("1Y");
    expect(period.start).toEqual(new Date(2020, 11, 23));
});

test("period equality check", () => {
    expect(Period.from("3M").equals(Period.from("3M"))).toBe(true);
    expect(Period.from("3M").equals(Period.from("6M"))).toBe(false);
});
