import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp } from 'react-icons/fa';
import { getWhatsAppUrl } from '../config/contact';

interface WhatsAppLinkProps {
  className?: string;
  messageKey?: string;
  children?: ReactNode;
}

function WhatsAppLink({
  className,
  messageKey = 'whatsapp.defaultMessage',
  children,
}: WhatsAppLinkProps) {
  const { t } = useTranslation();
  const href = getWhatsAppUrl(t(messageKey));

  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children ?? (
        <>
          <FaWhatsapp aria-hidden="true" />
          {t('common.contactWhatsApp')}
        </>
      )}
    </a>
  );
}

export default WhatsAppLink;
