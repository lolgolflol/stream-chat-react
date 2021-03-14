/* eslint-disable */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Picker } from 'emoji-mart';
import {
  ImageDropzone,
  ImagePreviewer,
  FilePreviewer,
  FileUploadButton,
} from 'react-file-utils';

import Button from '@material-ui/core/Button';

import { filterEmoji } from '../../utils';
import { withTranslationContext } from '../../context';
import { ChatAutoComplete } from '../ChatAutoComplete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

/**
 * MessageInputLarge - Large Message Input to be used for the MessageInput.
 * @example ../../docs/MessageInputLarge.md
 */
class MessageInputLarge extends PureComponent {
  static propTypes = {
    /** Set focus to the text input if this is enabled */
    focus: PropTypes.bool.isRequired,
    /** Grow the textarea while you're typing */
    grow: PropTypes.bool.isRequired,
    /** Specify the max amount of rows the textarea is able to grow */
    maxRows: PropTypes.number.isRequired,
    /** Make the textarea disabled */
    disabled: PropTypes.bool,
    /** @see See [MessageInput](https://getstream.github.io/stream-chat-react/#messageinput) for doc */
    imageOrder: PropTypes.array,
    /** @see See [MessageInput](https://getstream.github.io/stream-chat-react/#messageinput) for doc */
    imageUploads: PropTypes.object,
    /** @see See [MessageInput](https://getstream.github.io/stream-chat-react/#messageinput) for doc */
    removeImage: PropTypes.func,
    /** @see See [MessageInput](https://getstream.github.io/stream-chat-react/#messageinput) for doc */
    uploadImage: PropTypes.func,
    /** @see See [MessageInput](https://getstream.github.io/stream-chat-react/#messageinput) for doc */
    uploadNewFiles: PropTypes.func,
    /** @see See [MessageInput](https://getstream.github.io/stream-chat-react/#messageinput) for doc */
    numberOfUploads: PropTypes.number,
    /** @see See [MessageInput](https://getstream.github.io/stream-chat-react/#messageinput) for doc */
    fileOrder: PropTypes.array,
    /** @see See [MessageInput](https://getstream.github.io/stream-chat-react/#messageinput) for doc */
    fileUploads: PropTypes.object,
    /** @see See [MessageInput](https://getstream.github.io/stream-chat-react/#messageinput) for doc */
    removeFile: PropTypes.func,
    /** @see See [MessageInput](https://getstream.github.io/stream-chat-react/#messageinput) for doc */
    uploadFile: PropTypes.func,
    /** @see See [MessageInput](https://getstream.github.io/stream-chat-react/#messageinput) for doc */
    emojiPickerIsOpen: PropTypes.bool,
    /** @see See [MessageInput](https://getstream.github.io/stream-chat-react/#messageinput) for doc */
    emojiPickerRef: PropTypes.object,
    /** @see See [MessageInput](https://getstream.github.io/stream-chat-react/#messageinput) for doc */
    onSelectEmoji: PropTypes.func,
    /** @see See [MessageInput](https://getstream.github.io/stream-chat-react/#messageinput) for doc */
    getUsers: PropTypes.func,
    /** @see See [MessageInput](https://getstream.github.io/stream-chat-react/#messageinput) for doc */
    getCommands: PropTypes.func,
    /** @see See [MessageInput](https://getstream.github.io/stream-chat-react/#messageinput) for doc */
    textareaRef: PropTypes.object,
    /** @see See [MessageInput](https://getstream.github.io/stream-chat-react/#messageinput) for doc */
    handleSubmit: PropTypes.func,
    /** @see See [MessageInput](https://getstream.github.io/stream-chat-react/#messageinput) for doc */
    handleChange: PropTypes.func,
    /** @see See [MessageInput](https://getstream.github.io/stream-chat-react/#messageinput) for doc */
    onSelectItem: PropTypes.func,
    /** @see See [MessageInput](https://getstream.github.io/stream-chat-react/#messageinput) for doc */
    text: PropTypes.string,
    /** @see See [MessageInput](https://getstream.github.io/stream-chat-react/#messageinput) for doc */
    onPaste: PropTypes.func,
    /** @see See [MessageInput](https://getstream.github.io/stream-chat-react/#messageinput) for doc */
    openEmojiPicker: PropTypes.func,
    /** @see See [channel context](https://getstream.github.io/stream-chat-react/#channel) doc */
    watcher_count: PropTypes.number,
    /** @see See [channel context](https://getstream.github.io/stream-chat-react/#channel) doc */
    typing: PropTypes.object,
    /** @see See [channel context](https://getstream.github.io/stream-chat-react/#channel) doc */
    multipleUploads: PropTypes.object,
    /** @see See [channel context](https://getstream.github.io/stream-chat-react/#channel) doc */
    maxNumberOfFiles: PropTypes.number,
    /** @see See [channel context](https://getstream.github.io/stream-chat-react/#channel) doc */
    acceptedFiles: PropTypes.object,
    /**
     * Custom UI component for send button.
     *
     * Defaults to and accepts same props as: [SendButton](https://getstream.github.io/stream-chat-react/#sendbutton)
     * */
    SendButton: PropTypes.elementType,
    /**
     * Any additional attrubutes that you may want to add for underlying HTML textarea element.
     */
    additionalTextareaProps: PropTypes.object,
    messageLimit: PropTypes.number,
  };

