import Controller from '@ember/controller';
import { A } from '@ember/array';

let options = [];

for (let i = 0; i < 1000; i++) {
  options.push(i);
}

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.options = A(options);
    this.selectedOptions = A();
  }
});
