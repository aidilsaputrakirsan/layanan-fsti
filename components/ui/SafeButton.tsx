'use client';

import { createSafeComponent } from '../utils/SafeComponent';
import Button from './Button';
import React from 'react';

// Membuat versi aman dari Button
const SafeButton = createSafeComponent(Button);

export default SafeButton;