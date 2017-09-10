import { app, shell, Menu } from 'electron';

export default class MenuBuilder {
  constructor(window) {
    this.window = window;
  }
  build() {
    if (process.env.NODE_ENV !== 'production') {
      this.setupDevelopmentEnvironment();
    }
    const template = this.buildTemplate();
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }
  setupDevelopmentEnvironment() {
    this.window.openDevTools();
    this.window.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu
        .buildFromTemplate([{
          label: 'Inspect element',
          click: () => {
            this.window.inspectElement(x, y);
          },
        }])
        .popup(this.window);
    });
  }
  /* eslint-disable */
  buildTemplate() {
    const template = [
      {
        label: 'Edit',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          // { role: 'pasteandmatchstyle' },
          { role: 'delete' },
          { role: 'selectall' },
        ],
      },
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forcereload' },
          { role: 'toggledevtools' },
          { type: 'separator' },
          // { role: 'resetzoom' },
          // { role: 'zoomin' },
          // { role: 'zoomout' },
          // { type: 'separator' },
          { role: 'togglefullscreen' },
        ],
      },
      {
        role: 'window',
        submenu: [
          { role: 'close' },
          { role: 'minimize' },
        ],
      },
      {
        role: 'help',
        submenu: [
          { label: 'Learn More', click: () => { shell.openExternal('https://github.com/fiahfy/picty'); } },
        ],
      },
    ];

    if (process.platform === 'darwin') {
      template.unshift({
        label: app.getName(),
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'services', submenu: [] },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideothers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' },
        ],
      });

      // Edit menu
      template[2].submenu.push(
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startspeaking' },
            { role: 'stopspeaking' },
          ],
        },
      );

      // Window menu
      template[4].submenu.push(
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' },
      );
    }

    return template;
  }
  /* eslint-enable */
}