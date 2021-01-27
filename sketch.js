var grid;
var next;
 
var dA= 1;
var dB= 0.4;
var feed= 0.0354;
var k= 0.0628;

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  grid=[];
  next=[];
  
  for(var x=0; x<width; x++){
    grid[x]=[];
    next[x]=[];
    for(var y=0; y<height; y++){
      grid[x][y]= { a:1, b:0 }
      next[x][y]= { a:1, b:0 }
    }
  }
  
  for (var i=100; i<110; i++){
    for (var j=100; j<110; j++){
      grid[i][j].b=1;
    }
  }
  
  
}
function draw() {
  background(51);
  
  for(var x=1; x<width-1; x++){
   for(var y=1; y<height-1; y++){ 
     var a = grid[x][y].a;
     var b = grid[x][y].b;
     
     next[x][y].a= a + (dA * laplaceA(x,y)) - 
                             (a * b * b )+
                            (feed * (1-a));
    
     next[x][y].b= b + (dB * laplaceB(x,y)) + 
                             (a * b * b )-
                            ((k + feed) * b);
    
     next[x][y].a = constrain(next[x][y].a, 0, 1);
    next[x][y].b = constrain(next[x][y].b, 0, 1);
     
     
     
    }
  }
 
  
  loadPixels();
  for(var x=0; x<width; x++){
   for(var y=0; y<height; y++){ 
     var pix=(x+y*width)*4
     var a = grid[x][y].a;
     var b = grid[x][y].b;
     var c= floor((a-b)*255);
     
     pixels[pix+0]=c;     
     pixels[pix+1]=c*a;
     pixels[pix+2]=180;
     pixels[pix+3]=255;
    }
  }
  
  updatePixels();
  
  
  swap();


}

function laplaceA(x, y) {
  var sumA = 0;
  sumA += grid[x][y].a * -1;
  sumA += grid[x - 1][y].a * 0.2;
  sumA += grid[x + 1][y].a * 0.2;
  sumA += grid[x][y + 1].a * 0.2;
  sumA += grid[x][y - 1].a * 0.2;
  sumA += grid[x - 1][y - 1].a * 0.05;
  sumA += grid[x + 1][y - 1].a * 0.05;
  sumA += grid[x + 1][y + 1].a * 0.05;
  sumA += grid[x - 1][y + 1].a * 0.05;
  return sumA;
}

function laplaceB(x, y) {
  var sumB = 0;
  sumB += grid[x][y].b * -1;
  sumB += grid[x - 1][y - 1].b * 0.05;
  sumB += grid[x + 1][y - 1].b * 0.05;
  sumB += grid[x + 1][y + 1].b * 0.05;
  sumB += grid[x - 1][y + 1].b * 0.05;
  sumB += grid[x - 1][y].b * 0.2;
  sumB += grid[x + 1][y].b * 0.2;
  sumB += grid[x][y + 1].b * 0.2;
  sumB += grid[x][y - 1].b * 0.2;
  return sumB;
}



function swap() {
  var temp = grid;
  grid = next;
  next = temp;
}
