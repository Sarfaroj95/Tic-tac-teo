import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from './service/service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tic-tac-teo';
  startGame: boolean = true;
  getForm: FormGroup;
  editID: any;
  editMode: boolean = false;
  previousPlayer: string;
  viewData : any = [];
  playersData: any = [];
  msg = "";
  constructor( public gameService: ServiceService,
    private fb: FormBuilder
    ){
  
  }
  resetGame(){
    this.gameService.newGame()
   
  }
  ngOnInit() {
    this.getPlayer();
    this.initForm();
  }

  initForm(){
    this.getForm = this.fb.group({
      playerName : [''],
      playerSymbol : [''],

    })
  }
  getPlayer(){
    this.gameService.getPlayerList().subscribe( res=> {
      this.playersData = res;
    })
  }

  edit(i){
    this.previousPlayer = this.gameService.players[i]
    this.editMode = true;
    this.startGame = false;
    this.editID = i;
    this.gameService.getPlayer(i).subscribe(
      res=> {
      this.viewData = res;
    })
  }
  cancel(){
    this.editMode = false;
    this.startGame = true;
  }
  ionViewDidLoad(){
    setTimeout(() => {
        this.msg = ""
    }, 2000);
}
  onSubmit(){
    let data = this.getForm.value;
    this.gameService.updatePlayer(this.editID, data).subscribe( 
      res=> {
        this.editMode = false;
        this.startGame = true;
        this.getPlayer();
        this.msg = "Update successfully !"
        this.ionViewDidLoad();

    })

    let playerSymbol = this.getForm.value.playerSymbol;
    this.gameService.players[this.editID] = playerSymbol;
    this.editMode = false;
    for( let i=0; i<this.gameService.board.length; i++){
      if (this.gameService.board[i].state === this.previousPlayer){
        this.gameService.board[i].state = playerSymbol;
      }
    }
  }

  gameStart(){
    this.gameService.newGame();
    this.startGame = false;
    this.ionViewDidLoad();
  }

 
 
}
