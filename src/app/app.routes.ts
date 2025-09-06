import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Search } from './search/search';
import { CarouselComponent } from './carousel/carousel';
import { Carthome } from './carthome/carthome';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'search', component: Search },
    { path: 'Carousel', component: CarouselComponent },
    { path: 'carthome', component: Carthome }

    
    

];
