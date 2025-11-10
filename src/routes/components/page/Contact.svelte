<script>
  import { PUBLIC_MODE, PUBLIC_HCAPTCHA_SITEKEY } from '$env/static/public';
  import { slide } from 'svelte/transition';
  import Joi from 'joi';
  import captcha from 'svelte-captcha-enhance';
  import db from '$lib/db';
  import { offsetTop } from '$lib/actions/offsetTop';
  import Button from '$lib/components/ui/Button.svelte';
  import TextField from '$lib/components/ui/TextField.svelte';

  const { class: className, navbarOffsetHeight = 0 } = $props();

  let offsetHeight = $state();

  let elementOffsetTop = $state({
    value: undefined,
    update: () => undefined,
  });

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

  async function handleSubmittingForm({
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
        const data = await db.contact.insertOne({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        });

        if (data.success) {
          sendingResponse.status = 'success';
          sendingResponse.message = 'Message successfully sent.';
          formElement.reset();
        } else {
          sendingResponse.status = 'failed';
          sendingResponse.message =
            data.message || 'Message failed to send, please try again later.';
        }
      } catch {
        sendingResponse.status = 'failed';
        sendingResponse.message =
          'Message failed to send, please try again later.';
      }
    }

    isSendingForm = false;
  }

  export function getOffsetTop() {
    return elementOffsetTop;
  }

  export function getOffsetHeight() {
    return offsetHeight;
  }
</script>

<svelte:head>
  {#if PUBLIC_MODE !== 'dev'}
    <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
  {/if}
</svelte:head>

<section
  class={['contact', className]}
  style:--navbar-offset-height={`${navbarOffsetHeight}px`}
  id="contact"
  aria-labelledby="contact-title"
  use:offsetTop={{
    update: (newValue) => (elementOffsetTop.value = newValue),
    getUpdateFn: (updateFn) => (elementOffsetTop.update = updateFn),
  }}
  bind:offsetHeight
>
  <div class="contact__inner">
    <div class="contact__info">
      <header class="header">
        <h2 class="header__title" id="contact-title">Keep in Touch</h2>
        <p class="header__subtitle">
          Follow my socials or send me a message to get to know me better.
        </p>
      </header>

      <address class="socials">
        <ul class="socials__list">
          {#each socials as social (social.name)}
            <li>
              <Button
                href={social.url}
                square
                target="_blank"
                rel="external"
                title={social.name}
              >
                <i class={['hn', `hn-${social.icon}`]}></i>
              </Button>
            </li>
          {/each}
        </ul>
      </address>
    </div>

    <form
      class="form contact__form"
      method="post"
      use:captcha={{
        type: PUBLIC_MODE === 'dev' ? 'bypass' : 'hcaptcha',
        submit: () => handleSubmittingForm,
      }}
    >
      <div class="form__input form__input--field--name" title="Name">
        <label class="form__input-label" for="input-name">Name</label>
        <TextField
          type="text"
          name="name"
          id="input-name"
          autocomplete="name"
          aria-invalid={![undefined, true].includes(inputErrors.name)}
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
          <p class="form__input-error" transition:slide>
            <i class="hn hn-exclamation-triangle-solid"></i>
            {inputErrors.name}.
          </p>
        {/if}
      </div>
      <div class="form__input form__input--field--email" title="Email">
        <label class="form__input-label" for="input-email">
          Email
          <span class="form__input-label-required">(Required)</span>
        </label>
        <TextField
          type="email"
          name="email"
          id="input-email"
          autocomplete="email"
          required
          aria-invalid={![undefined, true].includes(inputErrors.email)}
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
          <p class="form__input-error" transition:slide>
            <i class="hn hn-exclamation-triangle-solid"></i>
            {inputErrors.email}.
          </p>
        {/if}
      </div>
      <div class="form__input form__input--field--message" title="Message">
        <label class="form__input-label" for="input-message">
          Message
          <span class="form__input-label-required">(Required)</span>
        </label>
        <TextField
          fieldClass="form__input-textarea"
          type="textarea"
          name="message"
          id="input-message"
          required
          aria-invalid={![undefined, true].includes(inputErrors.message)}
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
          <p class="form__input-error" transition:slide>
            <i class="hn hn-exclamation-triangle-solid"></i>
            {inputErrors.message}.
          </p>
        {/if}
      </div>
      {#if PUBLIC_MODE !== 'dev'}
        <div
          class="h-captcha form__captcha"
          data-sitekey={PUBLIC_HCAPTCHA_SITEKEY}
        ></div>
      {/if}
      {#if sendingResponse.status}
        <div
          class="form__sending-response"
          class:form__sending-response--state--success={sendingResponse.status ===
            'success'}
          class:form__sending-response--state--failed={sendingResponse.status !==
            'success'}
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
        class="form__submit"
        type="submit"
        disabled={isValidationError || isSendingForm}
        title={!isValidationError ? 'Send Message' : undefined}
      >
        {#if isSendingForm}
          <i class="hn hn-spinner-solid form__submit-loading-icon"></i>
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
    position: relative;
    scroll-margin-top: calc(var(--navbar-offset-height) - 1px);
    padding-inline: var(--screen-margin-dynamic);
  }

  .contact__inner {
    margin-inline: auto;
    max-width: var(--breakpoint-xl);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 48px;
    padding: 64px 0 224px;
  }

  @media (min-width: 576px) {
    .contact__inner {
      padding-top: 96px;
    }
  }

  @media (min-width: 992px) {
    .contact__inner {
      flex-direction: row;
      gap: 96px;
      padding-block: 128px;
    }
  }

  @media (min-width: 1200px) {
    .contact__inner {
      gap: 128px;
    }
  }

  .contact__info {
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .header__title {
    font-family: var(--font-family-pixel);
    font-size: var(--font-size-heading-3);
  }

  @media (min-width: 576px) {
    .header__title {
      font-size: var(--font-size-heading-2);
    }
  }

  .socials {
    display: contents;
  }

  .socials__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    list-style: none;
  }

  .contact__form {
    flex: 1 1 100%;
  }

  .form {
    display: grid;
    gap: 32px;
  }

  @media (min-width: 768px) {
    .form {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .form__input {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  @media (min-width: 768px) {
    .form__input--field--name {
      grid-column: 1 / 2;
    }

    .form__input--field--email {
      grid-column: 2 / 3;
    }

    .form__input--field--message {
      grid-column: 1 / -1;
    }
  }

  .form__input-label {
    font-family: var(--font-family-pixel);
    text-transform: uppercase;
  }

  .form__input-label-required {
    color: var(--color-black-alt-2);
  }

  .form__input :global(.form__input-textarea) {
    height: 192px;
    resize: none;
  }

  .form__input-error {
    margin-top: 4px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: var(--font-size-small);
    color: #e74c3c;
  }

  @media (min-width: 768px) {
    .form__captcha {
      grid-column: 1 / -1;
    }
  }

  .form__sending-response {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
  }

  @media (min-width: 768px) {
    .form__sending-response {
      grid-column: 1 / -1;
    }
  }

  .form__sending-response--state--success {
    color: #2ecc71;
  }

  .form__sending-response--state--failed {
    color: #e74c3c;
  }

  @media (min-width: 768px) {
    .form :global(.form__submit) {
      grid-column: 1 / -1;
    }
  }

  .form__submit-loading-icon {
    animation: loading 1s infinite linear;
  }

  @keyframes loading {
    to {
      transform: rotate(360deg);
    }
  }
</style>
