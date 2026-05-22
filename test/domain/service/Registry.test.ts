import { Registry } from '../../../src/domain/service/Registry';
import { Person } from '../../../src/domain/model/Person';
import { Gender } from '../../../src/domain/model/Gender';
import { RegisterResult } from '../../../src/domain/model/RegisterResult';

describe('Registry - Validación de Votantes', () => {
  let registry: Registry;

  beforeEach(() => {
    registry = new Registry();
  });

  test('given null voter when register then returns invalid', () => {
    const result = registry.registerVoter(null);
    expect(result).toBe(RegisterResult.INVALID);
  });

  test('given voter with id zero when register then returns invalid', () => {
    const voter = new Person(0, 'Pedro', 25, Gender.MALE, true);
    const result = registry.registerVoter(voter);
    expect(result).toBe(RegisterResult.INVALID);
  });

  test('given voter with negative id when register then returns invalid', () => {
    const voter = new Person(-5, 'Lucas', 30, Gender.MALE, true);
    const result = registry.registerVoter(voter);
    expect(result).toBe(RegisterResult.INVALID);
  });

  test('given dead voter when register then returns dead', () => {
    const voter = new Person(1, 'Juan', 30, Gender.MALE, false);
    const result = registry.registerVoter(voter);
    expect(result).toBe(RegisterResult.DEAD);
  });

  test('given voter aged 17 when register then returns underage', () => {
    const voter = new Person(2, 'Maria', 17, Gender.FEMALE, true);
    const result = registry.registerVoter(voter);
    expect(result).toBe(RegisterResult.UNDERAGE);
  });

  test('given voter aged 18 when register then returns valid', () => {
    const voter = new Person(3, 'Ana', 18, Gender.FEMALE, true);
    const result = registry.registerVoter(voter);
    expect(result).toBe(RegisterResult.VALID);
  });

  test('given voter aged 120 when register then returns valid', () => {
    const voter = new Person(4, 'Anciano', 120, Gender.MALE, true);
    const result = registry.registerVoter(voter);
    expect(result).toBe(RegisterResult.VALID);
  });

  test('given voter aged 121 when register then returns invalid age', () => {
    const voter = new Person(5, 'Inmortal', 121, Gender.MALE, true);
    const result = registry.registerVoter(voter);
    expect(result).toBe(RegisterResult.INVALID_AGE);
  });

  test('given already registered voter when register again then returns duplicated', () => {
    const first = new Person(6, 'Carlos', 25, Gender.MALE, true);
    const duplicate = new Person(6, 'Carlos Clon', 25, Gender.MALE, true);
    registry.registerVoter(first);
    const result = registry.registerVoter(duplicate);
    expect(result).toBe(RegisterResult.DUPLICATED);
  });
});