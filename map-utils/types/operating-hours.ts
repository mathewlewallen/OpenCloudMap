export type OperatingHours = {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    sunrise: boolean;
    sunset: boolean;
    byNotam: boolean;
    publicHolidaysExcluded: boolean;
    remarks: string;
  };