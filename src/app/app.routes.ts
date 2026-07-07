import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { SearchDocument} from './pages/search-document/search-document';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'search', component: SearchDocument },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
