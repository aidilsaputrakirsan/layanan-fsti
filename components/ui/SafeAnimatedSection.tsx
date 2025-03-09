'use client';

import { createSafeComponent } from '../utils/SafeComponent';
import AnimatedSection from './AnimatedSection';
import React from 'react';

// Membuat versi aman dari AnimatedSection
const SafeAnimatedSection = createSafeComponent(AnimatedSection);

export default SafeAnimatedSection;