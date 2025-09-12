import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Search } from './search/search';
import { CarouselComponent } from './carousel/carousel';
import { Carthome } from './carthome/carthome';
import { ProductDetail } from './product-detail/product-detail';
import { Addedcart } from './addedcart/addedcart';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'search', component: Search },
    { path: 'Carousel', component: CarouselComponent },
    { path: 'carthome', component: Carthome },
    { path: 'product/:id', component: ProductDetail},  // ✅ dynamic route with product id
    { path: 'addedcart', component: Addedcart },
    
    

];
