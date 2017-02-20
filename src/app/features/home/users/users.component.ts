import { IUser } from '../../../models';
import { StoreDrivenComponent } from '../../../shared/store-driven.component';
import * as RootStore from '../../../store';
import { UserActions } from '../../../store/actions';
import { UserState } from '../../../store/reducers/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends StoreDrivenComponent implements OnInit {

  users: FirebaseListObservable<IUser>;

  constructor(
    private store: Store<RootStore.AppState>,
    private userActions: UserActions,
    private router: Router) {
    super(router);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subscribeToStore();
    this.store.dispatch(this.userActions.getUsers());

  }

    private subscribeToStore() {
    this.storeSubscriptions.push(this.store.select(store => store.userState).subscribe(state => this.handleUserState(state)));
  }

  private handleUserState(state: UserState) {
    this.users = state.users;
  }

}
