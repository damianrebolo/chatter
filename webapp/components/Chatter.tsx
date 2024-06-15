'use client';

import SendMessage from './SendMessage';
import MessageHistory from './MessageHistory';
import { ProfileCard } from './ProfileCard';

export const Chatter = () => (
  <>
    <ProfileCard />
    <MessageHistory />
    <SendMessage />
  </>
);
