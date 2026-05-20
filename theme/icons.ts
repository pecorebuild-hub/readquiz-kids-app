import type { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';

export type IoniconName = ComponentProps<typeof Ionicons>['name'];

export const TAB_ICONS = {
  home: 'home' as IoniconName,
  shelf: 'library' as IoniconName,
  shop: 'gift' as IoniconName,
  profile: 'person' as IoniconName,
};

export const ICONS = {
  coin: 'cash' as IoniconName,
  chevron: 'chevron-forward' as IoniconName,
  chevronBack: 'chevron-back' as IoniconName,
  mic: 'mic' as IoniconName,
  search: 'search' as IoniconName,
  book: 'book' as IoniconName,
  add: 'add-circle' as IoniconName,
  check: 'checkmark-circle' as IoniconName,
  star: 'star' as IoniconName,
  starOutline: 'star-outline' as IoniconName,
  trophy: 'trophy' as IoniconName,
  home: 'home' as IoniconName,
  difficultyEasy: 'leaf' as IoniconName,
  difficultyNormal: 'flash' as IoniconName,
  difficultyHard: 'flame' as IoniconName,
  rewardIceCream: 'ice-cream' as IoniconName,
  rewardMovie: 'film' as IoniconName,
  rewardPark: 'planet' as IoniconName,
};

export const REWARD_ICONS: Record<string, IoniconName> = {
  'ice-cream': ICONS.rewardIceCream,
  movie: ICONS.rewardMovie,
  park: ICONS.rewardPark,
};

export const DIFFICULTY_ICONS: Record<string, IoniconName> = {
  easy: ICONS.difficultyEasy,
  normal: ICONS.difficultyNormal,
  hard: ICONS.difficultyHard,
};
