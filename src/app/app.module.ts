import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpService } from './services/http.service';
import { LocationService } from './services/location.service';
import { CategoryService } from './services/category.service';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './component/home/home.component';
import { CatalogComponent } from './component/catalog/catalog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CatalogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
