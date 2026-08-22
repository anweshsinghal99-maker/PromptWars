import math
from typing import Dict, Any, List
from app.services.demo_data import DEMO_ATTENDANCE, DEMO_SUBJECTS

class AttendanceAgent:
    """
    Agent 4: Attendance Agent
    Responsibilities:
    - Compute Subject-wise Attendance Percentage.
    - Compute Safe Bunk Count: floor((attended - target_pct * total) / target_pct)
    - Compute Recovery Classes Needed: ceil((target_pct * total - attended) / (1 - target_pct))
    - Predict future attendance based on planned absences.
    - Flag danger thresholds and send risk notifications.
    """

    def __init__(self):
        pass

    def calculate_subject_metrics(self, record: Dict[str, Any], subject_name: str = "") -> Dict[str, Any]:
        attended = record.get("attended", record.get("attended_classes", 0))
        total = record.get("total", record.get("total_classes", 0))
        target_pct = record.get("target", record.get("target_percentage", 75.0))
        target_decimal = target_pct / 100.0

        if total == 0:
            current_pct = 100.0
            safe_bunks = 0
            classes_needed = 0
            is_danger = False
        else:
            current_pct = round((attended / total) * 100.0, 1)

            if current_pct >= target_pct:
                # Can bunk while: (attended) / (total + x) >= target_decimal
                # attended >= target_decimal * total + target_decimal * x
                # x <= (attended - target_decimal * total) / target_decimal
                safe_bunks = math.floor((attended - (target_decimal * total)) / target_decimal)
                safe_bunks = max(0, safe_bunks)
                classes_needed = 0
                is_danger = False
            else:
                safe_bunks = 0
                # Need to attend y consecutive classes:
                # (attended + y) / (total + y) >= target_decimal
                # attended + y >= target_decimal * total + target_decimal * y
                # y * (1 - target_decimal) >= target_decimal * total - attended
                numerator = (target_decimal * total) - attended
                denominator = 1.0 - target_decimal
                classes_needed = math.ceil(numerator / denominator) if denominator > 0 else 0
                classes_needed = max(0, classes_needed)
                is_danger = True

        return {
            "subject_code": record.get("subject_code", ""),
            "subject_name": subject_name or record.get("subject_code", ""),
            "attended_classes": attended,
            "total_classes": total,
            "current_percentage": current_pct,
            "target_percentage": target_pct,
            "safe_bunks": safe_bunks,
            "danger_threshold": is_danger,
            "classes_needed_for_target": classes_needed
        }

    def get_full_summary(self, attendance_list: List[Dict[str, Any]] = None, subjects: List[Dict[str, Any]] = None) -> Dict[str, Any]:
        records = attendance_list or DEMO_ATTENDANCE
        subjs = {s["code"]: s["name"] for s in (subjects or DEMO_SUBJECTS)}

        details = []
        total_att = 0
        total_held = 0
        at_risk = 0

        for rec in records:
            name = subjs.get(rec["subject_code"], rec["subject_code"])
            m = self.calculate_subject_metrics(rec, subject_name=name)
            details.append(m)
            total_att += m["attended_classes"]
            total_held += m["total_classes"]
            if m["danger_threshold"]:
                at_risk += 1

        overall_pct = round((total_att / total_held) * 100.0, 1) if total_held > 0 else 100.0

        return {
            "overall_percentage": overall_pct,
            "total_attended": total_att,
            "total_held": total_held,
            "target_percentage": 75.0,
            "at_risk_count": at_risk,
            "subject_details": details
        }

    def simulate_bunk(self, subject_code: str, skips_planned: int, attendance_list: List[Dict[str, Any]] = None) -> Dict[str, Any]:
        records = attendance_list or DEMO_ATTENDANCE
        rec = next((r for r in records if r["subject_code"].upper() == subject_code.upper()), None)
        
        if not rec:
            return {
                "subject_code": subject_code,
                "current_percentage": 0.0,
                "simulated_percentage": 0.0,
                "new_safe_bunks": 0,
                "is_safe": False,
                "status_message": f"Subject code {subject_code} not found."
            }

        attended = rec.get("attended", rec.get("attended_classes", 0))
        total = rec.get("total", rec.get("total_classes", 0))
        target_pct = rec.get("target", rec.get("target_percentage", 75.0))

        simulated_total = total + skips_planned
        simulated_pct = round((attended / simulated_total) * 100.0, 1) if simulated_total > 0 else 100.0
        is_safe = simulated_pct >= target_pct

        target_decimal = target_pct / 100.0
        if simulated_pct >= target_pct:
            new_safe = math.floor((attended - (target_decimal * simulated_total)) / target_decimal)
            new_safe = max(0, new_safe)
            msg = f"Safe to miss {skips_planned} class(es). Projected attendance will be {simulated_pct}% (Above {target_pct}% target). You will still have {new_safe} safe bunk(s) remaining."
        else:
            new_safe = 0
            numerator = (target_decimal * simulated_total) - attended
            denominator = 1.0 - target_decimal
            needed = math.ceil(numerator / denominator) if denominator > 0 else 0
            msg = f"WARNING: Missing {skips_planned} class(es) will drop your attendance to {simulated_pct}%, which is BELOW the {target_pct}% threshold! You will need to attend {needed} consecutive classes to recover."

        return {
            "subject_code": subject_code,
            "current_percentage": round((attended / total) * 100.0, 1) if total > 0 else 100.0,
            "simulated_percentage": simulated_pct,
            "new_safe_bunks": new_safe,
            "is_safe": is_safe,
            "status_message": msg
        }

attendance_agent = AttendanceAgent()
