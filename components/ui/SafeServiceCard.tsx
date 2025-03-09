'use client';

import { createSafeComponent } from '../utils/SafeComponent';
import ServiceCard from './ServiceCard';
import React from 'react';

// Membuat versi aman dari ServiceCard
const SafeServiceCard = createSafeComponent(ServiceCard);

export default SafeServiceCard;