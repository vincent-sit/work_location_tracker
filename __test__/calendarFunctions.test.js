import {collectAllVisibleDaysAndData, getLastDay} from "../src/components/Calendar/index";

describe("findWorkDays", () => {
  it("should return a list of date object with at least date and dayOfWeek properties", () => {
    const startDate = new Date("2023", "3", "7"); // 2023/04/07
    const daysCount = 4;
    const includeWeekends = true;
    const dataStreamed = [
      {
        "id": "769ff108-2d58-4a80-848e-8088fdfe118c",
        "userId": "9c99490d-e90c-406f-84af-edd0b70cea04",
        "locationId": "9472fc81-87fc-468f-a76f-e4db73870ac3",
        "date": "2023-04-07T00:00:00"
      },
      {},
      {},
      {
        "id": "56e9ce26-4e4e-4dbe-8057-ddbdc6c84b53",
        "userId": "9c99490d-e90c-406f-84af-edd0b70cea04",
        "locationId": "9472fc81-87fc-468f-a76f-e4db73870ac3",
        "date": "2023-04-10T00:00:00"
      }
    ];
    expect(collectAllVisibleDaysAndData(startDate, daysCount, includeWeekends, dataStreamed)).toEqual([
      {
        "locationId": "9472fc81-87fc-468f-a76f-e4db73870ac3",
        "date": new Date("2023-04-07T00:00:00"),
        "dayOfWeek": "Friday"
      },
      {        
        "date": new Date("2023-04-08T00:00:00"),
        "dayOfWeek": "Saturday"
      },
      {        
        "date": new Date("2023-04-09T00:00:00"),
        "dayOfWeek": "Sunday"
      },
      {
        "locationId": "9472fc81-87fc-468f-a76f-e4db73870ac3",
        "date": new Date("2023-04-10T00:00:00"),
        "dayOfWeek": "Monday"
      },
    ])

  })
})

describe("getLastDay", () => {
  it("should return the last day within the range of time", () => {
    const startDate = new Date("2023", "3", "7"); // 2023/04/07
    const daysCount = 4;
    const includeWeekends = true;
    expect(getLastDay(startDate, daysCount, includeWeekends))
    .toEqual(new Date("2023", "3", "10"));
  })
})