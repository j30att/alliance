import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {
    // console.log('this.router.getCurrentNavigation()', this.router.getCurrentNavigation())
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
