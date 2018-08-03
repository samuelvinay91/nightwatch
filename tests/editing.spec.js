const url = 'http://todomvc.com/examples/react/#/';

module.exports = {
  'Double clicking allows you to edit the task'(client) {
    client
      .url(url)
      .waitForElementVisible('.header h1', 1000)
      .setValue('.new-todo', 'My new task')
      .submitForm('.todo-form')
      .doubleClick('.todo-list li:first-child label')
      .assert.visible('.todo-list li:first-child form')
      .end();
  },
  'Editing changed task description'(client) {
    client
      .url(url)
      .waitForElementVisible('.header h1', 1000)
      .setValue('.new-todo', 'My new task')
      .submitForm('.todo-form')
      .execute(() => {
        var evt = document.createEvent('MouseEvents');
        evt.initMouseEvent('dblclick',true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        document.getElementById('todo-list').children[0].children[0].children[1].dispatchEvent(evt);
       })
      .keys(['My other new task', '\uE006'])
      .assert.containsText('.todo-list li:first-child', 'My other new task')
      .end();
  }
};
