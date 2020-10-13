import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './auth/callback/callback.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthInterceptor } from '@core/interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
import { SoundboardComponent } from './soundboard/soundboard.component';
import { MusicComponent } from './music/music.component';
import { GreetingsComponent } from './greetings/greetings.component';
import { UnderConstructionComponent } from './core/under-construction/under-construction.component';
import { KonamiModule } from 'ngx-konami';
import { ChannelSelectorComponent } from './soundboard/channel-selector/channel-selector.component';
import { VoiceChannelComponent } from './soundboard/voice-channel/voice-channel.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CallbackComponent,
    SoundboardComponent,
    MusicComponent,
    GreetingsComponent,
    UnderConstructionComponent,
    ChannelSelectorComponent,
    VoiceChannelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    KonamiModule
  ], // Shared (multi-instance) object
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
