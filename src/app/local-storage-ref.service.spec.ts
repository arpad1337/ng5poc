import { TestBed, inject } from '@angular/core/testing';

import { LocalStorageRefService } from './local-storage-ref.service';

describe('LocalStorageRefService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageRefService]
    });
  });

  it('should be created', inject([LocalStorageRefService], (service: LocalStorageRefService) => {
    expect(service).toBeTruthy();
  }));
});
