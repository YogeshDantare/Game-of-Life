const canvas = document.getElementById('gameSpace');
const ctx = canvas.getContext('2d');
canvas.height=1000;
canvas.width=1000;



class GameOfLife{
    constructor(){
        this.cell_size=5;
        this.cells_in_columns=Math.floor(canvas.height/this.cell_size);
        this.cells_in_rows=Math.floor(canvas.width/this.cell_size);
        this.dead_color="black";
        this.alive_color="white";
        this.curr_arr=[];
        this.prev_arr=[];
    };
   arrayInitialization=()=>{
        for(let i=0;i<this.cells_in_columns;i++){
            this.curr_arr[i]=[];
            for(let j=0;j<this.cells_in_rows;j++)
            this.curr_arr[i][j]=0;
        }
        this.prev_arr=this.curr_arr;
    };
     arrRandom=()=>{
        for(let i=0;i<this.cells_in_columns;i++)
        for(let j=0;j<this.cells_in_rows;j++)
        this.curr_arr[i][j]=Math.floor(Math.random()*2);
    };
    fillArr=()=>{
        for(let i=0;i<this.cells_in_columns;i++)
        for (let j = 0; j < this.cells_in_rows; j++) {
            let curr_color;
            if(this.curr_arr[i][j]===0)
            curr_color='black';
            else
            curr_color='white';
           
            ctx.fillStyle=curr_color;
            ctx.fillRect(j*this.cell_size,i*this.cell_size,this.cell_size,this.cell_size);
            
        }
    };
    updateCellValue=(row,col)=>{
        const total = this.countNeighbours(row, col);

        if (total > 4 || total < 3) {
            return 0;
        }
        // dead cell with 3 neighbours becomes alive. 0 => 1
        else if (this.curr_arr[row][col] === 0 && total === 3) {
            return 1;
        }
        // or returning its status back. 0 => 0; 1 => 1
        
        else {
            return this.curr_arr[row][col];
        }
        
    }
    updateLifeCycle=()=>{
        for (let i = 0; i < this.cells_in_columns; i++) {
            for (let j = 0; j < this.cells_in_rows; j++) {
                
                this.prev_arr[i][j] = this.updateCellValue(i, j);
            }
        }
        for (let i = 0; i < this.cells_in_columns; i++) 
            for (let j = 0; j < this.cells_in_rows; j++) 
                  this.curr_arr[i][j] = this.prev_arr[i][j];
            
        
    };
    setCellValueHelper=(row,col)  => {
        if(row>=0&&row<this.cells_in_rows&&col>=0&&col<this.cells_in_columns)
            return this.curr_arr[row][col];
        
      else return 0;
        };
        countNeighbours = (row, col) => {
            let total_neighbours = 0;
            total_neighbours += this.setCellValueHelper(row - 1, col - 1);
            total_neighbours += this.setCellValueHelper(row - 1, col);
            total_neighbours += this.setCellValueHelper(row - 1, col + 1);
            total_neighbours += this.setCellValueHelper(row, col - 1);
            total_neighbours += this.setCellValueHelper(row, col + 1);
            total_neighbours += this.setCellValueHelper(row + 1, col - 1);
            total_neighbours += this.setCellValueHelper(row + 1, col);
            total_neighbours += this.setCellValueHelper(row + 1, col + 1);
            return total_neighbours;
        };
  
  gameSetUp = () => {
    this.arrayInitialization();
    game.fillArr();
};
runGame = () => {
    this.updateLifeCycle();
    this.fillArr();
};
};
let repeat;
function intervalId(){
    repeat=window.setInterval(() => {
        game.runGame();
    }, 100)
}
const game = new GameOfLife()
game.gameSetUp();

window.onload = () => {
    document.querySelector("#randomise").addEventListener("click",()=>{
        game.arrRandom();
        game.fillArr();
    })
   document.querySelector("#start").addEventListener("click", () => {
       
        intervalId();
    })
    document.querySelector("#next").addEventListener("click", () => {
       
        clearInterval(repeat);
        game.runGame();
    })
    document.querySelector("#start-with-my-config").addEventListener("click",()=>{
        game.fillArr();
        document.querySelector("canvas").addEventListener("click",()=>{
            
        let xActive= event.clientX-canvas.getBoundingClientRect().left;
        let yActive=event.clientY-canvas.getBoundingClientRect().top;
        
        xActive=Math.floor(xActive/game.cell_size);
        yActive=Math.floor(yActive/game.cell_size);
     
        game.curr_arr[yActive][xActive]=1;
        game.fillArr();
    
})
    })
    document.querySelector("#pause").addEventListener("click",()=>{
       if( document.querySelector("#pause").innerHTML==="Play"){
        intervalId();
        document.querySelector("#pause").innerHTML="Pause";
       }
       
       else{ window.clearInterval(repeat);
        document.querySelector("#pause").innerHTML="Play";}
        
    })
    
  document.querySelector("#stop").addEventListener("click", () => {
       game.gameSetUp();
       clearInterval(repeat);
  })
}


