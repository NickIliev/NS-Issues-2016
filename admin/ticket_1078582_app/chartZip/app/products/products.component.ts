import { Component, OnInit } from '@angular/core';

import { Products } from './shared/products.model';
import { ProductsService } from './shared/products.service';

@Component({
	selector: 'products',
	templateUrl: 'products.component.html',
	providers: [ProductsService]
})

export class ProductsComponent implements OnInit {
	products: Products[] = [];

	constructor(private productsService: ProductsService) { }

	ngOnInit() {
		this.productsService.getList().subscribe((res) => {
			this.products = res;
		});
	}
}