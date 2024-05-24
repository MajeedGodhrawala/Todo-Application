import { useRef, useState } from "react";
import Body from "../components/Body";
import Button from "../components/Button";
import List from "../components/List";
import Card from "../components/Card";
import { connect } from "react-redux";
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

        <List></List>
      </Body>
    </>
  );
};

export default Dashboard;
