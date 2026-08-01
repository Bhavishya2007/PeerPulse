import {
  useEffect,
  useState
} from "react";

import {
  FileText,
  Heart,
  Users
} from "lucide-react";

import {
  Link
} from "react-router-dom";

import StatCard
  from "../../components/StatCard";

import Loading
  from "../../components/Loading";

import {
  getTeamLeadDashboard,
  getWeeklyReports
} from "../../services/teamleadApi";


export default function TeamLeadDashboard() {

  const [data, setData] =
    useState(null);

  const [reports, setReports] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    async function load() {

      try {

        const [
          dashboard,
          weeklyReports
        ] = await Promise.all([

          getTeamLeadDashboard(),

          getWeeklyReports()

        ]);


        setData(dashboard);

        setReports(
          weeklyReports
        );

      }

      finally {

        setLoading(false);

      }

    }


    load();

  }, []);


  if (loading) {

    return <Loading />;

  }


  return (

    <>

      <div className="page-header">

        <div>

          <div className="page-title">
            Team Lead Dashboard
          </div>

          <div className="page-subtitle">
            Review your team's continuous contributions.
          </div>

        </div>

        <Link
          to="/teamlead/reports"
          className="btn btn-primary"
        >
          <FileText size={17} />
          Weekly Reports
        </Link>

      </div>


      <div className="stats-grid">

        <StatCard
          icon={<Users size={20} />}
          value={
            data?.daily_updates?.length || 0
          }
          label="Weekly Updates"
        />

        <StatCard
          icon={<Heart size={20} />}
          value={
            data?.shoutouts?.length || 0
          }
          label="Peer Shoutouts"
        />

        <StatCard
          icon={<FileText size={20} />}
          value={reports.length}
          label="Weekly Reports"
        />

        <StatCard
          icon={<FileText size={20} />}
          value={
            reports.filter(
              report =>
                !report.approved
            ).length
          }
          label="Pending Review"
        />

      </div>


      <div className="dashboard-grid">

        <div className="card">

          <div className="card-title">
            Recent Team Contributions
          </div>


          {data?.daily_updates?.length === 0 ? (

            <div className="empty-state">
              No recent updates.
            </div>

          ) : (

            data?.daily_updates
              ?.slice(0, 8)
              .map(item => (

                <div
                  className="update-card"
                  key={item.id}
                >

                  <div className="update-date">
                    {item.work_date}
                  </div>

                  <div className="update-title">
                    Employee #{item.employee_id}
                  </div>

                  <div className="update-text">
                    {item.achievement}
                  </div>

                </div>

              ))

          )}

        </div>


        <div className="card">

          <div className="card-title">
            Peer Recognition
          </div>


          {data?.shoutouts?.length === 0 ? (

            <div className="empty-state">
              No shoutouts this week.
            </div>

          ) : (

            data?.shoutouts
              ?.slice(0, 6)
              .map(item => (

                <div
                  className="shoutout-card"
                  key={item.id}
                >

                  <div className="shoutout-avatar">
                    P
                  </div>

                  <div>

                    <strong>
                      Employee #{item.receiver_id}
                    </strong>

                    <div className="shoutout-message">
                      {item.message}
                    </div>

                  </div>

                </div>

              ))

          )}

        </div>

      </div>

    </>

  );

}