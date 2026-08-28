import { FormEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import './contact-form.css';

const FORM_ENDPOINT = 'https://formsubmit.co/giacomo.baldessari11@gmail.com';

function ContactForm() {
  const { t } = useTranslation();
  const paths = useLocalizedPath();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sent = searchParams.get('sent') === '1';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    event.currentTarget.submit();
  };

  if (sent) {
    return (
      <div className="contact-form-success" role="status">
        <h2>{t('contactPage.successTitle')}</h2>
        <p>{t('contactPage.successMessage')}</p>
      </div>
    );
  }

  return (
    <form
      className="contact-form"
      action={FORM_ENDPOINT}
      method="POST"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_subject" value="Portfolio contact" />
      <input
        type="hidden"
        name="_next"
        value={`${window.location.origin}${paths.contact}?sent=1`}
      />

      <div className="form-field">
        <label htmlFor="name">{t('contactPage.form.name')}</label>
        <input id="name" name="name" type="text" required autoComplete="name" />
      </div>

      <div className="form-field">
        <label htmlFor="email">{t('contactPage.form.email')}</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>

      <div className="form-field">
        <label htmlFor="project-type">{t('contactPage.form.projectType')}</label>
        <select id="project-type" name="project_type" defaultValue="freelance" required>
          <option value="freelance">{t('contactPage.form.types.freelance')}</option>
          <option value="job">{t('contactPage.form.types.job')}</option>
          <option value="consulting">{t('contactPage.form.types.consulting')}</option>
          <option value="other">{t('contactPage.form.types.other')}</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="message">{t('contactPage.form.message')}</label>
        <textarea id="message" name="message" rows={5} required />
      </div>

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? t('common.sending') : t('common.sendMessage')}
      </button>
    </form>
  );
}

export default ContactForm;
