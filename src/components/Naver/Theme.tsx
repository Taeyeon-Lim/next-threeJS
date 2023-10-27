'use client';

import TypoGraphyMetaball from '@components/TypoGraphyMetaball';
import { useSelectedLayoutSegments } from 'next/navigation';
import React from 'react';

function Theme() {
  const segments = useSelectedLayoutSegments();

  if (!segments || JSON.stringify(segments) === '[]' || !segments.length) {
    return null;
  }

  return (
    <TypoGraphyMetaball
      text={segments[segments.length - 1].replace(/[(|)]/g, '')}
    />
  );
}

export default Theme;
