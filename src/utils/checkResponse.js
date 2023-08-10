export async function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(await res.json());
}