class AuthService {
  constructor() {
    this.baseUrl = "/api/auth";
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
      throw Error(data);
    }

    return data.token;
  }
}

export default AuthService;
