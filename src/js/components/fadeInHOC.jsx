﻿'use strict';

import React from 'react';

import { checkSmoothScrollSupport } from 'js/utils';

const isSmoothScrollSupported = checkSmoothScrollSupport();
const FADE_TIMEOUT = 400;

function fadeIn(WrappedComponent, shouldAnimateOnUpdate) {
    return class extends React.Component {
        componentDidMount() {
            this.fadeIn();
            this.scrollIntoView();
        }

        componentDidUpdate(prevProps, prevState) {
            if (shouldAnimateOnUpdate && shouldAnimateOnUpdate(prevProps, prevState, this.props, this.state)) {
                this.fadeIn();
                this.scrollIntoView();
            }
        }

        fadeIn() {
            this.node.classList.add('fade-in');
            setTimeout(() => { this.node.classList.remove('fade-in') }, FADE_TIMEOUT);
        }

        scrollIntoView() {
            if (!isSmoothScrollSupported) return;
            this.node.scrollIntoView({ behavior: 'smooth' });
        }

        render() {
            return (
                <div className='animation-container' ref={(node) => { this.node = node; }}>
                    <WrappedComponent {...this.props} />
                </div>
            )
        }
    }
}

export default fadeIn;