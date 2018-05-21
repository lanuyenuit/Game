import React, { Component } from 'react';
import _ from 'lodash';
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
      x_flag: false,
      winer: null,
      countWiner: false


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
    let {x_flag,arr, winer} = this.state;
    if(arr[row][col] !== 0) {return}

    if (winer) {
      arr[row][col] = 0
    }
    else {
      arr[row][col] = x_flag ? 1 : 2;
    }

    this.setState({
      x_flag: !x_flag,
      arr: arr
    })

    if (this.checkWinByRow(arr[row][col], row, col) 
    || this.checkWinByCol(arr[row][col], row, col)
    || this.checkWinByMainCross(arr[row][col], row, col)
    || this.checkWinBySubCross(arr[row][col], row, col) ) {
      winer = arr[row][col] === 1 ? 'X ': 'O '
    }
    this.setState({
      winer: winer,
      countWiner: !winer
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
      ],
      winer: null
    })
  }

  checkWinByRow = (_value, i, j) => {
    let {arr} = this.state
    let result = true
    _.forEach(arr[i], (value) => {
      if (_value !== value){
        result = false
      }
    })
    return result
  }

  checkWinByCol = (_value, _i, j) => {
    let result = true
    let {arr} = this.state
    _.forEach([0,1,2], (i) => {
      if (_value !== arr[i][j]){
        result = false
      }
    })
    return result
  }

  checkWinByMainCross= (_value, _i, j) => {
    let result = true
    let {arr} = this.state
    _.forEach([0,1,2], (i) => {
      if (_value !== arr[i][i]){
        result = false
      }
      
    })
    return result
  }

  checkWinBySubCross= (_value, _i, j) => {
    let result = true
    let {arr} = this.state
    _.forEach([0,1,2], (i) => {
      if (_value !== arr[i][2-i]){
        result = false
      }
    })
    return result
  }

  componentDidUpdate() {
    let {winer} = this.state

    if (winer) {

      // alert(winer + 'win')
      // window.setTimeout(()=>{alert (winer + 'win')}, 0)
      console.log (winer + 'win')

    }

  }

  executeX = () => {
    this.setState({
      x_flag: true
    })
  }

  executeO = () => {
    this.setState({
      x_flag: false
    })
  }

  shouldComponentUpdate() {
    let {countWiner} = _.clone(this.state)

    return !countWiner
  }



  render() {
    return (
      <div>
        <button className="btn" onClick={this.handleReset}>Reset</button>
        <button className="btn" onClick={this.executeX}>X priority</button>
        <button className="btn" onClick={this.executeO}>O priority</button>
        <table className="table table-bordered">
          <tbody>
          {
            this.renderMatrix()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
