class Model {
    constructor() {
        this.grid = [0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0]
        this.gridChangeHandler=null;
        this.scoreUpdateHandler=null;
        this.gridWidth=4;
        this.gridHeight=4;
        this.totalCells=this.gridWidth*this.gridHeight;
        this.score=0;
        this.maxValue=2;
    }
    bindScoreUpdated = (handler)=>{
        this.scoreUpdateHandler=handler;
    }
    startNewGame=() => {
        this.grid.fill(0,0,this.totalCells-1);
        this.grid[Math.floor(Math.random()*this.totalCells)]=2;
        this.grid[Math.floor(Math.random()*this.totalCells)]=2;
        this.gridChangeHandler(this.grid);
    }
    moveRight =()=>{

        for(let i=0;i<this.gridHeight;++i)
        {
            const row=[]
            for(let j=0;j<this.gridWidth;++j) row.push(this.grid[this.gridWidth*i+j]);
            const nonZeroedRow=row.filter((num)=> {
                return !(num === 0);
            });
            const zeroedRow = row.filter((num) => {
                return num === 0;
            });
            zeroedRow.concat(nonZeroedRow).forEach((num,index)=>{
                this.grid[this.gridWidth*i+index]=num;
            });
        }
    }
    moveLeft =()=>{
        for(let i=0;i<this.gridHeight;++i)
        {
            const row=[]
            for(let j=0;j<this.gridWidth;++j) row.push(this.grid[this.gridWidth*i+j]);
            const nonZeroedRow=row.filter((num)=> {
                return !(num === 0);
            });
            const zeroedRow = row.filter((num) => {
                return num === 0;
            });
            nonZeroedRow.concat(zeroedRow).forEach((num,index)=>{
                this.grid[this.gridWidth*i+index]=num;
            });
        }
    }
    moveUp =()=>{
        for(let i =0;i<this.gridWidth;i++)
        {
            const column=[]
            for(let j=0;j<this.gridHeight;j++) column.push(this.grid[i+this.gridHeight*j]);
            const nonZeroedColumn=column.filter((num)=> {
                return !(num === 0);
            });
            const zeroedColumn=column.filter((num)=> {
                return num===0;
            });
            nonZeroedColumn.concat(zeroedColumn).forEach((num,index)=>{
                this.grid[i+this.gridHeight*index]=num;
            });
        }
    }
    moveDown =()=>{
        for(let i =0;i<4;i++)
        {
            const column=[]
            for(let j=0;j<this.gridHeight;j++) column.push(this.grid[i+this.gridHeight*j]);
            const nonZeroedColumn=column.filter((num)=> {
                return !(num === 0);
            });
            const zeroedColumn=column.filter((num)=> {
                return num===0;
            });
            zeroedColumn.concat(nonZeroedColumn).forEach((num,index)=>{
                this.grid[i+this.gridHeight*index]=num;
            });
        }
    }
    combineRowsOnMoveLeft=()=>{
        for(let i=0;i<this.gridWidth;i++) {
            for(let j=0;j<this.gridHeight-1;j++){
                if(this.grid[4*i+j]!=0 && this.grid[4*i+j] == this.grid[4*i+j+1] )
                {
                    this.grid[4*i+j]*=2;
                    this.grid[4*i+j+1]=0;
                    this.maxValue = Math.max(this.maxValue,this.grid[4*i+j]);
                    this.score+=this.grid[4*i+j];
                }
            }
        }
    }
    combineRowsOnMoveRight=()=>{
        for(let i=0;i<this.gridWidth;i++) {
            for(let j=this.gridHeight-1;j>0;j--){
                if(this.grid[4*i+j]!=0 && this.grid[4*i+j] == this.grid[4*i+j-1] )
                {
                    this.grid[4*i+j]*=2;
                    this.grid[4*i+j-1]=0;
                    this.maxValue = Math.max(this.maxValue,this.grid[4*i+j]);
                    this.score+=this.grid[4*i+j];
                }
            }
        }
    }
    combineColumnsOnMoveUp=()=>{
        for(let i=0;i<this.gridWidth;i++) {
            for(let j=0;j<this.gridHeight-1;j++){
                if(this.grid[i+4*j]!=0 && this.grid[i+4*j] == this.grid[i+4*(j+1)] )
                {
                    this.grid[i+4*j]*=2;
                    this.grid[i+4*(j+1)]=0;
                    this.maxValue = Math.max(this.maxValue,this.grid[i+4*j]);
                    this.score+=this.grid[i+4*j];
                }
            }
        }
    }
    combineColumnsOnMoveDown=()=>{
        for(let i=0;i<this.gridWidth;i++) {
            for(let j=this.gridHeight-1;j>0;j--){
                if(this.grid[i+4*j]!=0 && this.grid[i+4*j] == this.grid[i+4*(j-1)] )
                {
                    this.grid[i+4*j]*=2;
                    this.grid[i+4*(j-1)]=0;
                    this.maxValue = Math.max(this.maxValue,this.grid[i+4*j]);
                    this.score+=this.grid[i+4*j];
                }
            }
        }
    }
    insertNew =()=>{
        let zeroIndices=[];
        this.grid.forEach((num,i)=>{
            if(num==0) zeroIndices.push(i);
        })
        if(zeroIndices.length>0) this.grid[zeroIndices[Math.floor(Math.random()*zeroIndices.length)]]=2;
    };
    swipeRight=() => {
        this.moveRight();
        this.combineRowsOnMoveRight();
        this.moveRight();
        this.insertNew();
        this.scoreUpdateHandler(this.score);
        this.gridChangeHandler(this.grid);
    }
    swipeLeft=() =>{
        this.moveLeft();
        this.combineRowsOnMoveLeft();
        this.moveLeft();
        this.insertNew();
        this.scoreUpdateHandler(this.score);
        this.gridChangeHandler(this.grid);
    }
    swipeUp=() =>{
        this.moveUp();
        this.combineColumnsOnMoveUp();
        this.moveUp();
        this.insertNew();
        this.scoreUpdateHandler(this.score);
        this.gridChangeHandler(this.grid);
    }
    swipeDown =() =>{
        this.moveDown();
        this.combineColumnsOnMoveDown();
        this.moveDown();
        this.insertNew();
        this.scoreUpdateHandler(this.score);
        this.gridChangeHandler(this.grid);
    }
    bindGridUpdated = (handler) =>{
        this.gridChangeHandler= handler;
    }
}
class View{
    constructor() {
        this.gridDiv=document.getElementById("grid");
        this.scoreBoard=document.getElementById("score");
        this.createGrid();
    }
    getBackGroundColor=(value)=> {
        let backgroundColor="";
        switch (value)
        {
            case 2:
                backgroundColor= "rgba(250, 248, 239,0.9)";
                break;
            case 4:
                backgroundColor= "rgba(200, 181, 255,0.9)";
                break;
            case 8:
                backgroundColor= "rgba(239, 189, 120,0.9)";
                break;
            case 16:
                backgroundColor= "rgba(64, 164, 200,0.9)";
                break;
            case 32:
                backgroundColor= "rgba(80, 240, 64,0.9)";
                break;
            case 64:
                backgroundColor= "rgba(255, 85, 0,0.9)";
                break;
            case 128:
                backgroundColor= "rgba(240, 51, 204,0.9)";
                break;
            case 256:
                backgroundColor= "rgba(207, 252, 3,0.9)";
                break;
            case 512:
                backgroundColor= "rgba(240, 142, 245,0.9)";
                break;
            case 1024:
                backgroundColor= "rgba(206, 245, 142,0.9)";
                break;
            case 2048:
                backgroundColor= "rgba(230, 167, 41,0.9)";
                break;
            default: backgroundColor="rgba(224,255,255,0.9)";
        }
        return backgroundColor;
    }
    updateGrid(grid) {
        this.gridDiv.childNodes.forEach((node,num)=>{
            const value=grid[num];
            if(value) node.innerHTML=value;
            else node.innerHTML="";
            node.style.backgroundColor=this.getBackGroundColor(value);
        });

    }
    createGrid = () =>{
        for(let index=0;index<16;index++){
            const cell=document.createElement("div");
            cell.classList.add("center");
            cell.id=index.toString();
            this.gridDiv.appendChild(cell);
        }
    }
    bindSwipes = (leftSwipeHandler , rightSwipeHandler , upSwipeHandler , downSwipeHandler ) =>{
        document.onkeydown = function(e) {
            switch (e.key) {
                case 'ArrowLeft': leftSwipeHandler();
                    break;
                case 'ArrowUp': upSwipeHandler();
                    break;
                case 'ArrowRight': rightSwipeHandler();
                    break;
                case 'ArrowDown': downSwipeHandler();
                    break;
            }
        };
    }
    updateScoreBoard = (score) =>{
        this.scoreBoard.innerText=score;
    }
}
class Controller{
    constructor(model,view){
        this.model=model;
        this.view=view;
    }
	
    onScoreUpdated=(score)=>{
        this.view.updateScoreBoard(score);
    }
    handleStartNewGame=()=>{
		this.view.bindSwipes(this.handleLeftSwipe,this.handleRightSwipe,this.handleUpSwipe,this.handleDownSwipe);
        this.model.bindGridUpdated(this.onGridUpdated);
        this.model.bindScoreUpdated(this.onScoreUpdated);
		this.model.startNewGame();
    }
    onGridUpdated = (grid) =>{
        this.view.updateGrid(grid);
    }
    handleLeftSwipe = () =>{
        this.model.swipeLeft();
    }
    handleRightSwipe = () =>{
        this.model.swipeRight();
    }
    handleUpSwipe = () => {
        this.model.swipeUp();
    }
    handleDownSwipe = () =>{
        this.model.swipeDown();
    }

}
const controller=new Controller(new Model(),new View());