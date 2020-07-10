import React from 'react';
import PropTypes from 'prop-types';

function getRootPathURL() {
  const home = new URL(window.location);
  home.hash = '';
  return home.href;
}

function NavbarBrand({ targetURL }) {
  return (
    <a
      className="oui-navbar__brand"
      href={targetURL || getRootPathURL()}
      aria-label="OVHcloud"
      onClick={() => window.location.reload()}
    >
      <span className="oui-icon oui-icon-ovh" aria-hidden="true"></span>
    </a>
  );
}

NavbarBrand.propTypes = {
  targetURL: PropTypes.string,
};

export default NavbarBrand;
