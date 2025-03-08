import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-productid',
  imports: [],
  templateUrl: './page-productid.component.html',
  styleUrl: './page-productid.component.scss'
})
export class PageProductidComponent {

  route = inject(ActivatedRoute);

  id = this.route.snapshot.paramMap.get('id')

}
