import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FousComponent } from './fous/fous.component';
import { FollowComponent } from './follow/follow.component';



@NgModule({
  declarations: [FousComponent, FollowComponent],
  imports: [
    CommonModule
  ]
})
export class ChronicModule { }
