import { TestBed, inject } from '@angular/core/testing';

import { HighchartsRefService } from './highcharts-ref.service';

describe('HighchartsRefService', () => {
  let lib = {
    chart: () => {}
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: HighchartsRefService,
        useFactory() {
          return HighchartsRefService.createRef(lib);
        }
      }]
    });
  });

  it('should be created', inject([HighchartsRefService], (service: HighchartsRefService) => {
    expect(service).toBeTruthy();
  }));

  it('should have lib as ref', inject([HighchartsRefService], (service) => {
    expect(service.lib).toBe(lib);
  }));
});
