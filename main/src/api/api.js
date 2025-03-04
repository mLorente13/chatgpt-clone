const API_URL = "https://open-webui.artemrudenko.com/api";
const API_KEY = import.meta.env.VITE_API_KEY;
export async function getModels() {
    const response = await fetch(`${API_URL}/models`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
    });
    const data = await response.json();
    return data;
}

export async function createChat() {
    const response = await fetch(`${API_URL}/v1/chats/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({ chat: {} }),
    });
    const data = await response.json();
    return data;
}

export async function sendMessageToApi(messages, model, chatId) {
    const response = await fetch(`${API_URL}/chat/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({ messages, model, id: chatId }),
    });
    const data = await response.json();
    return data;
}

export async function getChat(chatId) {
    const response = await fetch(`${API_URL}/chat/${chatId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
    });
    const data = await response.json();
    return data;
}

export async function getChatMessages(chatId) {
    const response = await fetch(`${API_URL}/v1/chats/${chatId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
    });
    const data = await response.json();
    return data;
}

export async function getChats() {
    const response = await fetch(`${API_URL}/v1/chats/list`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
    });
    const data = await response.json();
    return data;
}

export async function deleteChat(chatId) {
    const response = await fetch(`${API_URL}/v1/chats/${chatId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
    });
    const data = await response.json();
    return data;
}

export async function uploadFile(formData) {
    const response = await fetch(`${API_URL}/v1/files/`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
        body: formData,
    });

    return response.json();
}

export async function updateChat(chatId, messages, modelId) {
    const body = {
        history: {
            messages,
        },
        model: modelId,
    };
    const response = await fetch(`${API_URL}/v1/chats/${chatId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({ chat: body }),
    });
    const data = await response.json();
    return data;
}
