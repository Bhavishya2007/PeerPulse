import {
  useEffect,
  useState
} from "react";

import {
  Award
} from "lucide-react";

import ShoutoutCard
  from "../../components/ShoutoutCard";

import Loading
  from "../../components/Loading";

import {
  getReceivedShoutouts
} from "../../services/employeeApi";


export default function MyRecognition() {

  const [shoutouts, setShoutouts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    getReceivedShoutouts()

      .then(setShoutouts)

      .finally(() =>
        setLoading(false)
      );

  }, []);


  if (loading) {

    return <Loading />;

  }


  return (

    <>

      <div className="page-header">

        <div>

          <div className="page-title">
            My Recognition
          </div>

          <div className="page-subtitle">
            See the appreciation you've received from peers.
          </div>

        </div>

      </div>


      <div className="card">

        <div className="card-title">

          <Award
            size={18}
            style={{
              verticalAlign: "middle"
            }}
          />

          {" "}Peer Shoutouts

        </div>


        {shoutouts.length === 0 ? (

          <div className="empty-state">
            You haven't received any shoutouts yet.
          </div>

        ) : (

          shoutouts.map(
            shoutout => (

              <ShoutoutCard
                key={shoutout.id}
                shoutout={shoutout}
                senderName="Team Member"
              />

            )
          )

        )}

      </div>

    </>

  );

}