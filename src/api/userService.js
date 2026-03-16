class UserService {
  constructor() {
    this.baseUrl = "/api/users";
  }

  async getUserById(token, id) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
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
