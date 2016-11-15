import React, { PropTypes } from 'react'
import Avatar from './Avatar'
import '../style/App.css';
var onClickOutside = require('react-onclickoutside');
import KeyHandler, {KEYUP} from 'react-key-handler';

const PopOver = onClickOutside( class PopOver extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      keyboardAvatarIndex: this.props.currentAvatarIndex,
    };
  }

  handleClickOutside(e) {
    this.props.clickOutside();
  }

  handleArrowNav(e) {
    let i = 0;
    let n = this.props.avatars.length;
    if(e.keyCode === 37){
      i = this.state.keyboardAvatarIndex - 1;
    }else if (e.keyCode === 39) {
      i = this.state.keyboardAvatarIndex + 1;
    }
    this.setState({keyboardAvatarIndex: ((i%n)+n)%n});
  }

  render(){
    return(
      <div>
        <KeyHandler keyEventName={KEYUP} keyCode={37} onKeyHandle={this.handleArrowNav.bind(this)} />
        <KeyHandler keyEventName={KEYUP} keyCode={39} onKeyHandle={this.handleArrowNav.bind(this)} />
        <div className='pointer'></div>
        <div className='popover-style'>
          <h2 className='popover-header'>Choose your avatar</h2>
          <ul className='avatar-list'>
            {
              this.props.avatars.map((avatar, i) => {
                return (
                  <li key={i} className='avatar-item'>
                    <Avatar
                      avatar={avatar}
                      keyboardAvatarIndex={this.state.keyboardAvatarIndex}
                      currentAvatarIndex={this.props.currentAvatarIndex}
                      onClick={this.props.handleAvatarPicked}
                      />
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
});


PopOver.propTypes = {
  clickOutside: PropTypes.func.isRequired,
  handleAvatarPicked: PropTypes.func.isRequired,
  currentAvatarIndex: PropTypes.number.isRequired,
  avatars: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default PopOver
