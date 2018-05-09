import React, { Component } from 'react';
// import _ from 'lodash';?
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      resultArr1: [[]],
      resultArr2: [[]],
      x_flag: false,
    }
  }

  renderValue = (value, i, j) => {
    let key = `${i}-${j}`;
    let val = '';

    if (value === 1){
     val =(<span style={{color: 'green'}}>X</span>);
    }

    if (value ===2) {
      val = (<span style={{color: 'red'}}>O</span>);
    }

    return <td onClick={() => this.handleClick(i,j)} key={key}>{val}</td>
  }

  handleClick = (row,col) => {
    let {x_flag,arr} = this.state;
    if(arr[row][col] !== 0) {return}
    arr[row][col] = x_flag ? 1 : 2;
    this.setState({
      x_flag: !x_flag,
      arr: arr
    })
  }

  renderMatrix(){
    let {arr} = this.state;
    let _this = this;
    return arr.map((subarr, i) => {
      //defined returntd function
      let rendertd = function(arr){
        return arr.map((val, j) =>{return _this.renderValue(val, i, j)})
      };


      return (<tr key={`row ${i}`}> {rendertd(subarr)}</tr>)
    })
  }

  handleReset = () => {
    this.setState({
      arr:  [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]
    })
  }

  render() {
    return (
      <div>
        <button className="btn" onClick={this.handleReset}>Reset</button>
        <table className="table table-bordered">
          <tbody>
          {this.renderMatrix()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
