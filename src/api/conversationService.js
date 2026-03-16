class ConversationService {
  constructor() {
    this.baseUrl = "/api/conversations";
  }

  async getConversations(token) {
    const response = await fetch(this.baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }

  async getConversationById(token, id) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }

  async sendMessage(token, conversationId, content) {
    const response = await fetch(`${this.baseUrl}/${conversationId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
}

export default ConversationService;
