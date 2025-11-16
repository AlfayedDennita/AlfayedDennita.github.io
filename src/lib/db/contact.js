import {
  PUBLIC_WEB3FORMS_BASE_URL,
  PUBLIC_WEB3FORMS_ACCESS_KEY,
} from '$env/static/public';

export async function sendContact({
  captchaToken,
  name = 'Anonymous',
  email,
  message,
}) {
  const body = {
    access_key: PUBLIC_WEB3FORMS_ACCESS_KEY,
    'h-captcha-response': captchaToken,
    name: name || 'Anonymous',
    email,
    message,
  };
  const res = await fetch(`${PUBLIC_WEB3FORMS_BASE_URL}/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();

  return data;
}
