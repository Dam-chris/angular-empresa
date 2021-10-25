import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { ClienteService } from './services/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './clientes/form/form.component';
import localeES from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';

/* para impotar el idoma y se pueda utiliar en cuestion de formatos de fechas, etc en toda la app*/
registerLocaleData(localeES, 'es');

const routes: Routes = [
  {path:'', redirectTo: '/clientes', pathMatch:'full'},
  {path:'directivas', component: DirectivaComponent},
  {path:'clientes', component: ClientesComponent},
  {path:'clientes/form', component:FormComponent},
  {path:'clientes/form/:id', component:FormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    DirectivaComponent,
    HeaderComponent,
    FooterComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  /*{provide: LOCALE_ID, useValue:'es'} para poder cambiar formatos de fecha desde la vista y no desde el service */
  providers: [{provide: LOCALE_ID, useValue:'es'},
    ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
