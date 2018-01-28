import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.service';

@Component({
  selector: 'app-test-modal',
  templateUrl: './test-modal.component.html',
  styleUrls: ['./test-modal.component.scss']
})
export class TestModalComponent extends ModalComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
