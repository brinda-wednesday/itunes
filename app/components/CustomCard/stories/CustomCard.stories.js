/**
 *
 * Stories for CustomCard
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { CustomCard } from '../index';

storiesOf('CustomCard').add('simple', () => <CustomCard />);
