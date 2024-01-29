import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { CongratulationsPageComponent } from './components/congratulations/congratulations-page.component';

const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./start/start.module').then(m => m.StartModule), //Lazy load account module
                data: { preload: true }
            },

            // in case you need to manually redirect to the not found page
            { path: 'not-found', component: NotFoundPageComponent },
            // in case you need to manually redirect to the not found page
            { path: 'congratulations', component: CongratulationsPageComponent },

            { path: '**', component: NotFoundPageComponent },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
