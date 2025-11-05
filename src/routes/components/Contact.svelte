<script>
  import {
    PUBLIC_MODE,
    PUBLIC_WEB3FORMS_ACCESS_KEY,
    PUBLIC_HCAPTCHA_SITEKEY,
  } from '$env/static/public';
  import { slide } from 'svelte/transition';
  import Joi from 'joi';
  import enhance from 'svelte-captcha-enhance';

  import { offsetTop } from '$lib/actions/offsetTop';
  import Button from '$lib/components/ui/Button.svelte';
  import TextField from '$lib/components/ui/TextField.svelte';

  let { contactOffsetHeight = $bindable() } = $props();

  let elementOffsetTop = $state({
    value: undefined,
    update: () => undefined,
  });

  export function getOffsetTop() {
    return elementOffsetTop;
  }

  const socials = [
    {
      name: 'GitHub',
      icon: 'github',
      url: 'https://github.com/AlfayedDennita/',
    },
    {
      name: 'Facebook',
      icon: 'facebook-round',
      url: 'http://facebook.com/alfayeddennita/',
    },
    {
      name: 'Instagram',
      icon: 'instagram',
      url: 'http://instagram.com/alfayeddennita/',
    },
    {
      name: 'LinkedIn',
      icon: 'linkedin',
      url: 'https://www.linkedin.com/in/AlfayedDennita/',
    },
  ];

  const inputErrors = $state({
    name: undefined,
    email: true,
    message: true,
  });
  const isValidationError = $derived(
    Object.values(inputErrors).some((error) => error)
  );
  let isSendingForm = $state(false);
  let sendingResponse = $state({
    status: undefined,
    message: undefined,
  });

  async function handleSubmitForm({
    formData,
    formElement,
    result: captchaResult,
  }) {
    isSendingForm = true;

    if (PUBLIC_MODE !== 'dev' && captchaResult.error) {
      sendingResponse.status = 'failed';
      sendingResponse.message =
        'Captcha challenge was error, message failed to send.';
    } else {
      try {
        formData.append('access_key', PUBLIC_WEB3FORMS_ACCESS_KEY);

        if (formData.get('name') === '') {
          formData.set('name', 'Anonymous');
        }

        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });
        const resData = await res.json();

        if (resData.success) {
          sendingResponse.status = 'success';
          sendingResponse.message = 'Message successfully sent.';
          formElement.reset();
        } else {
          sendingResponse.status = 'failed';
          sendingResponse.message =
            resData.message ||
            'Message failed to send, please try again later.';
        }
      } catch {
        sendingResponse.status = 'failed';
        sendingResponse.message =
          'Message failed to send, please try again later.';
      }
    }

    isSendingForm = false;
  }
</script>

