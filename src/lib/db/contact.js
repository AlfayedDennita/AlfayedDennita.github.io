import {
  PUBLIC_WEB3FORMS_BASE_URL,
  PUBLIC_WEB3FORMS_ACCESS_KEY,
} from '$env/static/public';

export async function sendContact({ name = 'Anonymous', email, message }) {
  const body = {
    access_key: PUBLIC_WEB3FORMS_ACCESS_KEY,
    name: name || 'Anonymous',
    email,
    message,
  };
  const res = await fetch(`${PUBLIC_WEB3FORMS_BASE_URL}/submit`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const data = await res.json();

  return data;
}
