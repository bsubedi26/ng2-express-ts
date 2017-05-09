import { IAppState } from '../../store';
import { Store } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.css']
})
export class TopNavigationComponent implements OnInit {

  
  @ViewChild('topnav') topnav: ElementRef;
  profile$: any;
  username: any;

  constructor(public store: Store<IAppState>) {
  
   
  }

  ngOnInit() {
    this.profile$ = this.store.select("profile")
    this.profile$.subscribe(response => {
      // console.log('RESPONSE ', response)
      const { payload } = response
      // payload.user ? this.username = payload.user.username : undefined
      if (payload.user) {
        this.username = payload.user.username
        console.log("username ", this.username)
      }
    })
   
  }

  toggle() {
    this.topnav.nativeElement.classList.toggle(['responsive']);
  }


}
