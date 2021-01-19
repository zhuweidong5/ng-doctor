/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WebImService } from './web-im.service';

describe('Service: WebIm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebImService]
    });
  });

  it('should ...', inject([WebImService], (service: WebImService) => {
    expect(service).toBeTruthy();
  }));
});
