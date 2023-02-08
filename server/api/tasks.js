const {
  models: { TaskCard },
} = require("../db");
const UserTaskCard = require("../db/models/UserTaskCard");
const router = require("express").Router();

// GET /api/tasks/:boardId
router.get("/:boardId", async (req, res, next) => {
  try {
    const tasks = await TaskCard.findAll({
      where: {
        boardId: req.params.boardId,
      },
      order: [["position", "ASC"]],
    });
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
});

// POST /api/tasks/:boardId
router.post("/:boardId", async (req, res, next) => {
  try {
    res.status(200).json(await TaskCard.create(req.body));
  } catch (err) {
    next(err);
  }
});

// PUT /api/tasks/:boardId/:taskCardId
router.put("/:boardId/:taskCardId", async (req, res, next) => {
  try {
    const taskCard = await TaskCard.findByPk(req.params.taskCardId);
    res.status(200).json(await taskCard.update(req.body));
  } catch (err) {
    next(err);
  }
});

// POST /api/tasks/thisTask/:thisTaskCardId/thisUser/:userId
router.post(
  `/thisTask/:thisTaskCardId/thisUser/:userId`,
  async (req, res, next) => {
    try {
      const { userId, thisTaskCardId: taskcardId } = req.params;

      const thisTaskCard = await UserTaskCard.findAll({
        where: { userId: userId, taskcardId: taskcardId },
      });

      if (thisTaskCard.length < 1) {
        const createTaskCard = await UserTaskCard.create({
          userId: userId,
          taskcardId: taskcardId,
        });
        return res.status(201).json(createTaskCard);
      }
      res.status(406).json("Nothing was done.");
    } catch (err) {
      next(err);
    }
  }
);

// the above put request should suffice
// PUT /api/tasks/:taskId
// router.put("/:taskId", async (req, res, next) => {
//   try {
//     const { title, start, end } = req.body;
//     const task = await TaskCard.update(
//       { title, start, end },
//       { where: { id: req.params.taskId } }
//     );
//     res.status(200).json({ message: "Task updated successfully" });
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
