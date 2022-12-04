import { authSlice } from "../../../src/store/auth/authSlice";
import { initialState } from "../../fixtures/authFixtures";

describe('Pruebas en authSlice', () => { 

  test('Debe de regresar el estado inicial y llamarse auth', () => { 

    const state = authSlice.reducer( initialState, {} );
    
    expect( state ).toEqual( initialState )
    expect( authSlice.name ).toBe('auth');

  });

})