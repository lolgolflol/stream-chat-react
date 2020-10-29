/* eslint-disable */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Avatar } from '../Avatar';
import { ChatDown } from '../ChatDown';
import { LoadingChannels } from '../Loading';
import { withChatContext } from '../../context';
import _ from 'lodash';

import chevrondown from '../../assets/str-chat__icon-chevron-down.svg';
import flagThai from '../../assets/thailand.png';
import ent from 'ent';

/**
 * ChannelList - A preview list of channels, allowing you to select the channel you want to open
 * @example ../../docs/ChannelList.md
 */
class ChannelListTeam extends PureComponent {
  static propTypes = {
    /** When true, loading indicator is shown - [LoadingChannels](https://github.com/GetStream/stream-chat-react/blob/master/src/components/LoadingChannels.js) */
    loading: PropTypes.bool,
    /** When true, error indicator is shown - [ChatDown](https://github.com/GetStream/stream-chat-react/blob/master/src/components/ChatDown.js) */
    error: PropTypes.bool,
    /** Stream chat client object */
    client: PropTypes.object,
    /** When true, sidebar containing logo of the team is visible */
    showSidebar: PropTypes.bool,
    /** Url for sidebar logo image. */
    sidebarImage: PropTypes.string,
    /**
     * Loading indicator UI Component. It will be displayed if `loading` prop is true.
     *
     * Defaults to and accepts same props as:
     * [LoadingChannels](https://github.com/GetStream/stream-chat-react/blob/master/src/components/LoadingChannels.js)
     *
     */
    LoadingIndicator: PropTypes.elementType,
    /**
     * Error indicator UI Component. It will be displayed if `error` prop is true
     *
     * Defaults to and accepts same props as:
     * [ChatDown](https://github.com/GetStream/stream-chat-react/blob/master/src/components/ChatDown.js)
     *
     */
    LoadingErrorIndicator: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func,
    ]),
  };

  static defaultProps = {
    error: false,
    LoadingIndicator: LoadingChannels,
    LoadingErrorIndicator: ChatDown,
  };

  render() {
    const { showSidebar, LoadingErrorIndicator, LoadingIndicator } = this.props;
    let superPhoneNumber;
    if (this.props.client.user.superPhoneNumber) {
      superPhoneNumber = this.props.client.user.superPhoneNumber.split('');
    }
    let imageFlag = flagThai;
    if (this.props.client.user.nationalFlag) {
      imageFlag = this.props.client.user.nationalFlag;
    }

    if (this.props.error) {
      return <LoadingErrorIndicator type="Connection Error" />;
    } else if (this.props.loading) {
      return <LoadingIndicator />;
    } else {
      return (
        <div className="str-chat__channel-list-team">
          {showSidebar && (
            <div className="str-chat__channel-list-team__sidebar">
              <div className="str-chat__channel-list-team__sidebar--top">
                <Avatar image={this.props.sidebarImage} size={50} />
              </div>
            </div>
          )}
          <div className="str-chat__channel-list-team__main">
            <div className="str-chat__channel-list-team__header">
              <div className="str-chat__channel-list-team__header--left">
                <Avatar
                  image={this.props.client.user.image}
                  name={
                    this.props.client.user.name || this.props.client.user.id
                  }
                  size={40}
                />
              </div>
              <div className="str-chat__channel-list-team__header--middle">
                <div>
                  <div className="str-chat__channel-list-team__header--title">
                    {ent.decode(this.props.client.user.name) ||
                      this.props.client.user.id}
                    <span>
                      ({this.props.client.user.firstName}{' '}
                      {this.props.client.user.lastName})
                    </span>
                  </div>
                  <div className="str-chat__channel-list-team__header--title str-chat__channel-list-team__header--title-2 str-chat__big-letter">
                    {this.props.client.user.userWord}
                    <img src={imageFlag} />
                    <div>
                      <span>{_.get(superPhoneNumber, '[3]', 0)}</span>
                      <span>{_.get(superPhoneNumber, '[4]', 0)}</span>
                      <span>{_.get(superPhoneNumber, '[5]', 0)}</span>
                      <span className="str-chat__span-dash">-</span>
                      <span>{_.get(superPhoneNumber, '[6]', 0)}</span>
                      <span>{_.get(superPhoneNumber, '[7]', 0)}</span>
                      <span>{_.get(superPhoneNumber, '[8]', 0)}</span>
                      <span>{_.get(superPhoneNumber, '[9]', 0)}</span>
                    </div>
                  </div>
                </div>
                <div
                  className={`str-chat__channel-list-team__header--status ${this.props.client.user.status}`}
                >
                  {this.props.client.user.status}
                </div>
              </div>
              <div className="str-chat__channel-list-team__header--right"></div>
            </div>
            {this.props.children}
          </div>
        </div>
      );
    }
  }
}

export default withChatContext(ChannelListTeam);
