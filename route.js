const express = require("express");
const router = new express.Router();
const Run = require("./schulze");


router.get("/getResult", async (req, res) => {
    try {
      const candidates=req.body.candidates;
      const ballots=req.body.ballots;
      let outcome = Run(candidates.length, ballots,candidates);
      outcome=outcome.map(({indexes})=>{return indexes});
      res.send(outcome);
    } catch (error) {
      res.status(400).send(error);
    }
});

//@description:testing
router.get("/hi", async (req, res) => {
    try {
      res.send("Route working.");
    } catch (error) {
      res.status(400).send();
    }
});

module.exports = router;