<svelte:head>
  {#if PUBLIC_MODE !== 'dev'}
    <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
  {/if}
</svelte:head>

<section
  use:offsetTop={{
    value: (newValue) => (elementOffsetTop.value = newValue),
    update: (newUpdate) => (elementOffsetTop.update = newUpdate),
  }}
  class="contact"
  id="contact"
  bind:offsetHeight={contactOffsetHeight}
>
  <div class="contact__container">
    <div class="contact__socials">
      <header>
        <h2 class="contact__title">Keep in Touch</h2>
        <p class="contact__message">
          Follow my socials or send me a message to get to know me better.
        </p>
      </header>
      <address>
        <ul class="contact__social-buttons">
          {#each socials as social (social.name)}
            <li>
              <Button
                href={social.url}
                target="_blank"
                rel="external"
                title={social.name}
                square
              >
                <i class={['hn', `hn-${social.icon}`]}></i>
              </Button>
            </li>
          {/each}
        </ul>
      </address>
    </div>

    <form
      method="post"
      class="contact__form"
      use:enhance={{
        type: PUBLIC_MODE === 'dev' ? 'bypass' : 'hcaptcha',
        submit: ({ formData }) => handleSubmitForm,
      }}
    >
      <div class="contact__input contact__input--field-name" title="Name">
        <label for="input-name" class="contact__input-label">Name</label>
        <TextField
          type="text"
          name="name"
          id="input-name"
          oninput={(event) => {
            sendingResponse.status = undefined;
            sendingResponse.message = undefined;

            inputErrors.name = Joi.string()
              .max(256)
              .allow('')
              .label('Name')
              .validate(event.target.value)?.error?.details[0]?.message;
          }}
        >
          {#snippet iconLeft()}
            <i class="hn hn-user-solid"></i>
          {/snippet}
        </TextField>
        {#if ![undefined, true].includes(inputErrors.name)}
          <p class="contact__input-error" transition:slide>
            <i class="hn hn-exclamation-triangle-solid"></i>
            {inputErrors.name}.
          </p>
        {/if}
      </div>
      <div
        class="contact__input contact__input--field-email"
        title="Email (Required)"
      >
        <label for="input-email" class="contact__input-label">
          Email
          <span class="contact__input-label-required">(Required)</span>
        </label>
        <TextField
          type="email"
          name="email"
          id="input-email"
          required
          oninput={(event) => {
            sendingResponse.status = undefined;
            sendingResponse.message = undefined;

            inputErrors.email = Joi.string()
              .email()
              .max(256)
              .label('Email')
              .validate(event.target.value)?.error?.details[0]?.message;
          }}
        >
          {#snippet iconLeft()}
            <i class="hn hn-envelope-solid"></i>
          {/snippet}
        </TextField>
        {#if ![undefined, true].includes(inputErrors.email)}
          <p class="contact__input-error" transition:slide>
            <i class="hn hn-exclamation-triangle-solid"></i>
            {inputErrors.email}.
          </p>
        {/if}
      </div>
      <div
        class="contact__input contact__input--field-message"
        title="Message (Required)"
      >
        <label for="input-message" class="contact__input-label">
          Message
          <span class="contact__input-label-required">(Required)</span>
        </label>
        <TextField
          fieldClass="contact__input-textarea"
          type="textarea"
          name="message"
          id="input-message"
          required
          oninput={(event) => {
            sendingResponse.status = undefined;
            sendingResponse.message = undefined;

            inputErrors.message = Joi.string()
              .max(5000)
              .label('Message')
              .validate(event.target.value)?.error?.details[0]?.message;
          }}
        />
        {#if ![undefined, true].includes(inputErrors.message)}
          <p class="contact__input-error" transition:slide>
            <i class="hn hn-exclamation-triangle-solid"></i>
            {inputErrors.message}.
          </p>
        {/if}
      </div>
      {#if PUBLIC_MODE !== 'dev'}
        <div
          class="contact__form-captcha h-captcha"
          data-sitekey={PUBLIC_HCAPTCHA_SITEKEY}
        ></div>
      {/if}
      {#if sendingResponse.status}
        <div
          class={[
            'contact__sending-response',
            sendingResponse.status === 'success'
              ? 'contact__sending-response--is-success'
              : 'contact__sending-response--is-failed',
          ]}
          transition:slide
        >
          <i
            class={[
              'hn',
              `hn-${sendingResponse.status === 'success' ? 'check-circle-solid' : 'times-circle-solid'}`,
            ]}
          ></i>
          <p>{sendingResponse.message}</p>
        </div>
      {/if}
      <Button
        type="submit"
        class="contact__submit-button"
        title={isValidationError ? undefined : 'Send Message'}
        disabled={isValidationError || isSendingForm}
      >
        {#if isSendingForm}
          <i class="contact__submit-loading-icon hn hn-spinner-solid"></i>
          Sending...
        {:else}
          Send Message
          <i class="hn hn-arrow-right-solid"></i>
        {/if}
      </Button>
    </form>
  </div>
</section>

<style>
  .contact {
    z-index: 1;
    position: relative;
  }

  .contact__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 56px;
    padding: 64px 16px 192px;
  }

  @media (min-width: 576px) {
    .contact__container {
      gap: 64px;
      padding: 96px 64px 224px;
    }
  }

  @media (min-width: 992px) {
    .contact__container {
      flex-direction: row;
      padding: 128px 32px;
    }
  }

  @media (min-width: 1200px) {
    .contact__container {
      gap: 128px;
      padding-inline: 64px;
    }
  }

  .contact__socials {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .contact__title {
    font-family: var(--font-family-pixel);
    font-size: var(--font-size-heading-3);
  }

  @media (min-width: 576px) {
    .contact__title {
      font-size: var(--font-size-heading-2);
    }
  }

  .contact__social-buttons {
    display: flex;
    align-items: center;
    gap: 12px;
    list-style: none;
  }

  .contact__form {
    flex-grow: 1;
    display: grid;
    gap: 32px;
  }

  @media (min-width: 768px) {
    .contact__form {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .contact__input {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  @media (min-width: 768px) {
    .contact__input--field-name {
      grid-column: 1 / 2;
    }

    .contact__input--field-email {
      grid-column: 2 / 3;
    }

    .contact__input--field-message {
      grid-column: 1 / 3;
    }
  }

  .contact__input-label {
    font-family: var(--font-family-pixel);
    text-transform: uppercase;
  }

  .contact__input-label-required {
    color: var(--color-black-alt-2);
  }

  .contact__input :global(.contact__input-textarea) {
    height: 192px;
    resize: none;
  }

  .contact__input-error {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: var(--font-size-small);
    color: #e74c3c;
  }

  .contact__form-captcha {
    grid-column: 1 / -1;
  }

  .contact__sending-response {
    grid-column: 1 / -1;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
  }

  .contact__sending-response--is-success {
    color: #2ecc71;
  }

  .contact__sending-response--is-failed {
    color: #e74c3c;
  }

  @media (min-width: 768px) {
    .contact__form :global(.contact__submit-button) {
      grid-column: 1 / 3;
    }
  }

  .contact__submit-loading-icon {
    animation: loading 1s infinite linear;
  }

  @keyframes loading {
    to {
      transform: rotate(360deg);
    }
  }
</style>
