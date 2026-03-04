'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LogoMark } from '@/components/LogoMark';

export function Logo() {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href="/" className="nav-logo" data-testid="brand-wordmark">
      <span className="nav-logo-mark" aria-hidden>
        {!imgError ? (
          <Image
            src="/mp-logo.png"
            alt="Mine Performance logo"
            width={36}
            height={36}
            className="nav-logo-image"
            unoptimized
            onError={() => setImgError(true)}
          />
        ) : (
          <LogoMark className="nav-logo-image" />
        )}
      </span>
      <span className="nav-logo-text">Mine Performance</span>
    </Link>
  );
}
