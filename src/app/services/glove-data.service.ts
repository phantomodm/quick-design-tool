import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class GloveDataService {

  constructor(private af: AngularFireDatabase) { }

  getQuickOrderData(): Observable<any>{
    return this.af.object('nystix-quick-order').snapshotChanges();
  }

  getQuickOrderColor(): Observable<any>{
    return this.af.list('nystix-colors').valueChanges();
  }

  getProfileData(): Observable<any> {
    const data$ = this.getQuickOrderData();
    
    return data$.pipe(
      map(changes => Object.assign(
        {...changes.payload.val()}
      ))
    );
  }
}
