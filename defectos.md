# Registro de Defectos

## BUG-001
- **Caso:** Votante con edad 121 años
- **Esperado:** INVALID_AGE
- **Obtenido:** VALID
- **Causa probable:** La implementación inicial no tenía límite superior de edad. Solo se validaba que la edad fuera mayor a cero, ignorando que una edad superior a 120 es biológicamente imposible.
- **Estado:** Cerrado: se agregó la constante MAX_AGE = 120 en voterConstants.ts y la validación correspondiente en voterRules.ts

## BUG-002
- **Caso:** Votante con id = 0
- **Esperado:** INVALID
- **Obtenido:** VALID
- **Causa probable:** La implementación inicial solo validaba si el votante era nulo, pero no contemplaba que un id igual a cero o negativo tampoco es un identificador válido en ningún sistema real.
- **Estado:** Cerrado: se agregó la condición voter.id <= 0 en la primera regla de voterRules.ts

## BUG-003
- **Caso:** El parámetro del método registerVoter recibía null pero TypeScript no lo permitía sin un cast forzado
- **Esperado:** El método debería aceptar null de forma explícita y segura
- **Obtenido:** Para pasar null en los tests se usaba null as unknown as Person, lo cual es una mala práctica porque salta el compilador y puede ocultar errores reales
- **Causa probable:** La firma inicial del método era registerVoter(voter: Person) sin contemplar el caso nulo como entrada válida del sistema
- **Estado:** Cerrado: se cambió la firma a registerVoter(voter: Person | null) para que TypeScript valide correctamente desde la definición del método
