import { memo } from 'react';
import { useDrop } from 'react-dnd';
const style = {
    height: '6rem',
    width: '6rem',
    marginRight: '5px',
    marginBottom: '1.5rem',
    // color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    // float: 'left',
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
    console.log(lastDroppedItem);
    return (<div ref={drop} role="Dustbin" style={{ ...style, backgroundColor }}>
        {/* {isActive
            ? 'Release to drop'
            : `This box only accepts: ${shouldAccept}`} */}

        {
            lastDroppedItem && lastDroppedItem?.name == shouldAccept ? `${shouldAccept}` : `Please drop ${shouldAccept} here`}
    </div>);
});

// Dustbin = DragSource('Dustbin', elementSource, (connect,
//     monitor) => ({
//         connectDragSource: connect.dragSource(),
//         isDragging: monitor.isDragging()
//     }))(Dustbin);

// Dustbin = DropTarget('Dustbin', elementTarget, connect => ({
//     connectDropTarget: connect.dropTarget(),
// }))(Dustbin);

