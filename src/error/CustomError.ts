export class CustomError extends Error {
  constructor(statusCode: number, message: string) {
    super(message);
  }
}

export class InvalidInfos extends CustomError {
  constructor() {
    super(400, "Um ou mais dados inválidos!");
  }
}

export class InvalidEmail extends CustomError {
  constructor() {
    super(400, "E-mail inválido!");
  }
}

export class InvalidPassword extends CustomError {
  constructor() {
    super(400, "Senha inválido!");
  }
}

export class InvalidUser extends CustomError {
  constructor() {
    super(400, "E-mail ou senha incorretos!");
  }
}

export class EmailAlreadyExists extends CustomError {
  constructor() {
    super(400, "O e-mail digitado já está vinculado a uma conta!");
  }
}

export class InvalidAuthData extends CustomError {
  constructor() {
    super(400, "Token de autenticação invalido!");
  }
}

export class InvalidStatus extends CustomError {
  constructor() {
    super(400, "Status inserido diferente dos aceitos!");
  }
}


