/**模块 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathLibrary } from 'src/core/libs/path-library';

/**组件引入 */
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { FrameComponent } from './frame/frame.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  	// 第一个路由就是运行项目默认跳转的页面,若app-router里没有默认第一个,此处就是第一个
	{ path: PathLibrary.login, component: LoginComponent }, 
	{ path: PathLibrary.logout, component: LogoutComponent },
	{
		path: PathLibrary.frame,
		component: FrameComponent,
		children: [
			{ path: '', redirectTo: PathLibrary.moduleNameOrder, pathMatch: 'full' },

			{
				path: PathLibrary.moduleNameOrder,
				loadChildren: () =>
				import('../order/order.module').then(m => m.OrderModule)
			},
			{
				path: PathLibrary.moduleNameMap,
				loadChildren: () =>
				import('../plan/plan.module').then(m => m.PlanModule)
			},

			/* 通配符组件，放置在后面 */
			{ path: '**', component: PageNotFoundComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeRoutingModule { }
