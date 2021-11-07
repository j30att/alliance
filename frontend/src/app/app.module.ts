import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { CookieService } from "ngx-cookie-service";

import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbButtonModule,
  NbButtonGroupModule,
  NbInputModule,
  NbDatepickerModule,
  NbCheckboxModule,
  NbCardModule,
  NbSelectModule,
  NbAccordionModule,
  NbTooltipModule,
  NbToastrModule,
  NbSpinnerModule,
  NbDialogModule
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { ModalModule } from "ngx-bootstrap/modal";
import { DateFnsModule } from "ngx-date-fns";

import { AppRoutingModule } from "./app-routing.module";

import { MainComponent } from "./components/main/main.component";
import { HeaderComponent } from "./components/layout/header/header.component";
import { FooterComponent } from "./components/layout/footer/footer.component";
import { StubComponent } from "./components/stub/stub.component";
import { LayoutComponent } from "./components/layout/layout/layout.component";
import { SigninComponent } from "./components/authorization/signin/signin.component";
import { HomeComponent } from "./components/home/home.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { ButtsComponent } from "./components/butts/butts.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { TachographComponent } from "./components/tachograph/tachograph/tachograph.component";
import { GlonassComponent } from "./components/glonass/glonass/glonass.component";
import { TachographHistoryComponent } from "./components/tachograph/tachograph-history/tachograph-history.component";
import { TachographMountComponent } from "./components/tachograph/tachograph-mount/tachograph-mount.component";
import { TachographServiceComponent } from "./components/tachograph/tachograph-service/tachograph-service.component";
import { TachographCardsComponent } from "./components/tachograph/tachograph-cards/tachograph-cards/tachograph-cards.component";
import { TachographCalibrationComponent } from "./components/tachograph/tachograph-calibration/tachograph-calibration.component";
import { TachographSkziChangeComponent } from "./components/tachograph/tachograph-skzi-change/tachograph-skzi-change.component";
import { TachographVerificationComponent } from "./components/tachograph/tachograph-verification/tachograph-verification.component";
import { TachographSkziCardsComponent } from "./components/tachograph/tachograph-cards/tachograph-skzi-cards/tachograph-skzi-cards.component";
import { TachographEstrCardsComponent } from "./components/tachograph/tachograph-cards/tachograph-estr-cards/tachograph-estr-cards.component";
import { TachographEstrDriverCardComponent } from "./components/tachograph/tachograph-cards/tachograph-estr-driver-card/tachograph-estr-driver-card.component";
import { TachographEstrCompanyCardComponent } from "./components/tachograph/tachograph-cards/tachograph-estr-company-card/tachograph-estr-company-card.component";
import { TachographSkziDriverCardComponent } from "./components/tachograph/tachograph-cards/tachograph-skzi-driver-card/tachograph-skzi-driver-card.component";
import { TachographSkziCompanyCardComponent } from "./components/tachograph/tachograph-cards/tachograph-skzi-company-card/tachograph-skzi-company-card.component";
import { GlonassHistoryComponent } from "./components/glonass/glonass-history/glonass-history.component";
import { GlonassMountComponent } from "./components/glonass/glonass-mount/glonass-mount.component";
import { GlonassServiceComponent } from "./components/glonass/glonass-service/glonass-service.component";
// import { ApiService } from './services/api.service';
import { NbDateFnsDateModule } from "@nebular/date-fns";
import { TitleDirective } from "./common/directives/title.directive";
import { RequestButtonsGroupComponent } from './components/shared/request-buttons-group/request-buttons-group.component';
import { CloseRequestDialogComponent } from './components/shared/close-request-dialog/close-request-dialog.component';

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    FooterComponent,
    StubComponent,
    LayoutComponent,
    SigninComponent,
    HomeComponent,
    NotFoundComponent,
    ButtsComponent,
    NotificationsComponent,
    ProfileComponent,
    TachographComponent,
    GlonassComponent,
    TachographHistoryComponent,
    TachographMountComponent,
    TachographServiceComponent,
    TachographCardsComponent,
    TachographCalibrationComponent,
    TachographSkziChangeComponent,
    TachographVerificationComponent,
    TachographSkziCardsComponent,
    TachographEstrCardsComponent,
    TachographEstrDriverCardComponent,
    TachographEstrCompanyCardComponent,
    TachographSkziDriverCardComponent,
    TachographSkziCompanyCardComponent,
    GlonassHistoryComponent,
    GlonassMountComponent,
    GlonassServiceComponent,
    TitleDirective,
    RequestButtonsGroupComponent,
    CloseRequestDialogComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DateFnsModule.forRoot(),
    //Nebular
    BrowserAnimationsModule,
    NbThemeModule.forRoot(),
    // NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbButtonGroupModule,
    NbEvaIconsModule,
    NbInputModule,
    NbDatepickerModule.forRoot(),
    NbCheckboxModule,
    NbCardModule,
    NbDateFnsDateModule,
    NbSelectModule,
    NbToastrModule.forRoot(),
    NbSpinnerModule,
    NbDialogModule.forRoot(),
    //bootstrap
    CommonModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NbAccordionModule,
    NbTooltipModule,
  ],
  providers: [],
  bootstrap: [MainComponent],
})
export class AppModule {}
