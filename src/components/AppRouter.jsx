import React from "react"

import { HashRouter as Router, Route } from "react-router-dom"

import TasksPage from "./TaskPage/TasksPage"

function AppRouter() {
  return (
    <Router>
      <Route exact path="/" component={TasksPage} ></Route>
    </Router>
  )
}

export default AppRouter
