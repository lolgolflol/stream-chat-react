import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '../Avatar';
import {
  withChatContext,
  withChannelContext,
  withTranslationContext,
} from '../../context';

/**
 * ChannelHeader - Render some basic information about this channel
 *
 * @example ../../docs/ChannelHeader.md
 */
const ChannelHeader = ({
  openMobileNav,
  channel,
  title,
  live,
  watcher_count,
  t,
  client,
}) => {
  const currentUserId = ((client || {}).user || {}).id || '';
  const channelMembers = ((channel || {}).state || {}).members || {};
  const oppositMemberId = Object.keys(channelMembers).find(
    (x) =>
      !!channelMembers[x].user && !!channelMembers[x].user.id !== currentUserId,
  );
  const oppositMember = channelMembers[oppositMemberId] || {};
  const oppositMemberUser = oppositMember.user || {};
  return (
    <div className="str-chat__header-livestream">
      <div className="str-chat__header-hamburger" onClick={openMobileNav}>
        <span className="str-chat__header-hamburger--line"></span>
        <span className="str-chat__header-hamburger--line"></span>
        <span className="str-chat__header-hamburger--line"></span>
      </div>
      <div className="str-chat__header-hamburger-arrow" onClick={openMobileNav}>
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 477.175 477.175"
          style={{ fill: '#006cff' }}
        >
          <g>
            <path
              d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
    c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"
            />
          </g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </svg>
      </div>
      {(channel.data.image || oppositMemberUser.image) && (
        <Avatar
          image={channel.data.image || oppositMemberUser.image}
          shape="rounded"
          size={channel.type === 'commerce' ? 60 : 40}
        />
      )}
      <div className="str-chat__header-livestream-left">
        <p className="str-chat__header-livestream-left--title">
          {title || channel.data.name || oppositMemberUser.name}{' '}
          {live && (
            <span className="str-chat__header-livestream-left--livelabel">
              {t('live')}
            </span>
          )}
        </p>
        {channel.data.subtitle && (
          <p className="str-chat__header-livestream-left--subtitle">
            {channel.data.subtitle}
          </p>
        )}
        {!!live && (
          <p className="str-chat__header-livestream-left--members">
            {!live && channel.data.member_count > 0 && (
              <>
                {t('{{ memberCount }} members', {
                  memberCount: channel.data.member_count,
                })}
                ,{' '}
              </>
            )}
            {t('{{ watcherCount }} online', { watcherCount: watcher_count })}
          </p>
        )}
      </div>
    </div>
  );
};

ChannelHeader.propTypes = {
  /** Set title manually */
  title: PropTypes.string,
  /** Show a little indicator that the channel is live right now */
  live: PropTypes.bool,
  /** **Available from [channel context](https://getstream.github.io/stream-chat-react/#chat)** */
  channel: PropTypes.object.isRequired,
  /** **Available from [channel context](https://getstream.github.io/stream-chat-react/#chat)** */
  client: PropTypes.object.isRequired,
  /** **Available from [channel context](https://getstream.github.io/stream-chat-react/#chat)** */
  watcher_count: PropTypes.number,
};

export default withChannelContext(
  withTranslationContext(withChatContext(ChannelHeader)),
);
