import React, { Component } from 'react';
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
    }
  }

  renderValue = (value, i, j) => {

    let key = `cell ${i}-${j}`;
    let val = '';
    if (value === 1){
     val ='X';
    }
    if (value ===2) {
      val = 'O';
    }
    return <td onClick={() => this.handleClick(i,j)} key={key}>{val}</td>


  }

  handleClick = (row,col) => {
    let {x_flag,arr} = this.state;
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
      let rendertd = function(arr, j){
        return arr.map((val) =>{return _this.renderValue(val, i, j)})
      };
      return (<tr key={`row ${i}`} > {rendertd(subarr)}</tr>)
    })


  }





  render() {
    return (
      <div>
        <table>
          <tbody>
          {this.renderMatrix()}
          </tbody>

        </table>
      </div>
    );
  }
}

export default App;
