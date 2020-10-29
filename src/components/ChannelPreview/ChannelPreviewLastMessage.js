/* eslint-disable */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import truncate from 'lodash/truncate';

import { Avatar } from '../Avatar';
import { withTranslationContext } from '../../context';

import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
/**
 * Used as preview component for channel item in [ChannelList](#channellist) component.
 *
 * @example ../../docs/ChannelPreviewLastMessage.md
 * @extends PureComponent
 */
import ent from 'ent';

class ChannelPreviewLastMessage extends PureComponent {
  static propTypes = {
    /** **Available from [chat context](https://getstream.github.io/stream-chat-react/#chat)** */
    channel: PropTypes.object.isRequired,
    /** Current selected channel object */
    activeChannel: PropTypes.object,
    /** Setter for selected channel */
    setActiveChannel: PropTypes.func.isRequired,
    /**
     * Object containing watcher parameters
     * @see See [Pagination documentation](https://getstream.io/chat/docs/#channel_pagination) for a list of available fields for sort.
     * */
    watchers: PropTypes.object,
    /** Number of unread messages */
    unread: PropTypes.number,
    /** If channel of component is active (selected) channel */
    active: PropTypes.bool,
    /** Latest message's text. */
    latestMessage: PropTypes.string,
    /** Length of latest message to truncate at */
    latestMessageLength: PropTypes.number,
    /** Title of channel to display */
    displayTitle: PropTypes.string,
    /** Image of channel to display */
    displayImage: PropTypes.string,
  };

  static defaultProps = {
    latestMessageLength: 20,
  };

  channelPreviewButton = React.createRef();

  onSelectChannel = () => {
    this.props.setActiveChannel(this.props.channel, this.props.watchers);
    this.channelPreviewButton.current.blur();
  };

  chooseMessage = () => {
    const {
      t,
      channel: {
        data: { created_by },
      },
      client,
    } = this.props;
    if (client.userID === created_by.id) {
      return t('Welcome to the chatroom');
    } else {
      return `${created_by.name} ${t('Open chat with you')}`;
    }
  };

  render() {
    const {
      t,
      displayTitle,
      displayImage,
      tDateTimeParser,
      channel,
    } = this.props;
    const lastMessage =
      channel.state.messages[channel.state.messages.length - 1];
    let when = '';
    if (lastMessage) {
      when = tDateTimeParser(lastMessage.created_at).calendar();
    }

    const unreadClass =
      this.props.unread >= 1 ? 'str-chat__channel-preview--unread' : '';
    const activeClass = this.props.active
      ? 'str-chat__channel-preview--active'
      : '';

    return (
      <div
        className={`str-chat__channel-preview ${unreadClass} ${activeClass}`}
      >
        <button onClick={this.onSelectChannel} ref={this.channelPreviewButton}>
          {this.props.unread >= 1 && (
            <div className="str-chat__channel-preview--dot" />
          )}
          <Avatar image={displayImage} />
          <div className="str-chat__channel-preview-info">
            <span className="str-chat__channel-preview-title">
              {ent.decode(displayTitle)}
            </span>
            <span className="str-chat__channel-preview-last-message">
              {!this.props.channel.state.messages[0]
                ? this.chooseMessage()
                : this.props.latestMessage}
            </span>
            {this.props.unread >= 1 && (
              <span className="str-chat__channel-preview-unread-count">
                {this.props.unread}
              </span>
            )}
          </div>
          <div className="str-chat__channel-arrow-right">
            <ArrowForwardIosSharpIcon />
          </div>
          <div className="str-chat__lastMessage-timestamp">{when}</div>
        </button>
      </div>
    );
  }
}

export default withTranslationContext(ChannelPreviewLastMessage);
