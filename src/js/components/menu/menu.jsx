﻿'use strict';

import React from 'react';
import cn from 'classnames';

import MenuItem from './menuItem';
import MenuSeparator from './menuSeparator';

function Menu(props) {
    return <div className={cn('menu', { 'menu--open': props.open || !props.allowClose })}>
        <header className='menu__header'>
            {props.allowClose ? <button type='button' className='icon' onClick={props.close}>
                <svg className='svg-icon'><use xlinkHref="assets/sprite.svg#x"></use></svg>
            </button> : null}
        </header>
        <div className='menu__body'>
            <ul className='menu__list'>
                {React.Children.map(props.children, child => {
                    if (child == null) return null;
                    if (child.type == MenuItem) return React.cloneElement(child, { closeMenu: props.close });
                    if (child.type == MenuSeparator) return child;
                    return <MenuSeparator>{child}</MenuSeparator>;
                })}
            </ul>
        </div>
    </div>
}

export default Menu;
