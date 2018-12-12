import { Component, OnInit} from '@angular/core';
import { Competition } from '../model/competition';
import { AppService } from '../app.service';
import { SessionService } from '../sessionService';
import { Router } from '@angular/router';


@Component({
    selector: 'my-competition',
    templateUrl: `app/competition/competition.component.html`,
    
  })

  export class CompetitionComponent implements OnInit{
 
public competition:Competition[];
public com:Competition;

constructor(private service:AppService,private sessionService:SessionService,private router:Router){}

ngOnInit() {
  this.getCompetition();
}

getCompetition(){
  this.service.getAllCompetition().subscribe((myCom)=>{
this.competition =JSON.parse(myCom['_body']);
console.log(this.competition)
  },(error)=>{

  });
}

getById(competitionId:number){
  this.service.getComById(competitionId).subscribe((getCom)=>{
this.com =getCom;
this.sessionService.setCompetition(this.com);
this.router.navigate(['/my-com']);
  },(erro)=>{});
}

  }