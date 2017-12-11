import { TestBed, inject } from '@angular/core/testing';

import { HighchartsRefService } from './highcharts-ref.service';

describe('HighchartsRefService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighchartsRefService]
    });
  });

  it('should be created', inject([HighchartsRefService], (service: HighchartsRefService) => {
    expect(service).toBeTruthy();
  }));
});
