import Body from "../components/Body";
import Records from "../components/Records";
import Summery from "./Summery";

const Dashboard = () => {
  return (
    <>
      <Body
        cardClass="m-3"
        title="Welcome back!"
        subTitle="Here's a list of your tasks!"
      >
        <Summery></Summery>
        <Records></Records>
      </Body>
    </>
  );
};

export default Dashboard;
