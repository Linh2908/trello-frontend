import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { Container as ContainerDnd, Draggable } from "react-smooth-dnd";
import { isEmpty } from "lodash";
import { mapOrder } from "../../utils/sort";
import { applyDrag } from "../../utils/applyDrag";
import Collumn from "../Collumn/Collumn";
import "./boardContent.scss";
import { initalState } from "../../action/initialState";
import plusIcon from "../../image/plus-circle.svg";

function BoardContent() {
  const [board, setBoard] = useState({});
  const [collumns, setCollumns] = useState([]);
  const [isShowForm, setIsShowForm] = useState(false);
  const [newColTitle, setNewColTitle] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    const boardFormDB = initalState.boards.find(
      (board) => board.id === "board-1"
    );
    if (boardFormDB) {
      setBoard(boardFormDB);
      // sort collumn
      // boardFormDB.collumns.sort((a,b) => {
      //     return boardFormDB.collumnOrder.indexOf(a.id) - boardFormDB.collumnOrder.indexOf(b.id);
      // });

      mapOrder(boardFormDB.collumns, boardFormDB.collumnOrder, "id");

      setCollumns(boardFormDB.collumns);
    }
  }, []);

  useEffect(() => {
    if (isShowForm) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isShowForm]);

  if (isEmpty(board)) {
    return <h1>NOT FOUND</h1>;
  }

  const onColumnDrop = (dropResult) => {
    let _collumns = [...collumns];
    _collumns = applyDrag(_collumns, dropResult);

    const newBoard = { ...board };
    newBoard.collumnOrder = _collumns.map((coll) => coll.id);
    newBoard.collumns = _collumns;
    setCollumns(_collumns);
    setBoard(newBoard);
  };

  const onCardDrop = (collumnId, dropResult) => {
    if (dropResult.addedIndex !== null || dropResult.removedIndex !== null) {
      let newCol = [...collumns];

      const currentCol = newCol.find((col) => col.id === collumnId);

      currentCol.cards = applyDrag(currentCol.cards, dropResult);
      currentCol.cardOrder = currentCol.cards.map((card) => card.id);

      setCollumns(newCol);
    }
  };

  const handleToggleOpenFormAdd = () => {
    setIsShowForm(!isShowForm);
  };

  const handleChangeNewTitle = (e) => {
    setNewColTitle(e.target.value);
  };

  const handleAddNewCol = () => {
    if (!newColTitle) {
      inputRef.current.focus();
      return;
    }

    const newCol = {
      id: Math.random().toString(36).substring(2, 5),
      boardId: board.id,
      title: newColTitle.trim(),
      cardOrder: [],
      cards: [],
    };

    const _newColToAdd = [...collumns, newCol];

    const newBoard = { ...board };
    newBoard.collumnOrder = _newColToAdd.map((col) => col.id);
    newBoard.collumns = _newColToAdd;

    setCollumns(_newColToAdd);
    setBoard(newBoard);
    setNewColTitle("");
    setIsShowForm(false);
  };

  const handleUpdateCol = (newCol) => {
    const currentIdUpdate = newCol.id;
    let newCollumns = [...collumns];

    const indexColUpdate = newCollumns.findIndex(
      (col) => col.id === currentIdUpdate
    );

    if (newCol._destroy) {
      newCollumns.splice(indexColUpdate, 1);
    } else {
      newCollumns.splice(indexColUpdate, 1, newCol);
    }

    const newBoard = { ...board };
    newBoard.collumnOrder = newCollumns.map((coll) => coll.id);
    newBoard.collumns = newCollumns;
    setCollumns(newCollumns);
    setBoard(newBoard);
  };

  const handleAddNewCardToCol = (newCol) => {
    console.log(board.collumns);
      const newCollumns = board.collumns.map(col => {
        if(col.id === newCol.id){
          col = newCol;
        };

        return col;
      });

      const newBoard = {
        ...board,
        collumns : newCollumns,
      };

      setCollumns(newCollumns);
      setBoard(newBoard);
  }

  return (
    <>
      <Container>
        <Row className="board-collumns">
          <ContainerDnd
            orientation="horizontal"
            onDrop={onColumnDrop}
            getChildPayload={(index) => collumns[index]}
            dragHandleSelector=".column-drag-handle"
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: "collumn-drop-preview",
            }}
          >
            {collumns &&
              collumns.map((collumn, index) => (
                <Draggable key={collumn.id} className="collumn-card">
                  <Collumn
                    collumn={collumn}
                    onCardDrop={onCardDrop}
                    onUpdateCol={handleUpdateCol}
                    onAddNewCard={handleAddNewCardToCol}
                  />
                </Draggable>
              ))}
          </ContainerDnd>
          <Card className="addCollumn">
            {!isShowForm && (
              <Card.Header
                className="addTitle "
                onClick={() => handleToggleOpenFormAdd()}
              >
                <img src={plusIcon} alt={"plus-icon"} className="plus-icon" />
                <span>Add Another List</span>
              </Card.Header>
            )}

            {isShowForm && (
              <Card.Footer className="formAddCol">
                <div>
                  <Form.Control
                    rows="3"
                    name="addCollumn"
                    placeholder="Enter list title..."
                    ref={inputRef}
                    onChange={(e) => handleChangeNewTitle(e)}
                    onKeyDown={(e) => e.keyCode === 13 && handleAddNewCol()}
                    value={newColTitle}
                  />
                </div>

                <div className="btn-group">
                  <Button variant="success" onClick={() => handleAddNewCol()}>
                    Add List
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleToggleOpenFormAdd()}
                  >
                    Cancel
                  </Button>
                </div>
              </Card.Footer>
            )}
          </Card>
        </Row>
      </Container>
    </>
  );
}

export default BoardContent;
