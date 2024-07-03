import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from './github.service';

describe('GithubService', () => {
    let service: GithubService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GithubService]
        });
        service = TestBed.inject(GithubService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return an Observable<User[]> when searchUsers is called', () => {
        const mockResponse = { items: [{ login: 'testuser' }] };

        service.searchUsers('testuser').subscribe(users => {
            expect(users).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`https://api.github.com/search/users?q=testuser`);
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('should return an Observable<User> when getUserProfile is called', () => {
        const mockUser = { login: 'testuser', name: 'Test User' };

        service.getUserProfile('testuser').subscribe(user => {
            expect(user).toEqual(mockUser);
        });

        const req = httpMock.expectOne(`https://api.github.com/users/testuser`);
        expect(req.request.method).toBe('GET');
        req.flush(mockUser);
    });
});