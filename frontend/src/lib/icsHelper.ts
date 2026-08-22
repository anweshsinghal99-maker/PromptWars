import { TimetableSlot } from './types';

export const ics_service = {
  generate_calendar_ics(timetable_slots: TimetableSlot[], user_name: string = "Student"): string {
    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//SemesterCopilot//AcademicTimetable//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      `X-WR-CALNAME:Semester Copilot - ${user_name}`,
      "X-WR-TIMEZONE:Asia/Kolkata"
    ];

    const day_offsets: Record<string, number> = {
      "Monday": 0,
      "Tuesday": 1,
      "Wednesday": 2,
      "Thursday": 3,
      "Friday": 4
    };
    const base_monday = new Date(2026, 7, 24); // Aug 24, 2026

    timetable_slots.forEach((slot, i) => {
      const day = slot.day_of_week || "Monday";
      const offset = day_offsets[day] || 0;
      const event_date = new Date(base_monday);
      event_date.setDate(base_monday.getDate() + offset);

      const [startH, startM] = (slot.start_time || "09:00").split(":").map(Number);
      const [endH, endM] = (slot.end_time || "10:00").split(":").map(Number);

      const dtStart = new Date(event_date);
      dtStart.setHours(startH, startM, 0);

      const dtEnd = new Date(event_date);
      dtEnd.setHours(endH, endM, 0);

      const formatICSDate = (d: Date) => {
        const pad = (n: number) => String(n).padStart(2, '0');
        return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
      };

      const dtstart_str = formatICSDate(dtStart);
      const dtend_str = formatICSDate(dtEnd);

      lines.push(
        "BEGIN:VEVENT",
        `UID:semcopilot-${i}-${dtstart_str}@semestercopilot.ai`,
        `DTSTAMP:${formatICSDate(new Date())}Z`,
        `DTSTART;TZID=Asia/Kolkata:${dtstart_str}`,
        `DTEND;TZID=Asia/Kolkata:${dtend_str}`,
        "RRULE:FREQ=WEEKLY;UNTIL=20261215T235959Z",
        `SUMMARY:${slot.subject_name} (${slot.subject_code})`,
        `LOCATION:${slot.room || 'Campus'}`,
        `DESCRIPTION:Slot Type: ${slot.slot_type || 'Lecture'}`,
        "STATUS:CONFIRMED",
        "END:VEVENT"
      );
    });

    lines.push("END:VCALENDAR");
    return lines.join("\r\n");
  }
};
