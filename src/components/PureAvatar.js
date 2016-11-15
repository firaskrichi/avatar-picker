import React, { PropTypes } from 'react'

class Avatar extends React.Component {

  render(){
    return(
      <div>
        <img className='avatar'
          src={`https://raw.githubusercontent.com/JoinColony/coding-challenge/master/`
            + this.props.avatar.src}
          onClick={this.props.onClick}
          alt="Avatar"
        />
      </div>
    )
  }
}

Avatar.propTypes = {
  avatar: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Avatar
