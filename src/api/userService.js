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

  async updateUser(token, id, user) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        displayName: user.displayName,
        bio: user.bio,
        online: user.online,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message);
      error.validationErrors = data.validationErrors;
      throw error;
    }

    return data;
  }
}

export default UserService;
