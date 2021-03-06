import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';



class Square extends React.Component {
    render() {
      return (
        <button className="square"
         onClick={()=>this.props.onClick()}>
         {this.props.blah}
         </button>
      );
    } 
  }

  
  class Board extends React.Component {
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         xIsNext: true,
    //     }
    // }


    renderSquare(i) {
      return <Square blah={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      />;
    }
  
    render() {
        // const winner = calculateWinner(this.state.squares);
      

  
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            history: [{squares: Array(9).fill(null)}]
            ,xIsNext: true
            ,stepNumber: 0,
        }
    }

    jumpTo(step){
      this.setState({
        stepNumber: step
        ,xIsNext: (step % 2) === 0
        ,
      })
    }

    



    putAnXorO(i){
        // const squares = this.state.history[this.state.history.length - 1].squares.slice();
        if(this.state.stepNumber !== this.state.history.length -1){
          return;
        }
        const history = this.state.history.slice(0, this.state.stepNumber +1)
        const current = history[history.length -1];
        const squares = current.squares.slice();

        if(calculateWinner(squares) || squares[i]){
            return
        }
        squares[i] = this.state.xIsNext? 'X' : 'O'
        this.setState({
            history: this.state.history.concat([{
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        });
    }


    resetTheGame(){
      this.setState({
        history: [{squares: Array(9).fill(null)}]
            ,xIsNext: true
            ,stepNumber: 0,
      })
    }


    showTheResetButton(){
      
      
      // const winner = calculateWinner(this.state.history[this.state.history.length - 1].squares)
      if(calculateWinner(this.state.history[this.state.history.length - 1].squares) || this.state.history.length === 10){
        return(
         <button onClick={()=> this.resetTheGame()}>new game</button>
        )
      }




    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move)=>{
            const desc = move ? `Go to move # ${move}` : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={()=> this.jumpTo(move)}>
                        {desc}
                    </button>
                </li>
            )
        });



        let status;
        if(winner){
            status = `Winner: ${winner}`
        }else{
         status = `Next player: ${(this.state.xIsNext? 'X' : 'O')}`;
        }


      return (
        <div className="game">
          <div className="game-board">
          {/* <button onClick={()=> this.resetTheGame()}>new game</button> */}
          {this.showTheResetButton()}
            <Board
            squares = {current.squares}
            onClick = {(i)=> this.putAnXorO(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  



  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }







// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';



// class Square extends React.Component {



//   render() {
//     return (
//       <button className="square" 
//       onClick={this.props.onClick}>{this.props.blah}
//       </button>
//     );
//   }
// }

// class Board extends React.Component {

//   // constructor(props){
//   //   super(props)
//   //   this.state = {
//   //     squares: Array(9).fill(null),
//   //     xIsNext: true, 
//   //   }
//   // }

//   putAnXorO(i){

//     const squares = this.state.squares.slice();
//     if(calculateWinner(squares) || squares[i]){
//       return
//     }
//     squares[i] = this.state.xIsNext ? 'X' : 'O'
//     this.setState({
//       squares: squares,
//       xIsNext: !this.state.xIsNext,
//     });
//     console.log(i, squares[i])
  


//   }


//   renderSquare(i) {
//     return <Square blah={this.props.squares[i]}
//     onClick={()=>this.props.onClick(i)}
    
//      />;
//   }

//   render() {

//     // const winner = calculateWinner(this.state.squares)
//     // let status;
//     // if(winner){
//     //   status = `winner: ${winner}`
//     // }else{
//     //   const status = `Next player:  ${(this.state.xIsNext? 'X' : 'O')}` 
//     // }


    

//     return (
//       <div>
//         {/* <div className="status">{status}</div> */}
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }

// class Game extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {
//         history: [{
//           squares: Array(9).fill(null)
//         }],
//         xIsNext: true,
//     }
//   }

//   putAnXorO(i){

//     // const squares = this.state.squares.slice();
//     const squares = this.state.history[this.state.history.length - 1].squares.slice();
//     if(calculateWinner(squares) || squares[i]){
//       return
//     }
//     squares[i] = this.state.xIsNext ? 'X' : 'O'
//     this.setState({
//       history: this.state.history.concat([{
//           squares: squares,
//         }]),
//       xIsNext: !this.state.xIsNext,
//     });
//     console.log(i, squares[i])
  


//   }

  


//   render() {
//     const history = this.state.history;
//     const current = history[history.length - 1]
//     const winner = calculateWinner(current.squares);


//     const moves = history.map((step, move) => {

//         const desc = move ? `go to move # ${move}` :  `go to game start`;

//         return (

//             <li>
//               <button onClick={()=> this.jumpTo(move)}>
//                 {desc}
//               </button>
//               </li>

//         );

//     })

//     let status;

  
//     if(winner){
//       status = `winner: ${winner}`
//     }else{
//       const status = `Next player:  ${(this.state.xIsNext? 'X' : 'O')}` 
//     }




//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board 
//           squares = {current.squares}
//           onClick = {(i)=> this.putAnXorO}
          
//           />
//         </div>
//         <div className="game-info">
//           <div>{status}</div>
//           <ol>{moves}</ol>
//         </div>
//       </div>
//     );


//   }






// }

// // ========================================

// ReactDOM.render(
//   <Game />,
//   document.getElementById('root')
// );


// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }