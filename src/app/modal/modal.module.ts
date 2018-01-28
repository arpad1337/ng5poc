import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalOutletComponent } from './modal-outlet/modal-outlet.component';
import { ModalService, ModalComponent, ModalComponentDescriptor } from './modal.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ModalOutletComponent],
  exports: [
    ModalOutletComponent
  ]
})
export class ModalModule implements ModuleWithProviders {
  get ngModule() {
    return ModalModule;
  }
  static forRoot( config: Array<ModalComponentDescriptor> ): ModuleWithProviders {
    return {
      ngModule: ModalModule,
      providers: [
        {
          provide: ModalService,
          useFactory() {
            const configMap = new Map();
            config.forEach((modalComponent) => {
              configMap.set(modalComponent.key, modalComponent.component);
            })
            return ModalService.createServiceWithConfig( configMap );
          }
        }
      ]
    }
  }
}
