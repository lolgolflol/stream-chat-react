/* eslint-disable */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import truncate from 'lodash/truncate';

import { Avatar } from '../Avatar';
import { withTranslationContext } from '../../context';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
/**
 * Used as preview component for channel item in [ChannelList](#channellist) component.
 *
 * @example ../../docs/ChannelPreviewLastMessage.md
 * @extends PureComponent
 */

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

  render() {
    const { t, displayTitle, displayImage } = this.props;

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
              {displayTitle}
            </span>
            <span className="str-chat__channel-preview-last-message">
              {!this.props.channel.state.messages[0]
                ? t('Nothing yet...')
                : this.props.latestMessage}
            </span>
            {this.props.unread >= 1 && (
              <span className="str-chat__channel-preview-unread-count">
                {this.props.unread}
              </span>
            )}
          </div>
          <div className="str-chat__channel-arrow-right">
            <ArrowForwardIosIcon />
          </div>
        </button>
      </div>
    );
  }
}

export default withTranslationContext(ChannelPreviewLastMessage);
