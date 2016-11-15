import React, { PropTypes } from 'react'
import KeyHandler, {KEYUP} from 'react-key-handler';

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarStyle: 'basic-avatar',
    };
  }

  handleClick(e){
    this.setState({avatarStyle: 'loading-avatar'});
    setTimeout(function() {
      this.setState({avatarStyle: 'basic-avatar'});
      this.props.onClick(this.props.avatar);
    }.bind(this), 1000);
  }

  componentDidMount(){
    let avatarIndex = this.props.avatar.id - 1;
    if(this.props.currentAvatarIndex === avatarIndex){
      this.setState({avatarStyle: 'selected-avatar'});
    }
  }

  componentWillReceiveProps(nextProps) {
    let avatarIndex = this.props.avatar.id - 1;
    if (nextProps.keyboardAvatarIndex !== this.props.keyboardAvatarIndex) {
      if(nextProps.keyboardAvatarIndex === avatarIndex){
        this.setState({avatarStyle: 'selected-avatar'});
      }
      else if (nextProps.keyboardAvatarIndex !== avatarIndex) {
        this.setState({avatarStyle: 'basic-avatar'});
      }
    }
  }

  handleEnterKey(e){
    let avatarIndex = this.props.avatar.id - 1;
    if(this.props.keyboardAvatarIndex === avatarIndex){
      this.handleClick(e);
    }
  }

  render(){
    return(
      <div className={this.state.avatarStyle}>
        <KeyHandler keyEventName={KEYUP} keyCode={13} onKeyHandle={this.handleEnterKey.bind(this)} />
        <div className='loader'>
        </div>
        <img className='avatar'
          src={`https://raw.githubusercontent.com/JoinColony/coding-challenge/master/`
            + this.props.avatar.src }
            id={this.props.avatar.id}
            onClick={this.handleClick.bind(this)}
            alt="Avatar"
            />
        </div>
      )
    }
  }


  Avatar.propTypes = {
    avatar: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    keyboardAvatarIndex: PropTypes.number.isRequired,
    currentAvatarIndex: PropTypes.number.isRequired
  }

  export default Avatar
