import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import RootRef from '@material-ui/core/RootRef';
import IconButton from '@material-ui/core/IconButton';
import DragHandle from '@material-ui/icons/DragIndicator';
import DeleteIcon from '@material-ui/icons/Delete';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const useStyles = makeStyles({
  rightSide: {
    display: 'flex',
  },
  dragHandle: {
    padding: 12,
    opacity: 0.2,
  },
  icon: {
    width: '100%',
  },
});

const DragAndDrop = ({ children, onChange, deleteButton, items, ItemComponent }) => {
  const classes = useStyles();

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    onChange(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="items">
        {(droppableProvided, droppableSnapshot) => (
          <RootRef rootRef={droppableProvided.innerRef}>
            <List style={{ background: droppableSnapshot.isDraggingOver ? '#EEFFFF' : undefined }}>
              {items.map((item, index) => (
                <Draggable
                  key={item._id || item.id || JSON.stringify(item)}
                  draggableId={item._id || item.id || JSON.stringify(item)}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <ListItem
                      ref={provided.innerRef}
                      divider={!provided.isDragging}
                      {...provided.draggableProps}
                      style={{
                        ...provided.draggableProps.style,
                        background: provided.isDragging ? 'rgb(235,235,235)' : undefined,
                      }}
                    >
                      <ItemComponent
                        item={item}
                        classes={classes}
                        items={items}
                        onChange={onChange}
                      />

                      <div className={classes.rightSide}>
                        {deleteButton && (
                          <IconButton onClick={() => onChange(items.filter(_item => _item !== item))}>
                            <DeleteIcon />
                          </IconButton>
                        )}
                        <div {...provided.dragHandleProps} className={classes.dragHandle}>
                          <DragHandle />
                        </div>
                      </div>
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </List>
          </RootRef>
        )}
      </Droppable>

      {children}
    </DragDropContext>
  );
};

export default DragAndDrop;
