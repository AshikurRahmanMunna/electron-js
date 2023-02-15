const mainMenuTemplate = [
  {
    label: "Electron",
    submenu: [
      {
        label: "Close App",
        accelerator: "CommandOrControl+G",
        role: "quit",
      },
      {
        label: "Item 2",
        submenu: [
          {
            label: "Hello",
          },
          {
            label: "Hi",
          },
          {
            label: "By",
          },
        ],
      },
      {
        label: "Item 3",
      },
      {
        label: "Item 4",
      },
    ],
  },
  {
    label: "Edit",
    role: "editMenu",
  },
  {
    label: "Actions",
    submenu: [
      {
        label: "Toggle Devtools",
        role: "toggleDevTools",
      },
      {
        label: "Toggle Fullscreen",
        role: "toggleFullScreen",
      },
    ],
  },
  {
    label: "View",
  },
];

module.exports = mainMenuTemplate;
