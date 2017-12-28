import { TestBed, inject } from '@angular/core/testing';

import { DynamicChartFactoryService } from './dynamic-chart-factory.service';

describe('DynamicChartFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicChartFactoryService]
    });
  });

  it('should be created', inject([DynamicChartFactoryService], (service: DynamicChartFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
