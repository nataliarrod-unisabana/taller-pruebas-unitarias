import { Person } from '../model/Person';
import { RegisterResult } from '../model/RegisterResult';
import { MIN_AGE, MAX_AGE } from './voterConstants';

export type ValidationRule = {
  check: (voter: Person, registeredIds: Set<number>) => boolean;
  result: RegisterResult;
};

export const rules: ValidationRule[] = [
  {
    check: (voter) => voter === null || voter.id <= 0,
    result: RegisterResult.INVALID
  },
  {
    check: (voter) => !voter.isAlive,
    result: RegisterResult.DEAD
  },
  {
    check: (voter) => voter.age < 0 || voter.age > MAX_AGE,
    result: RegisterResult.INVALID_AGE
  },
  {
    check: (voter) => voter.age < MIN_AGE,
    result: RegisterResult.UNDERAGE
  },
  {
    check: (voter, registeredIds) => registeredIds.has(voter.id),
    result: RegisterResult.DUPLICATED
  }
];