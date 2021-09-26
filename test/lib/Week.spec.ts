import Week from "@ams/lib/Week";

test("format a Week as ISO 8601", () => {
    const week = new Week(2020, 17);
    expect(week.toString()).toBe("2020W17");
});

test("get the Week of a specific date", () => {
    const week = Week.with(new Date(2020, 3, 20));
    expect(week.year).toBe(2020);
    expect(week.week).toBe(17);
});

test("parse a Week from compact ISO 8601 format", () => {
    const week = Week.parse("2020W17");
    expect(week.year).toBe(2020);
    expect(week.week).toBe(17);
});

test("parse a Week from delimited ISO 8601 format", () => {
    const week = Week.parse("2020-W17");
    expect(week.year).toBe(2020);
    expect(week.week).toBe(17);
});

test("get the date at the beginning of a Week", () => {
    const week = new Week(2020, 17);
    expect(week.start).toEqual(new Date(2020, 3, 20));
});

test("get the date at the end of a Week", () => {
    const week = new Week(2020, 17);
    expect(week.end).toEqual(new Date(2020, 3, 26));
});

test("get the Monday within a Week", () => {
    const week = new Week(2020, 17);
    expect(week.monday).toEqual(new Date(2020, 3, 20));
});

test("get the Tuesday within a Week", () => {
    const week = new Week(2020, 17);
    expect(week.tuesday).toEqual(new Date(2020, 3, 21));
});

test("get the Wednesday within a Week", () => {
    const week = new Week(2020, 17);
    expect(week.wednesday).toEqual(new Date(2020, 3, 22));
});

test("get the Thursday within a Week", () => {
    const week = new Week(2020, 17);
    expect(week.thursday).toEqual(new Date(2020, 3, 23));
});

test("get the Friday within a Week", () => {
    const week = new Week(2020, 17);
    expect(week.friday).toEqual(new Date(2020, 3, 24));
});

test("get the Saturday within a Week", () => {
    const week = new Week(2020, 17);
    expect(week.saturday).toEqual(new Date(2020, 3, 25));
});

test("get the Sunday within a Week", () => {
    const week = new Week(2020, 17);
    expect(week.sunday).toEqual(new Date(2020, 3, 26));
});

test("get all dates in a week", () => {
    const week = new Week(2020, 17);

    expect(Array.from(week.days)).toEqual([
        new Date(2020, 3, 20),
        new Date(2020, 3, 21),
        new Date(2020, 3, 22),
        new Date(2020, 3, 23),
        new Date(2020, 3, 24),
        new Date(2020, 3, 25),
        new Date(2020, 3, 26),
    ]);
});

test("get the previous week", () => {
    const week = new Week(2020, 17).previous;
    expect(week.year).toBe(2020);
    expect(week.week).toBe(16);
});

test("get the previous week before the first week of a year", () => {
    const week = new Week(2021, 1).previous;
    expect(week.year).toBe(2020);
    expect(week.week).toBe(53);
});

test("get the next week", () => {
    const week = new Week(2020, 17).next;
    expect(week.year).toBe(2020);
    expect(week.week).toBe(18);
});

test("get the next week following the last week of a year", () => {
    const week = new Week(2020, 53).next;
    expect(week.year).toBe(2021);
    expect(week.week).toBe(1);
});

test("check if a given date is within a Week", () => {
    const week = new Week(2020, 17);
    expect(week.contains(new Date(2020, 3, 20))).toBe(true);
    expect(week.contains(new Date(2020, 4, 20))).toBe(false);
});

test("create a sequence of Weeks between two dates", () => {
    const start = new Date(2020, 3, 20);
    const end = new Date(2021, 3, 20);
    const weeks = Array.from(Week.with(start, end));

    expect(weeks.length).toBe(53);
    expect(`${weeks[0]}`).toBe("2020W17");
    expect(`${weeks[1]}`).toBe("2020W18");
    expect(`${weeks[2]}`).toBe("2020W19");
    expect(`${weeks[3]}`).toBe("2020W20");
    expect(`${weeks[37]}`).toBe("2021W01");
    expect(`${weeks[38]}`).toBe("2021W02");
    expect(`${weeks[39]}`).toBe("2021W03");
    expect(`${weeks[52]}`).toBe("2021W16");
});
