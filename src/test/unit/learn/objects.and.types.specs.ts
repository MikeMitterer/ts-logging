// import 'jest-extended';
import { userName as uN } from '../../../main';

describe('Objects and types', () => {
    it('dynamic object', () => {
        expect(uN.name).toBe('Mike');
    });

    // it('type-save-object', () => {
    //     expect(oat.userData.name).toBe('Gerda');
    // });
    //
    // it('should return age via callback', () => {
    //     const person = oat.complexObject;
    //
    //     expect(person.callback(99)).toBe('Age: 99');
    // });
    //
    // it('Describe your test', () => {
    //     expect(oat.anotherComplexObject.data).toEqual([4, 5, 6]);
    // });
    //
    // it('should mark the type of function param as N: or S:', () => {
    //     expect(oat.showMyRealAge(99)).toBe('N: 99');
    //     expect(oat.showMyRealAge('99')).toBe('S: 99');
    //
    //     expect(oat.myRealAge).toBe(99);
    // });
    //
    // it('should throw and error', () => {
    //     expect(() => oat.neverEnds()).toThrowError();
    // });
    //
    // it('should not accept null', () => {
    //     expect(oat.tryToReturnNull('Mike')).not.toBeNull();
    // });
});
