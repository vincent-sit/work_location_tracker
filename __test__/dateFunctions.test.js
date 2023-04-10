import {GetDateStringDDMMYY} from "../src/dateFunctions";

test('produce date short text', () => {
  const date = new Date("2023", "0", "1");
  expect(GetDateStringDDMMYY(date)).toBe("01-01-2023");
});

test('non-date variable passed in as parameter should return error', () => {
  const date = "1";
  expect(() => GetDateStringDDMMYY(date)).toThrow("Incorrect type passed in. Must be a date type.");
});

