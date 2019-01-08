import { TestBed } from '@angular/core/testing';
import { UserService } from "./user.service";
describe('UserService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(UserService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=userservice.spec.js.map