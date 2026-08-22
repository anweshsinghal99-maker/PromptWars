from datetime import datetime, timedelta
from typing import List, Dict, Any

class ICSService:
    """
    Service to generate iCalendar (.ics) format files for Google Calendar, Apple Calendar, and Outlook.
    """

    @staticmethod
    def generate_calendar_ics(timetable_slots: List[Dict[str, Any]], user_name: str = "Student") -> str:
        lines = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//SemesterCopilot//AcademicTimetable//EN",
            "CALSCALE:GREGORIAN",
            "METHOD:PUBLISH",
            f"X-WR-CALNAME:Semester Copilot - {user_name}",
            "X-WR-TIMEZONE:Asia/Kolkata"
        ]

        # Map day name to a starting date in 2026 for recurrence (Monday = Aug 24, 2026)
        day_offsets = {
            "Monday": 0,
            "Tuesday": 1,
            "Wednesday": 2,
            "Thursday": 3,
            "Friday": 4
        }
        base_monday = datetime(2026, 8, 24)

        for i, slot in enumerate(timetable_slots):
            day = slot.get("day_of_week", "Monday")
            offset = day_offsets.get(day, 0)
            event_date = base_monday + timedelta(days=offset)
            
            start_parts = [int(p) for p in slot.get("start_time", "09:00").split(":")]
            end_parts = [int(p) for p in slot.get("end_time", "10:00").split(":")]

            dt_start = event_date.replace(hour=start_parts[0], minute=start_parts[1], second=0)
            dt_end = event_date.replace(hour=end_parts[0], minute=end_parts[1], second=0)

            dtstart_str = dt_start.strftime("%Y%m%dT%H%M%S")
            dtend_str = dt_end.strftime("%Y%m%dT%H%M%S")
            now_str = datetime.utcnow().strftime("%Y%m%dT%H%M%SZ")

            lines.extend([
                "BEGIN:VEVENT",
                f"UID:semcopilot-{i}-{dtstart_str}@semestercopilot.ai",
                f"DTSTAMP:{now_str}",
                f"DTSTART;TZID=Asia/Kolkata:{dtstart_str}",
                f"DTEND;TZID=Asia/Kolkata:{dtend_str}",
                "RRULE:FREQ=WEEKLY;UNTIL=20261215T235959Z",
                f"SUMMARY:{slot.get('subject_name')} ({slot.get('subject_code')})",
                f"LOCATION:{slot.get('room', 'Campus')}",
                f"DESCRIPTION:Slot Type: {slot.get('slot_type', 'Lecture')} | Batch: {slot.get('batch', 'All')}",
                "STATUS:CONFIRMED",
                "END:VEVENT"
            ])

        lines.append("END:VCALENDAR")
        return "\r\n".join(lines)

ics_service = ICSService()
