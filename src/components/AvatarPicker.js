import React, { PropTypes } from 'react'
import PureAvatar from './PureAvatar'
import PopOver from './PopOver'
import '../style/AvatarPicker.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import KeyHandler, {KEYUP} from 'react-key-handler';

class AvatarPicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      popOverOpen: false,
      currentAvatarIndex: 0
    };
  }

  togglePopover(){
    this.setState({popOverOpen: !this.state.popOverOpen});
  }

  closePopover(){
    this.setState({popOverOpen: false});
  }

  handleAvatarPicked(avatar){
    let currentAvatarIndex = avatar.id - 1;
    this.setState({currentAvatarIndex});
    this.closePopover();
  }

  render() {
    return (
      <div className='box'>
      <KeyHandler keyEventName={KEYUP} keyCode={32} onKeyHandle={this.togglePopover.bind(this)} />
        <div className='current-avatar'>
          <PureAvatar
            avatar={this.props.avatars[this.state.currentAvatarIndex]}
            onClick={this.togglePopover.bind(this)}
            />
        </div>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {
            this.state.popOverOpen &&
            <PopOver
              clickOutside={this.closePopover.bind(this)}
              currentAvatarIndex={this.state.currentAvatarIndex}
              handleAvatarPicked={this.handleAvatarPicked.bind(this)}
              avatars={this.props.avatars}/>
          }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

AvatarPicker.propTypes = {
  avatars: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default AvatarPicker
