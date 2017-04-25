// import { ProfileEffects } from './profile.effects';
// /* tslint:disable:no-unused-variable */
// import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';

// describe('My Effect', () => {
//   beforeEach(() => TestBed.configureTestingModule({
//     imports: [
//       EffectsTestingModule
//     ],
//     providers: [
//       ProfileEffects,
//       EffectsRunner
//     ]
//   }));
// });

// let runner: EffectsRunner;
// let profileEffects: ProfileEffects

// beforeEach(inject([
//     EffectsRunner, profileEffects
//   ],
//   (_runner, _profileEffects) => {
//     runner = _runner;
//     profileEffects = _profileEffects;
//   }
// ));

// it('should return a LOGIN_SUCCESS action after logging in', () => {
//   expect(true).toBe(true)
//   // runner.queue({ type: 'LOGIN' });
//   // profileEffects.userLogin$.subscribe(result => {
//   //   // expect(result).toEqual({ type: 'LOGIN_SUCCESS' });
//   //   expect(true).toBe(true)
//   // });
// });