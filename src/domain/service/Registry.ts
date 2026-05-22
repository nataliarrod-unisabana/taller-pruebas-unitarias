import { Person } from '../model/Person';
import { RegisterResult } from '../model/RegisterResult';
import { rules } from './voterRules';

export class Registry {
  private registeredIds: Set<number> = new Set();

  public registerVoter(voter: Person | null): RegisterResult {
    for (const rule of rules) {
      if (rule.check(voter as Person, this.registeredIds)) {
        return rule.result;
      }
    }

    this.registeredIds.add((voter as Person).id);
    return RegisterResult.VALID;
  }
}