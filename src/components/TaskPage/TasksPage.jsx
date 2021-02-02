import React from 'react'

import Delete from '../../assets/delete.png'

import './TaskPage.scss'

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList : [],
      newTask : ""
    };
  }

  handleChange(event) {
    this.setState({newTask: event.target.value});
  }

  fetchTaskList(){
    fetch('/api/tasks/fetch', {
        method: 'get',
        headers: {
          'Accept': '*/*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Cache-control': 'no-cache'
        }})
      .then(response => response.json())
      .then(data => {
        this.setState({taskList : data.tasks})
      })
      .catch(err => console.log(err));
  }

  addTask(){
    let tmp = this.state.taskList;
    tmp.push(this.state.newTask);
    this.setState({taskList : tmp});
    fetch('/api/tasks/add/'+this.state.newTask)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.fetchTaskList()
        alert("Successfuly added")
      })
      .catch(err => console.log("ERREUR " + err));
  }

  deleteTask(event){
    fetch('/api/tasks/delete/'+event.target.id)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.fetchTaskList()
        alert("Successfuly deleted")
      })
      .catch(err => console.log("ERREUR " + err));
  }

  componentDidMount(){
    this.fetchTaskList()
  }

  render(){
    return (
      <div id="container">
        <h1 id="titreApp">TodoApp</h1>
        <div className="addPart">
          <input type="text" id="addInput" onChange={this.handleChange.bind(this)} placeholder="What's next ?"></input>
          <button onClick={this.addTask.bind(this)} id="addButton">Add a task</button>
        </div>
        <br/><br/>
        <div id="list" className="list">
          {this.state.taskList.map((item, i) => {
            return (<div key={i} className="containerTask borderTask">
                <p className="taskItem">{item}</p>
                <img src={Delete} id={i} onClick={this.deleteTask.bind(this)} className="picture"/>
              </div>) 
          })}
        </div>
        <br/><br/><br/>
      </div>
    )
  }
}

export default DashboardPage;
