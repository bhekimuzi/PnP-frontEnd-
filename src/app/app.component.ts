import { Component, OnInit } from '@angular/core';
import { User } from "./model/user.model";
import { AppService } from "./app.service";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: `app/app.component.html`,
  providers: [AppService]
})

export class AppComponent  {
  
  
}
