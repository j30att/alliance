import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stub',
  templateUrl: './stub.component.html',
  styleUrls: ['./stub.component.scss']
})
export class StubComponent implements OnInit {
  id: number
  private routeSubscription: Subscription

  // constructor() { }
  constructor(private route: ActivatedRoute) {
    this.routeSubscription = route.params.subscribe(
      (params) => {
        if (params['id'])
          this.id = params['id']
        else
          this.id = 0
      }
    )
  }

  ngOnInit(): void {
    // console.log('MainComponent => ngOnInit', this.id)
  }
}
