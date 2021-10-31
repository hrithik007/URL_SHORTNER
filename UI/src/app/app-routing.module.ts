import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PnfComponent } from './pnf/pnf.component';
import { ResultComponent } from './result/result.component';
import { Results2Component } from './results2/results2.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "result", component: ResultComponent },
  { path: "result2", component: Results2Component },
  { path: "**", component: PnfComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
