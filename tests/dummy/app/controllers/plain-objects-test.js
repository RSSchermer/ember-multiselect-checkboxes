import Controller from '@ember/controller';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.cars = [
      { make: "BMW", color: "black"},
      { make: "Ferari", color: "red"},
      { make: "Volvo", color: "blue"}
    ];
    this.selectedCars = [];
  }
});
