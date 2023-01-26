import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUserBoards, selectUserBoards } from "./allUserBoardsSlice";
import { useParams, useNavigate } from "react-router-dom";

const UserBoards = () => {
  const dispatch = useDispatch();
  const allUserBoards = useSelector(selectUserBoards);
  const navigate = useNavigate()

  console.log("This is allUserBoards", allUserBoards);

  useEffect(() => {
    dispatch(fetchAllUserBoards());
  }, [dispatch]);

  return (
    <div>
      <h4>Your Boards</h4>
      <div>
        {allUserBoards.map(({board}, index) => {
          console.log("Board name", board.boardName)
          //will need to fix navigate when we have more than one board
          return <div key={index} onClick={() => navigate(`/board`)}>{board.boardName}</div>; 
        })}
      </div>
      <div onClick={() => navigate(`/newBoard`)}>Add a Board</div>
    </div>
  );
};

export default UserBoards;
