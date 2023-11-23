// server/app.js
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let id = 2;
const diaryList = [
  {
    id: 1,
    title: "오늘은 리액트 세션~",
    content: "리액트는 왜 이렇게 재밌을까?",
  },
];

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/api/diary", (req, res) => {
  res.json(diaryList);
});

app.post("/api/diary", (req, res) => {
  const { title, content, mood, date } = req.body;

  if (!["신남", "좋음", "보통", "나쁨", "화남"].includes(mood)) {
    return res.status(400).send("잘못된 기분 값");
  }

  diaryList.push({
    id: id++,
    title,
    content,
    mood,
    date,
  });
  return res.send("success");
});

app.listen(4000, () => {
  console.log("server start!");
});
