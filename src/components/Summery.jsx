import { connect } from "react-redux";
import Card from "./Card";

const Summery = ({ tasks }) => {
  return (
    <>
      <div className="d-flex flex-sm-row flex-column gap-2">
        <Card
          className="shadow-sm mb-3 bg-body-tertiary rounded flex-fill"
          title="Total Tasks"
        >
          <div className="fs-3 fw-bold">{tasks.length}</div>
        </Card>
        <Card
          className="shadow-sm mb-3 bg-body-tertiary rounded flex-fill"
          title="Completed Tasks"
        >
          <div className="fs-3 fw-bold">
            {tasks.filter((task) => task.completed).length}
          </div>
        </Card>
        <Card
          className="shadow-sm mb-3 bg-body-tertiary rounded flex-fill"
          title="InComplete Tasks"
        >
          <div className="fs-3 fw-bold">
            {tasks.filter((task) => !task.completed).length}
          </div>
        </Card>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

export default connect(mapStateToProps, null)(Summery);
