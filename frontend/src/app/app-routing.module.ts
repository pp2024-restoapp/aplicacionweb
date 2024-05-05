import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { CartaComponent } from './pages/carta/carta.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { PagoComponent } from './pages/pago/pago.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { authGuard } from './guards/auth.guard';
import { ShowsComponent } from './pages/shows/shows.component';

const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path: 'home', component:HomeComponent},
  {path: 'nosotros', component:NosotrosComponent},
  {path: 'contactanos', component:ContactanosComponent},
  {path: 'carta', component:CartaComponent},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'productos', component:ProductosComponent, canActivate:[authGuard]},
  {path: 'pago', component:PagoComponent},
  {path: 'pedidos', component:PedidosComponent, canActivate:[authGuard]},
  { path: 'shows', component: ShowsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
