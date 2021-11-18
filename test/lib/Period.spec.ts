import Period from "lib/Period";

beforeAll(() => jest.useFakeTimers().setSystemTime(new Date(2020, 4, 1).getTime()));
afterAll(jest.useRealTimers);

test("one month ago", () => {
    const period = Period.OneMonth;
    expect(period.description).toBe("1M");
    expect(period.start).toEqual(new Date(2020, 3, 1));
});

test("three months ago", () => {
    const period = Period.ThreeMonths;
    expect(period.description).toBe("3M");
    expect(period.start).toEqual(new Date(2020, 1, 1));
});

test("six months ago", () => {
    const period = Period.SixMonths;
    expect(period.description).toBe("6M");
    expect(period.start).toEqual(new Date(2019, 10, 1));
});

test("one year ago", () => {
    const period = Period.OneYear;
    expect(period.description).toBe("1Y");
    expect(period.start).toEqual(new Date(2019, 4, 1));
});
