import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class ServiceService {
  public board = [];
  activePlayer: string;
  players : any ;
  isGameRunning: boolean = false;
  isGameOver: boolean = false;
  startIn : number = 0;
  win: any ;
  winner: any = [];
  
  url = "http://localhost:3000/"

  constructor(private http: HttpClient) {
    this.getData();
 }
  
 newGame(){
   this.activePlayer 
   this.isGameRunning = false;
   this.isGameOver =  false;
   this.win = null;
   this.startIn  = 0;
   this.board = this.createBoard();
   this.changePlayerTurn();
 } 

//  Get & Update APi's
getPlayerList() : Observable<any>{
    return this.http.get<any>(this.url+'playerList')
 }
 getPlayer(id: any) : Observable<any>{
  return this.http.get<any>(this.url+'playerList/'+id)
}
 updatePlayer(id: any, data: any) : Observable<any>{
  return this.http.put<any>(this.url+'playerList/'+ id, data)
}
// end 
getData(){
  this.getPlayerList().subscribe(res=>{
    var contentData;
    contentData = res.map(
          (data) => data.playerSymbol
        )
        this.players = contentData;
  })
}

 createBoard(){
   let board = [];
   for( let i = 0; i < 25; i ++ ){
     board.push( { id: i, state: null } )
   };
   return board
 } 

 changePlayerTurn(){  
   let d = this.startIn +=1
   if(d==4){
     this.startIn = 0
   }
   this.activePlayer = this.players[d-1]
   this.getWinner();
   let id = this.players.indexOf(this.win);
   this.getWiinerPlayer(id)
  }

  getWiinerPlayer(id){
    if(id>=0){
    this.getPlayer(id).subscribe( res => {
      this.winner = res;
    })
    }
    console.log("Win");
  }

  getWinner(){
    //Get vertical
    for (let a = 0; a < 5; a++) {
      for (let b = a; b < a + 10; b += 5){
      if (
        this.board[b].state &&
        this.board[b].state === this.board[ b + 5 ].state &&
        this.board[b].state === this.board[ b + 10 ].state
      ) {
        this.win = this.board[b].state;
        this.isGameRunning = false;
        this.isGameOver = true;
      }
    }
  }
   //Get horizontal
   for (let a = 0; a < 5; a++) {
    for (let b = a * 5; b < a * 5 + 3; b++){
    if (
      this.board[b].state &&
      this.board[b].state === this.board[b + 1].state &&
      this.board[b].state === this.board[b + 2].state
    ) {
      this.win = this.board[b].state;
      this.isGameRunning = false;
      this.isGameOver = true;
  }
}
  //Get criss-cross
  for (let a = 1; a <= 3; a++) {
    for (let b = a * 5 + 1; b < a * 5 + 4; b++){
    if (
      this.board[b].state &&
      this.board[b].state === this.board[ b - 6 ].state &&
      this.board[b].state === this.board[ b + 6 ].state
    ) {
      this.win = this.board[b].state;
      this.isGameRunning = false;
      this.isGameOver = true;
    }
    else if (
      this.board[b].state &&
      this.board[b].state === this.board[ b - 4 ].state &&
      this.board[b].state === this.board[ b + 4 ].state
    ) {
      this.win = this.board[b].state;
      this.isGameRunning = false;
      this.isGameOver = true;
    }
  }
}
  return null;
}
}

get getBoard (){
  return this.board
}
set setBoard( board  ){
  this.board = [...board]
}

}
