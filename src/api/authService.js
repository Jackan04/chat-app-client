class AuthService {
  constructor() {
    this.baseUrl = "http://localhost:3000/api/auth";
  }

  async register(username, password, passwordConfirmation) {
    const response = await fetch(`${this.baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, passwordConfirmation }),
    });

    return response.json();
  }
}

export default AuthService;
