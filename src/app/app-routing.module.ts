import { CoverPageComponent } from "./cover-page/cover-page.component";
import { DetailviewPageComponent } from "./detailview-page/detailview-page.component";
import { OverviewPageComponent } from "./overview-page/overview-page.component";
import { GeneratePageComponent } from "./generate-page/generate-page.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";

const routes: Routes = [
  { path: "CoverPage", component: CoverPageComponent },
  { path: "DetailViewPage/:id", component: DetailviewPageComponent },
  { path: "OverviewPage", component: OverviewPageComponent },
  { path: "GeneratePage", component: GeneratePageComponent },
  { path: "**", component: CoverPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
