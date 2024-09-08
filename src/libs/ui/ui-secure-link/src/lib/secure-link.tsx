import * as React from 'react';
import { ReactNode } from 'react';

import { faExternalLinkSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Placeholder } from 'gatsby-plugin-image';
import { Link } from 'gatsby-plugin-react-i18next';

interface SecureLinkProps {
  children: ReactNode;
  to: string;
  language?: string;
  title?: string;
  className?: string;
  iconClassName?: string;
  activeClassName?: string;
  partiallyActive?: boolean;
  placeholder?: string;
  onPointerEnterCapture?: () => void;
  onPointerLeaveCapture?: () => void;
}

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
export const SecureLink: React.FC<SecureLinkProps> = ({
  children,
  to,
  language,
  title,
  className,
  iconClassName,
  activeClassName,
  partiallyActive,
  placeholder,
  onPointerEnterCapture,
  onPointerLeaveCapture,
  ...other
}) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to);

  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return (
      <Link
        to={to}
        language={language}
        title={title}
        className={className}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        placeholder={placeholder}
        {...other}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={to}
      title={title}
      target="_blank"
      className={className}
      rel="noopener noreferrer"
      {...other}>
      {children}

      <FontAwesomeIcon
        icon={faExternalLinkSquare}
        className={`w-5 inline align-sub ml-1 mb-0.5 ${iconClassName}`}
      />
    </a>
  );
};

export default SecureLink;
