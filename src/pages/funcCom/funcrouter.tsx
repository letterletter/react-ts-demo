import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom";
import WithRDemo from './hookdemo'
export default function HomeButton() {
  let history = useHistory();

  function handleClick() {
    history.push("/home");
  }
  useEffect(() => {
    console.log(3433)
    history.listen(historyLocation => {
      // 每次路由变化都会执行这个方法
      // console.log('route history , ', history);
      // console.log('route history location , ', historyLocation);
    })

  }, [history])

  return (
    <div>
    <button type="button" onClick={handleClick}>
      Go home jj
    </button>
    <hr />
      <WithRDemo />
    </div>
  );
}