  renderUploads = () => (
    <>
      {this.props.imageOrder.length > 0 && (
        <ImagePreviewer
          imageUploads={this.props.imageOrder.map(
            (id) => this.props.imageUploads[id],
          )}
          handleRemove={this.props.removeImage}
          handleRetry={this.props.uploadImage}
          handleFiles={this.props.uploadNewFiles}
          multiple={this.props.multipleUploads}
          disabled={
            this.props.numberOfUploads >= this.props.maxNumberOfFiles
              ? true
              : false
          }
        />
      )}
      {this.props.fileOrder.length > 0 && (
        <FilePreviewer
          uploads={this.props.fileOrder.map((id) => this.props.fileUploads[id])}
          handleRemove={this.props.removeFile}
          handleRetry={this.props.uploadFile}
          handleFiles={this.props.uploadNewFiles}
        />
      )}
    </>
  );

  renderEmojiPicker = () => {
    if (this.props.emojiPickerIsOpen) {
      return (
        <div
          className="str-chat__input--emojipicker"
          ref={this.props.emojiPickerRef}
        >
          <Picker
            native
            emoji="point_up"
            title="Pick your emoji…"
            onSelect={this.props.onSelectEmoji}
            color="#006CFF"
            showPreview={false}
            useButton={true}
            emojisToShowFilter={filterEmoji}
          />
        </div>
      );
    }
  };

  constructTypingString = (dict) => {
    const { t } = this.props;
    const arr2 = Object.keys(dict);
    const arr3 = [];
    arr2.forEach((item, i) => {
      if (this.props.client.user.id === dict[arr2[i]].user.id) {
        return;
      }
      arr3.push(dict[arr2[i]].user.name || dict[arr2[i]].user.id);
    });
    let outStr = '';
    if (arr3.length === 1) {
      outStr = t('{{ user }} is typing...', { user: arr3[0] });
      dict;
    } else if (arr3.length === 2) {
      //joins all with "and" but =no commas
      //example: "bob and sam"
      outStr = t('{{ firstUser }} and {{ secondUser }} are typing...', {
        firstUser: arr3[0],
        secondUser: arr3[1],
      });
    } else if (arr3.length > 2) {
      //joins all with commas, but last one gets ", and" (oxford comma!)
      //example: "bob, joe, and sam"
      outStr = t('{{ commaSeparatedUsers }} and {{ lastUser }} are typing...', {
        commaSeparatedUsers: arr3.slice(0, -1).join(', '),
        lastUser: arr3.slice(-1),
      });
    }

    return outStr;
  };

  render() {
    const { t, text, messageLimit } = this.props;
    let { disabled } = this.props;
    const SendButton = this.props.SendButton;
    let messageOverFlow = '';
    if (messageLimit) {
      if (messageLimit - text.length < 0) {
        messageOverFlow = 'str-chat__input-overflow';
      }
    }
    return (
      <div className="str-chat__input-large">
        <ImageDropzone
          accept={this.props.acceptedFiles}
          multiple={this.props.multipleUploads}
          disabled={
            this.props.numberOfUploads >= this.props.maxNumberOfFiles
              ? true
              : false
          }
          handleFiles={this.props.uploadNewFiles}
        >
          <div className="str-chat__input">
            {this.renderUploads()}
            {this.renderEmojiPicker()}
            {this.props.imageOrder.length > 0 ||
            this.props.fileOrder.length > 0 ? (
              <Button
                onClick={this.props.handleSubmit}
                className="str-chat__send-message"
              >
                Send
              </Button>
            ) : (
              <div
                className={clsx(
                  'str-chat__input--textarea-wrapper',
                  messageOverFlow,
                )}
              >
                <ChatAutoComplete
                  users={this.props.getUsers()}
                  commands={this.props.getCommands()}
                  innerRef={this.props.textareaRef}
                  handleSubmit={(e) => this.props.handleSubmit(e)}
                  onChange={this.props.handleChange}
                  onSelectItem={this.props.onSelectItem}
                  value={this.props.text}
                  rows={1}
                  maxRows={this.props.maxRows}
                  placeholder={t('Type your message')}
                  onPaste={this.props.onPaste}
                  grow={this.props.grow}
                  disabled={disabled}
                  additionalTextareaProps={this.props.additionalTextareaProps}
                />

                <span
                  className="str-chat__input-emojiselect"
                  onClick={this.props.openEmojiPicker}
                >
                  <InsertEmoticonIcon style={{ fill: 'black' }} />
                </span>
                <FileUploadButton
                  multiple={this.props.multipleUploads}
                  disabled={
                    this.props.numberOfUploads >= this.props.maxNumberOfFiles
                      ? false
                      : false
                  }
                  accepts={this.props.acceptedFiles}
                  handleFiles={this.props.uploadNewFiles}
                >
                  <span className="str-chat__input-fileupload">
                    <AddCircleOutlineIcon style={{ fill: 'black' }} />
                  </span>
                </FileUploadButton>
              </div>
            )}

            {SendButton && <SendButton sendMessage={this.props.handleSubmit} />}
          </div>
          <div>
            <div className="str-chat__input-footer">
              <span
                className={`str-chat__input-footer--count ${
                  !this.props.watcher_count
                    ? 'str-chat__input-footer--count--hidden'
                    : ''
                }`}
              >
                {''}
              </span>
              <span className="str-chat__input-footer--typing">
                {this.constructTypingString(this.props.typing)}
              </span>
            </div>
          </div>
          {messageLimit ? (
            <div className={clsx('str-chat__message-count', messageOverFlow)}>
              {this.props.messageLimit - this.props.text.length} /{' '}
              {this.props.messageLimit}
            </div>
          ) : (
            <div />
          )}
        </ImageDropzone>
      </div>
    );
  }
}

export default withTranslationContext(MessageInputLarge);
