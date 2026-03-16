class UserService {
  constructor() {
    this.baseUrl = "/api/users";
  }

  async getUsersByUsername(token, username) {
    const response = await fetch(`${this.baseUrl}?username=${username}`, {
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
}

export default UserService;
