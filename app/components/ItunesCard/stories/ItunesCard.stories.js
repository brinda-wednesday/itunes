/**
 *
 * Stories for ItunesCard
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import ItunesCard from '../index';

storiesOf('ItunesCard').add('simple', () => <ItunesCard id={text('id', 'ItunesCard')} />);
