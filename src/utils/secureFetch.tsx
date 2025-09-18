export async function secureFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
    const token = localStorage.getItem("token");

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        ...(init?.headers || {})
    };

    const res = await fetch(input, { ...init, headers });

    if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        throw new Error("Sesión expirada o no autorizada");
    }

    return res;
}