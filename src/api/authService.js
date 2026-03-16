class AuthService {
  constructor() {
    this.baseUrl = "/api/auth";
  }

  async getCurrentUser(token) {
    const response = await fetch(`${this.baseUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw Error(data.message);
    }

    return data;
  }

  async register(username, password, passwordConfirmation) {
    const response = await fetch(`${this.baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, passwordConfirmation }),
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message);
      error.validationErrors = data.validationErrors;
      throw error;
    }

    return data.token;
  }

  async login(username, password) {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message);
      error.validationErrors = data.validationErrors;
      throw error;
    }

    return data.token;
  }
}

export default AuthService;
