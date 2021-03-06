import React, {
    memo,
    useCallback,
} from 'react';
import Key from 'components/key';
import Ball from 'components/ballDraggable';
import { countMatchElements } from 'utils';
import './style';

const Board = memo(({
    data,
    secret,
    active,
    onChange,
    onSwap,
    onSubmit,
}) => {
    const getKey = useCallback(() => (
        secret
            ? countMatchElements(data, secret)
            : {}
    ), [data, secret]);


    return (
        <div className='board'>
            <ul className='guess-panel'>
                {data.map((kind, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <li className='guess-panel__item' key={i}>
                        <Ball
                            index={i}
                            kind={kind}
                            readOnly={!active}
                            onChange={onChange}
                            onSwap={onSwap}
                        />
                    </li>
                ))}
            </ul>
            {active
                ? (
                    <button type='button' className='guess-panel__btn' onClick={onSubmit}>
                        <svg className='svg-icon'><use xlinkHref='assets/sprite.svg#check' /></svg>
                    </button>
                )
                : <Key {...getKey()} />}
        </div>
    );
});

Board.displayName = 'Board';

export default Board;
