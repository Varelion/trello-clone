const router = require("express").Router();

const Board = require("../db/models/Board");
const UserBoard = require("../db/models/UserBoard");
const userBoards = require("../db/models/UserBoard");
const List = require("../db/models/List");
const TaskCard = require("../db/models/TaskCard");


// GET /api/boards
router.get("/", async (req, res, next) => {
  try {
    console.log("***** Boards backend route hit *****");
    const boards = await Board.findAll();
    res.status(200).json(boards);
  } catch (err) {
    next(err);
  }
});

// GET /api/boards/:userId/:boardId
router.get('/:userId/:boardId', async (req, res, next) => {
  try {
    const board = await Board.findByPk(req.params.boardId, {
      include: {
        model: List, 
        separate: true,
        order: [['position', 'ASC']],
        include: {
          model: TaskCard,
          separate: true,
          order: [['position', 'ASC']]
        }
      }
    });
    res.status(200).json(board);
  } catch (err) {
    next(err);
  }
});

router.get("/user", async (req, res, next) => {
  try {
    console.log("This is inside of the api route for boards/user");
    const theUserId = 1;
    const boards = await UserBoard.findAll({
      where: { userId: theUserId },
      include: { model: Board },
    });
    res.json(boards);
  } catch (error) {
    next(error);
  }
});

// --------------------------
//#region This works
// --------------------------
router.post("/", async (req, res, next) => {
  try {
    console.log(`The\npost\nthing\nis\nhere\n HAHA`, req.body);
    const newBoard = await Board.create({
      boardName: req.body.boardName,
      creatorId: req.body.loggedInUserId,
    });

    const userBoard = await UserBoard.create({
      userId: req.body.loggedInUserId,
      boardId: newBoard.id,
      privilege: "ADMIN",
    });
    res.status(201).send(newBoard);
  } catch (error) {
    next(error);
  }
});



module.exports = router;
