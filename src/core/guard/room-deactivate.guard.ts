import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderDetailComponent } from 'src/app/pages/order/order-detail/order-detail.component';

/**
 * 多人会诊路由拦截
 */
@Injectable({
  providedIn: 'root'
})
export class RemoteConsultinfRoomDeactivateGuard implements CanDeactivate<OrderDetailComponent> {

  canDeactivate(
     component: OrderDetailComponent,
     currentRoute: ActivatedRouteSnapshot,
     currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return new Observable(
      Subscriber => {
        component.CanDeactivate().subscribe( (type: any) => {
          Subscriber.next(type);
        }
      )
      }
    )


  }
  
}
