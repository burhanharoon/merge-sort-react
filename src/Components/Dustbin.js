import { memo } from 'react';
import { useDrop } from 'react-dnd';
const style = {
    height: '6rem',
    width: '6rem',
    marginRight: '5px',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
};
export const Dustbin = memo(function Dustbin({ shouldAccept, accept, lastDroppedItem, onDrop, }) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept,
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });
    const isActive = isOver && canDrop;
    let backgroundColor = '#CBD5E1';
    if (isActive) {
        backgroundColor = 'darkgreen';
    }
    else if (canDrop) {
        backgroundColor = 'darkkhaki';
    }
    return (<div ref={drop} className='flex justify-center items-center' role="Dustbin" style={{ ...style, backgroundColor }}>
        {
            lastDroppedItem && lastDroppedItem?.name == shouldAccept ? `${shouldAccept}` : `Drop ${shouldAccept} here`}
    </div>);
});


