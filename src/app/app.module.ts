import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CoverPageComponent } from "./cover-page/cover-page.component";
import { OverviewPageComponent } from "./overview-page/overview-page.component";
import { DetailviewPageComponent } from "./detailview-page/detailview-page.component";
import { GeneratePageComponent } from "./generate-page/generate-page.component";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [
    AppComponent,
    CoverPageComponent,
    OverviewPageComponent,
    DetailviewPageComponent,
    GeneratePageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  exports: [AppRoutingModule, CoverPageComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
