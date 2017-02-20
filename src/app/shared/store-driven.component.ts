import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

export class StoreDrivenComponent implements OnInit, OnDestroy {

  storeSubscriptions: Array<Subscription> = [];
  routerSubscription: Subscription;

  constructor(private superRouter: Router) { }

  ngOnInit() {
    this.changeStoreSubscrptionIfNavigating();
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  private changeStoreSubscrptionIfNavigating() {
    this.routerSubscription = this.superRouter.events.subscribe(event => {
      if (event instanceof NavigationStart) this.unsubscribeFromStore();
    });
  }

  private unsubscribeFromStore() {
    this.storeSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

}