import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RigHomeComponent } from './rig-home/rig-home.component';
import { RigFilesComponent } from './rig-files/rig-files.component';

const routes: Routes = [
  {
    path: '',
    component: RigFilesComponent
    //loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'content/:type',
    component: RigHomeComponent
  },
  {
    path: 'files/:type',
    component: RigFilesComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
