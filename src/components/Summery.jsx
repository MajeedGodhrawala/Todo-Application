import { connect } from "react-redux";
import Card from "./Card";

const Summery = ({ tasks }) => {
  return (
    <>
      <div className="d-flex gap-2">
        <Card extraClass="flex-fill" title="Total Tasks">
          <div className="fs-3 fw-bold">{tasks.length}</div>
        </Card>
        <Card extraClass="flex-fill" title="Completed Tasks">
          <div className="fs-3 fw-bold">
            {tasks.filter((task) => task.completed).length}
          </div>
        </Card>
        <Card extraClass="flex-fill" title="InComplete Tasks">
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
