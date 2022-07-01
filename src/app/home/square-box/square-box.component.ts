import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-square-box',
  templateUrl: './square-box.component.html',
  styleUrls: ['./square-box.component.css']
})
export class SquareBoxComponent implements OnInit {
  @Input() square;
  constructor(public gameService: ServiceService) { }

  ngOnInit() {
  }

  changePlayer(){ 
    this.gameService.isGameRunning = true;
    if ( this.gameService.isGameRunning && this.square.state === null ){
      this.square.state =  this.gameService.activePlayer;
      this.gameService.changePlayerTurn();
    }
  }

}
