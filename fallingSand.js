
function make2DArray(cols,rows){
      let arr = new Array(cols);
      for (let i = 0; i<arr.length; i++){
            arr[i] = new Array(rows);
            for(let j=0; j<arr[i].length; j++){
                  arr[i][j] = 0;
            }
      }
      return arr;
}

let grid;
let w = 5;

let cols,rows;
 
let hueValue = 1;



function setup(){
      createCanvas(600,500);
      colorMode(HSB, 360, 255, 255);
      cols = width /w;
      rows = height /w;
      grid = make2DArray(cols,rows);

      for (let i = 0; i<cols; i++){
            for (let j = 0; j<rows; j++){
                  grid[i][j] = 0;
            }
      }
      // grid[20][10]=1;
}


function mouseDragged(){
      let col = floor(mouseX/w);    
      let row = floor(mouseY/w);
      grid[col][row] = hueValue;
      hueValue+=0.1;
      hueValue%=360;
}

function draw(){
      background(0);

      for(let i =0; i<cols; i++){
            for(let j =0; j<rows; j++){
                  // stroke(255);
                  noStroke();
                  if(grid[i][j]>0){
                        fill(grid[i][j],255,255);
                        let x = i*w;
                        let y = j*w;
                        square(x,y,w);
                  }
            }
      }

      let nextGrid = make2DArray(cols,rows)
      for(let i=0; i<cols; i++){
            for(let j=0;j<rows; j++){
                  let state = grid[i][j];
                  if(state > 0){
                        let below = grid[i][j+1];

                        let dir = random(1) < 0.5 ? -1 : 1;
                        let belowA,belowB;

                        if(i+dir>=0 && i+dir<=cols-1){
                              belowA = grid[i+dir][j+1];
                        }
                        if(i-dir>=0 && i-dir<=cols-1){
                              belowB = grid[i-dir][j+1];
                        }

                        if(below === 0){
                              nextGrid[i][j+1]=state;
                        }
                        else if(belowA === 0){
                              nextGrid[i+dir][j+1]=state;
                        }
                        else if(belowB === 0){
                              nextGrid[i-dir][j+1]=state;
                        }
                        else{
                              nextGrid[i][j]=state;
                        }
                  }
            }
      }
      grid = nextGrid;
}

