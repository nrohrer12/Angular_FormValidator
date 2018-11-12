import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormPoster } from './services/form-poster.service';

import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [ FormPoster ],
  bootstrap: [AppComponent]
})
export class AppModule { }
