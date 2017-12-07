import { TestBed, inject } from '@angular/core/testing';

import { BroadcasterService } from './broadcaster.service';

describe('BroadcasterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BroadcasterService]
    });
  });

  it('should be created', inject([BroadcasterService], (service: BroadcasterService) => {
    expect(service).toBeTruthy();
  }));
});
