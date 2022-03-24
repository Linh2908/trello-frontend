export const initalState = {
  boards: [
    {
      id: "board-1",
      collumnOrder: ["col-1", "col-2", "col-3"],
      collumns: [
        {
          id: "col-1",
          boardId: "board-1",
          title: "TODO Col",
          cardOrder: ["card-1", "card-2", "card-3", "card-4", "card-5"],
          cards: [
            {
              id: "card-1",
              collumnId: "col-1",
              boardId: "broad-1",
              title: "Title of card 1",
              cover: null,
            },
            {
              id: "card-2",
              collumnId: "col-1",
              boardId: "broad-1",
              title: "Title of card 2",
              cover: null,
            },
            {
              id: "card-3",
              collumnId: "col-1",
              boardId: "broad-1",
              title: "Title of card 3",
              cover: null,
            },
            {
              id: "card-4",
              collumnId: "col-1",
              boardId: "broad-1",
              title: "Title of card 4",
              cover: null,
            },
            {
              id: "card-5",
              collumnId: "col-1",
              boardId: "broad-1",
              title: "Title of card 5",
              cover: null,
            },
          ],
        },
        {
          id: "col-2",
          boardId: "board-1",
          title: "DONE Col",
          cardOrder: ["card-10", "card-9", "card-8"],
          cards: [
            {
              id: "card-8",
              collumnId: "col-2",
              boardId: "broad-1",
              title: "Title of card 8",
              cover:
                "data:image/jpeg;base64,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",
            },
            {
              id: "card-9",
              collumnId: "col-2",
              boardId: "broad-1",
              title: "Title of card 9",
              cover: null,
            },
            {
              id: "card-10",
              collumnId: "col-2",
              boardId: "broad-1",
              title: "Title of card 10",
              cover: null,
            },
          ],
        },
        {
          id: "col-3",
          boardId: "board-1",
          title: "Hello Col",
          cardOrder: ["card-11", "card-12", "card-13"],

          cards: [
            {
              id: "card-11",
              collumnId: "col-3",
              boardId: "broad-1",
              title: "Title of card 11",
              cover: null,
            },
            {
              id: "card-12",
              collumnId: "col-3",
              boardId: "broad-1",
              title: "Title of card 12",
              cover: null,
            },
            {
              id: "card-13",
              collumnId: "col-3",
              boardId: "broad-1",
              title: "Title of card 13",
              cover: null,
            },
          ],
        },
      ],
    },
  ],
};
