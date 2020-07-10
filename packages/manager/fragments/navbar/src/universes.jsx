import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { get, find } from 'lodash-es';
import Brand from './brand.jsx';
import { SECONDARY_UNIVERSES } from './constants';

function fetchUniverses() {
  return fetch('/engine/2api/universes?version=beta', {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Accept: 'application/json',
    },
    credentials: 'same-origin',
  })
    .then((response) => response.json())
    .then((universes) =>
      universes.map((universe) => ({
        ...universe,
        isPrimary: !SECONDARY_UNIVERSES.includes(universe.universe),
      })),
    );
}

function getHubURL(universes) {
  return get(find(universes, { universe: 'hub' }), 'url');
}

function NavbarUniverses() {
  const [universes, setUniverses] = useState([]);
  const { t } = useTranslation();
  const updateUniverse = async () => {
    setUniverses(await fetchUniverses());
  };

  useEffect(() => {
    updateUniverse();
  }, []);

  return (
    <div className="oui-navbar-list">
      <Brand targetURL={getHubURL(universes)} />
      <div className="oui-navbar-list oui-navbar-list_main oui-navbar_desktop-only">
        {universes.length ? (
          universes.map((u) => (
            <a
              className={`oui-navbar-link oui-navbar-link_${
                u.isPrimary ? 'primary' : 'secondary'
              }`}
              key={u.universe}
              href={u.url}
            >
              {t(`navbar_universe_${u.universe}`)}
            </a>
          ))
        ) : (
          <span>{t('navbar_loading_universes')}</span>
        )}
      </div>
    </div>
  );
}

export default NavbarUniverses;
