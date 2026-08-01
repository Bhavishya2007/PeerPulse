from sqlalchemy.orm import Session

from models.weekly_report import WeeklyReport

from models.daily_update import DailyUpdate

from models.shoutout import Shoutout

from schemas.report_schema import (
    WeeklyReportCreate
)


# --------------------------------------------------
# CREATE WEEKLY REPORT
# --------------------------------------------------

def create_weekly_report(
    db: Session,
    payload: WeeklyReportCreate
):

    row = WeeklyReport(

        employee_id=
            payload.employee_id,

        week_start=
            payload.week_start,

        week_end=
            payload.week_end,

        summary=
            payload.summary,

        shoutout_summary=
            payload.shoutout_summary,

        tl_feedback=
            payload.tl_feedback

    )


    db.add(row)

    db.commit()

    db.refresh(row)


    return row


# --------------------------------------------------
# GET REPORTS
# --------------------------------------------------

def get_team_reports(
    db: Session
):

    return (

        db.query(WeeklyReport)

        .order_by(

            WeeklyReport.week_start.desc()

        )

        .all()

    )


# --------------------------------------------------
# BUILD AI CONTEXT
# --------------------------------------------------

def build_employee_context(
    db: Session,
    employee_id: int,
    month: str
):

    updates = (

        db.query(DailyUpdate)

        .filter(

            DailyUpdate.employee_id ==
            employee_id,

            DailyUpdate.work_date.like(
                f"{month}%"
            )

        )

        .all()

    )


    shoutouts = (

        db.query(Shoutout)

        .filter(

            Shoutout.receiver_id ==
            employee_id

        )

        .all()

    )


    reports = (

        db.query(WeeklyReport)

        .filter(

            WeeklyReport.employee_id ==
            employee_id,

            WeeklyReport.approved ==
            True,

            WeeklyReport.week_start.like(
                f"{month}%"
            )

        )

        .all()

    )


    return {

        "daily_updates": [

            {

                "date":
                    str(update.work_date),

                "achievement":
                    update.achievement,

                "blockers":
                    update.blockers,

                "assistance":
                    update.assistance

            }

            for update in updates

        ],


        "shoutouts": [

            {

                "message":
                    shoutout.message,

                "competency":
                    shoutout.competency,

                "date":
                    str(shoutout.created_at)

            }

            for shoutout in shoutouts

        ],


        "approved_weekly_reports": [

            {

                "week":
                    f"{report.week_start} "
                    f"to {report.week_end}",

                "summary":
                    report.summary,

                "shoutout_summary":
                    report.shoutout_summary,

                "tl_feedback":
                    report.tl_feedback

            }

            for report in reports

        ]

    }