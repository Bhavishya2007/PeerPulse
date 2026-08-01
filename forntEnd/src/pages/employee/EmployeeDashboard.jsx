import {
  useEffect,
  useState
} from "react";

import {
  Award,
  Heart,
  PenLine,
  TrendingUp
} from "lucide-react";

import {
  Link
} from "react-router-dom";

import StatCard from "../../components/StatCard";

import ShoutoutCard
  from "../../components/ShoutoutCard";

import UpdateCard
  from "../../components/UpdateCard";

import Loading
  from "../../components/Loading";

import {
  getMyUpdates,
  getReceivedShoutouts,
  getShoutoutQuota
} from "../../services/employeeApi";

import {
  useAuth
} from "../../context/AuthContext";


export default function EmployeeDashboard() {

  const { user } = useAuth();


  const [updates, setUpdates] =
    useState([]);

  const [shoutouts, setShoutouts] =
    useState([]);

  const [quota, setQuota] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    async function load() {

      try {

        const [
          updateData,
          shoutoutData,
          quotaData
        ] = await Promise.all([

          getMyUpdates(),

          getReceivedShoutouts(),

          getShoutoutQuota()

        ]);


        setUpdates(updateData);

        setShoutouts(shoutoutData);

        setQuota(quotaData);

      }

      finally {

        setLoading(false);

      }

    }


    load();

  }, []);


  if (loading) {

    return (
      <Loading />
    );

  }


  return (

    <>

      <div className="page-header">

        <div>

          <div className="page-title">
            Good day, {user?.name}
          </div>

          <div className="page-subtitle">
            Track your contributions and recognition.
          </div>

        </div>


        <Link
          to="/employee/update"
          className="btn btn-primary"
        >
          <PenLine size={17} />
          Add Daily Update
        </Link>

      </div>


      <div className="stats-grid">

        <StatCard
          icon={<TrendingUp size={20} />}
          value={updates.length}
          label="Daily Updates"
        />

        <StatCard
          icon={<Heart size={20} />}
          value={shoutouts.length}
          label="Recognition Received"
        />

        <StatCard
          icon={<Award size={20} />}
          value={
            quota
              ? quota.used
              : 0
          }
          label="Shoutouts Given"
        />

        <StatCard
          icon={<Award size={20} />}
          value={
            quota
              ? quota.remaining
              : 16
          }
          label="Shoutouts Remaining"
        />

      </div>


      <div className="dashboard-grid">

        <div className="card">

          <div className="card-header">

            <div className="card-title">
              Recent Work Updates
            </div>

            <Link
              to="/employee/update"
              className="btn btn-secondary"
            >
              Add
            </Link>

          </div>


          {updates.length === 0 ? (

            <div className="empty-state">
              No daily updates yet.
            </div>

          ) : (

            updates
              .slice(0, 5)
              .map(update => (

                <UpdateCard
                  key={update.id}
                  update={update}
                />

              ))

          )}

        </div>


        <div className="card">

          <div className="card-header">

            <div className="card-title">
              Recent Recognition
            </div>

            <Link
              to="/employee/recognition"
              className="btn btn-secondary"
            >
              View All
            </Link>

          </div>


          {shoutouts.length === 0 ? (

            <div className="empty-state">
              No recognition received yet.
            </div>

          ) : (

            shoutouts
              .slice(0, 4)
              .map(item => (

                <ShoutoutCard
                  key={item.id}
                  shoutout={item}
                  senderName="Team Member"
                />

              ))

          )}

        </div>

      </div>

    </>

  );

}