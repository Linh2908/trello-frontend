import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Dropdown,
  Form,
} from "react-bootstrap";
import { Container as ContainerDnd, Draggable } from "react-smooth-dnd";
import "./Collumn.scss";
import { mapOrder } from "../../utils/sort";
import plusIcon from "../../image/plus-circle.svg";
import ConfirmMofal from "../Modal/ConfirmModal";
import { MODAL_COMFIRM_DELETE } from "../../utils/contantsModal";
import { handleSelect, handleSaveAfterEnter } from "../../utils/contantEdit";
function Collumn(props) {
  const { collumn, onCardDrop, onUpdateCol, onAddNewCard} = props;

  const [isShowConfirm, setisShowConfirm] = useState(false);
  const [newColTitle, setNewColTitle] = useState("");
  const [isShowNewCardForm, setIsShowNewCardForm] = useState(false);
  const textareaRef = useRef();
  const [newCardTitle, setNewCardTitle] = useState('');

  useEffect(() => {
    setNewColTitle(collumn.title);
  }, [collumn.title]);

  useEffect(() => {
    if(isShowNewCardForm) {
      textareaRef.current.focus();
      textareaRef.current.select();
    };
  }, [isShowNewCardForm]);

  const handleNewColTitleChange = (e) => {
    setNewColTitle(e.target.value);
  };

  const cards = mapOrder(collumn.cards, collumn.cardOrder, "id");

  const handleCardDrop = (collumnId, dropResult) => {
    onCardDrop && onCardDrop(collumnId, dropResult);
  };

  const handleToggleShowConfirm = () => setisShowConfirm(!isShowConfirm);
  const handleToggleShowCardForm = () => setIsShowNewCardForm(!isShowNewCardForm);

  const handleActionConfirm = (type) => {
    if (type === MODAL_COMFIRM_DELETE) {
      const newCol = {
        ...collumn,
        _destroy: true,
      };
      onUpdateCol(newCol);
    }
    handleToggleShowConfirm();
  };

  const handleNewColTitleBlur = () => {
    const newCol = {
      ...collumn,
      title: newColTitle,
    };
    onAddNewCard && onUpdateCol(newCol);
  };

  const handleChangeNewCardTitle = (e) => setNewCardTitle(e.target.value);
  const handleAddNewCard = (e) => {
    if(!newCardTitle) {
      textareaRef.current.focus();
      return;
    };


    const newCard = {
      id : Math.random().toString(36).substring(2,5),
      boardId : collumn.boardId,
      collumnId : collumn.id,
      title : newCardTitle.trim(),
      cover : null,
    };

    let newCol = { 
      ...collumn,
      cards : [...collumn.cards, newCard],
      cardOrder : [...collumn.cardOrder, newCard.id],
    };

    onAddNewCard(newCol);
    setNewCardTitle('');
    setIsShowNewCardForm(false);
    
  }

  return (
    <Col className="board-collumn">
      <Card className="board-card">
        <Card.Header className="collumn_header">
          <Card.Title className="column-drag-handle">
            <Form.Control
              type="text"
              className="trelloEditTitle"
              size="sm"
              value={newColTitle}
              onClick={(e) => handleSelect(e)}
              onChange={(e) => handleNewColTitleChange(e)}
              onBlur={() => handleNewColTitleBlur()}
              onKeyDown={(e) => handleSaveAfterEnter(e)}
              onMouseDown={(e) => e.preventDefault()}
            />
          </Card.Title>
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              id="dropdown-basic"
              className="btnDropdown"
              size="sm"
            ></Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.ItemText>Add Card ...</Dropdown.ItemText>
              <Dropdown.ItemText onClick={() => handleToggleShowConfirm()}>
                Delete Card ...
              </Dropdown.ItemText>
              <Dropdown.ItemText>Copy All ...</Dropdown.ItemText>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <Card.Body className="collumn_body">
          <ContainerDnd
            groupName="col"
            onDrop={(dropResult) => handleCardDrop(collumn.id, dropResult)}
            getChildPayload={(index) => cards[index]}
            dragClass="card-ghost"
            dropClass="card-ghost-drop"
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: "drop-preview",
            }}
            dropPlaceholderAnimationDuration={200}
          >
            {cards &&
              cards.map((card, index) => (
                <Draggable key={card.id}>
                  <Card className="card-item">
                    {card.cover && (
                      <Card.Img
                        src={card.cover}
                        alt="anh"
                        onMouseDown={(e) => e.preventDefault()}
                      />
                    )}
                    <Card.Text>{card.title}</Card.Text>
                  </Card>
                </Draggable>
              ))}
          </ContainerDnd>
        </Card.Body>
        <Card.Footer>
          {!isShowNewCardForm && (
            <div 
              className="addCard"
              onClick={() => handleToggleShowCardForm()}
            >
              <img src={plusIcon} alt={"plus-icon"} className="plus-icon" />
              <span>Add new card</span>
            </div>
          )}

          {isShowNewCardForm && (
            <div className="add-card-form">
              <Form.Control
                as={"textarea"}
                rows="3"
                placeholder="Enter a title for this card ..."
                ref={textareaRef}
                value={newCardTitle}
                onChange = {e => handleChangeNewCardTitle(e)}
                onKeyDown = {e => (e.keyCode===13 && handleAddNewCard())}
              />
              <ButtonGroup className="my-3">
                <Button 
                  variant="success"
                 onClick={() => handleAddNewCard()}
                >Add Card</Button>
                <Button 
                  variant="danger"
                  onClick={() => handleToggleShowCardForm()}
                >Cancel</Button>
              </ButtonGroup>
            </div>
          )}
        </Card.Footer>
      </Card>
      {isShowConfirm && (
        <ConfirmMofal
          show={isShowConfirm}
          title="Delete Collumns"
          content={`Are you sure delete collumn ${collumn.title}`}
          onActionModal={handleActionConfirm}
        />
      )}
    </Col>
  );
}

export default Collumn;
