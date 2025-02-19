import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { HttpClientTestingModule, HttpTestingController, } from '@angular/common/http/testing';
import { provideMockStore, MockStore} from '@ngrx/store/testing';
import { environment } from '../../../environments/environment';
import { User } from '../../modules/dashboard/pages/users/models';

describe('AuthService', () => {
  let authService: AuthService;
  let router: Router;
  let httpTestingController: HttpTestingController
  const initialState = {
    auth: {
      authUser: null,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [AuthService, MockProvider(Router), provideMockStore({ initialState, })],
    }).compileComponents();
    localStorage.clear();
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('AuthService debe instanciarse', () => {
    expect(authService).toBeTruthy();
  });

  it('Un login satisfactorio, debe establecer el usuario autenticado, debe establecer el access token en localStorage, debe redirigir al home', () => {
    const spyOnNavigate = spyOn(router, 'navigate');
    
    const fakeLoginData = {
      email: 'admin@email.com',
      password: '123456',
    };
    const mockResponse: User[] = [
      {
        id: 'abc123',
        accessToken: 'akdsdnprueba',
        email: 'abc123@mail.com',
        name: 'fake_user',
        password: '123456',
        role: 'ADMIN'
      },
    ];

    authService.login(fakeLoginData, () => {
      expect(localStorage.getItem('access_token')).toBeTruthy();
      expect(spyOnNavigate).toHaveBeenCalledWith(['dashboard', 'home']);
    });

    httpTestingController.expectOne({
      method: 'GET',
      url: `${environment.baseApiUrl}/users?email=${fakeLoginData.email}&password=${fakeLoginData.password}`
    }).flush(mockResponse);
    
  });
    it('Un login incorrecto debe mostrar un alerta con el mensaje "Email o password invalidos"', () => {
      const spyOnAlert = spyOn(window, 'alert');

      const fakeLoginData = {
        email: 'admin@email.com',
        password: '123456',
      };

      const mockResponse: User[] = [];
      authService.login(fakeLoginData, () => {
        expect(spyOnAlert).toHaveBeenCalledWith('Email o password invalidos');
      });
      httpTestingController
      .expectOne({
        method: 'GET',
        url: `${environment.baseApiUrl}/users?email=${fakeLoginData.email}&password=${fakeLoginData.password}`
      }).flush(mockResponse);
    });
  
});