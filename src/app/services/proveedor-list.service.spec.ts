import { TestBed } from '@angular/core/testing';

import { ProveedorListService } from './proveedor-list.service';

describe('ProveedorListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProveedorListService = TestBed.get(ProveedorListService);
    expect(service).toBeTruthy();
  });
});
