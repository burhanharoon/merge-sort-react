import { useState, useCallback, memo } from 'react';
import { Dustbin } from './Dustbin';
import { ItemTypes } from './ItemTypes';
import update from 'immutability-helper';
export const Container = memo(function Container({ shouldAccept }) {
    const [dustbins, setDustbins] = useState([
        { accepts: [ItemTypes.BOX], lastDroppedItem: null }
    ]);

    const [droppedBoxNames, setDroppedBoxNames] = useState([]);

    function isDropped(boxName) {
        return droppedBoxNames.indexOf(boxName) > -1;
    }
    const handleDrop = useCallback((index, item) => {
        const { name } = item;
        setDroppedBoxNames(update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }));
        setDustbins(update(dustbins, {
            [index]: {
                lastDroppedItem: {
                    $set: item,
                },
            },
        }));
    }, [droppedBoxNames, dustbins]);

    return (
        <div>
            <div style={{ overflow: 'hidden', clear: 'both' }}>
                {dustbins.map(({ accepts, lastDroppedItem }, index) => (<Dustbin shouldAccept={shouldAccept} accept={accepts} lastDroppedItem={lastDroppedItem} onDrop={(item) => handleDrop(index, item)} key={index} />))}
            </div>
        </div>);
});
