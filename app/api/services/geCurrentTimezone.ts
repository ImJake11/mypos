import { start } from "nprogress";

function getTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function getStartAndEndDate(
    yesterday: number
) {
    const now = new Date();
    now.setDate(now.getDate() - yesterday);

    const options = { timeZone: getTimezone() };

    const year = now.toLocaleString('en-US', { ...options, year: 'numeric' });
    const month = now.toLocaleString('en-US', { ...options, month: 'numeric' });
    const day = now.toLocaleString('en-US', { ...options, day: 'numeric' });

    const startDateStr = `${month}/${day}/${year} 00:00:00`;
    const endDateStr = `${month}/${day}/${year} 23:59:59.999`;

    const startDate = new Date(startDateStr)
    const endDate = new Date(endDateStr)

    const timezoneOffset = startDate.getTimezoneOffset() * 6000;
    const startDateInTimezoe = new Date(startDate.getTime() + timezoneOffset);
    const endDateInTimezone = new Date(endDate.getTime() + timezoneOffset);

    return {
        start: startDateInTimezoe,
        end: endDateInTimezone,
        timezone: getTimezone(),
    }
}