import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import * as GithubActions from '../../store/actions/github.actions';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;
    let store: MockStore;
    const initialState = { github: { users: [], loading: false, error: null } };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SearchComponent],
            providers: [provideMockStore({ initialState })]
        }).compileComponents();

        store = TestBed.inject(MockStore);
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should dispatch searchUsers action when search is called', () => {
        const dispatchSpy = spyOn(store, 'dispatch');
        const searchInput = fixture.debugElement.query(By.css('input')).nativeElement;
        searchInput.value = 'testuser';
        searchInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        const searchButton = fixture.debugElement.query(By.css('button')).nativeElement;
        searchButton.click();

        expect(dispatchSpy).toHaveBeenCalledWith(GithubActions.searchUsers({ query: 'testuser' }));
        expect(dispatchSpy).toHaveBeenCalledWith(GithubActions.addToHistory({ query: 'testuser', successful: true }));
    });
});