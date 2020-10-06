import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { NavContentComponent } from './nav-content/nav-content.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [MainLayoutComponent, FooterComponent, HeaderComponent, NavContentComponent, NavHeaderComponent],
  imports: [SharedModule, CommonModule, RouterModule.forChild([])],
})
export class LayoutModule {}
