/* eslint-disable */
import React from 'react';
import style from './navbar.scss';

const version = React.version;

export class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      universes: [],
      user: props.user,
    };
  }

  componentDidMount() {
    fetch('/engine/2api/universes?version=beta', {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Accept: 'application/json',
      },
      credentials: 'same-origin',
    })
      .then((response) => response.json())
      .then((universes) => this.setState({ universes }));
  }

  render() {
    const { universes } = this.state;
    const { user } = this.state;
    return (
      <div className={style.navbar}>
        <span>
          <b style={ {marginRight: '2rem'} }>OVHcloud</b>
          <span style={ {marginRight: '2rem'} }>REACT ({ version })</span>
          <span style={ {marginRight: '2rem'} }>{user.nichandle}</span>
          <span style={ { marginRight: '5rem' } }></span>
        </span>
        { universes.length ? universes.map(u =>
          <span>
            <a href={ u.url } style={ {marginRight: '2rem'} }>{ u.universe }</a>
          </span>
        ) : 'Loading universes...' }
      </div>
    );
  }
}
/* eslint-enable */
