import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @Input() profile;
  username;

  constructor() { }

  ngOnInit() {
    const { payload } = this.profile
    if (payload.user) {
      this.username = payload.user.username
      console.log('USERNAME ', this.username)
    }

  }

}
