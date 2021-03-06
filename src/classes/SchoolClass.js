export class SchoolClass {
  constructor(id, name, primaryColor, iconName, status) {
    this.id = id;
    this.name = name;
    this.primaryColor = primaryColor;
    this.iconName = iconName;
    this.status = status; //status can equal "current" or "completed"
  }

  toString() {
    return (
      '{"id":"' +
      this.id +
      '","name":"' +
      this.name +
      '","primaryColor":"' +
      this.primaryColor +
      '","iconName":"' +
      this.iconName +
      '","status":"' +
      this.status +
      '"}'
    );
  }

  setStatus(status) {
    this.status = status;
  }
}
